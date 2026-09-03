import { google } from 'googleapis';

export type SheetTabName =
  | 'Applications'
  | 'ArticleSubmissions'
  | 'Payments'
  | 'ContactTickets'
  | 'Certificates';

export const SHEET_TAB_HEADERS: Record<SheetTabName, string[]> = {
  Applications: [
    'Application ID',
    'Firebase UID',
    'Verified Email',
    'Applicant Name',
    'Phone',
    'Institution',
    'Year of Study',
    'Academic Score',
    'Internship Key',
    'Status',
    'Payment Record ID',
    'Admin Notes',
    'Created At',
    'Updated At',
  ],
  ArticleSubmissions: [
    'Submission ID',
    'Firebase UID',
    'Verified Email',
    'Author Name',
    'Designation',
    'Institution',
    'Author Bio',
    'Signature Line',
    'Title',
    'Category',
    'Keywords',
    'Abstract',
    'Content / Doc URL',
    'Originality Declaration',
    'Consent to Publish',
    'Payment Record ID',
    'Status',
    'Reviewer Notes',
    'Plagiarism Notes',
    'AI Review Notes',
    'Publication URL',
    'Created At',
    'Reviewed At',
    'Published At',
    'Reviewer Email',
  ],
  Payments: [
    'Payment Record ID',
    'Product Key',
    'Internal Reference',
    'Firebase UID',
    'Verified Email',
    'Razorpay Order ID',
    'Razorpay Payment ID',
    'Amount (Paise)',
    'Currency',
    'Status',
    'Linked Entity ID',
    'Receipt',
    'Created At',
    'Verified At',
    'Webhook At',
    'Refund Status',
    'Raw Payload Hash',
  ],
  ContactTickets: [
    'Ticket ID',
    'Verified Email',
    'Name',
    'Phone',
    'Institution',
    'Subject',
    'Message',
    'Status',
    'Created At',
  ],
  Certificates: [
    'Certificate ID',
    'Linked Application ID',
    'Student Name',
    'Internship Title',
    'Mentor',
    'Completion Date',
    'Verification URL',
    'Issued Status',
    'Issued At',
  ],
};

// In-memory test store exclusively for isolated automated tests (APP_ENV === 'test')
const testStore: Record<SheetTabName, string[][]> = {
  Applications: [],
  ArticleSubmissions: [],
  Payments: [],
  ContactTickets: [],
  Certificates: [],
};

export function resetTestStore(): void {
  for (const tab of Object.keys(testStore) as SheetTabName[]) {
    testStore[tab] = [];
  }
}

/**
 * Initializes authenticated Google Sheets API client.
 * Returns null if credentials are not configured.
 */
function getGoogleSheetsClient() {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!spreadsheetId || !clientEmail || !privateKey) {
    return null;
  }

  if (privateKey.includes('\\n')) {
    privateKey = privateKey.replace(/\\n/g, '\n');
  }

  if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
    privateKey = privateKey.slice(1, -1);
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  return { sheets, spreadsheetId };
}

/**
 * Ensures tab header row is initialized in Google Sheets.
 */
async function ensureHeadersInitialized(tabName: SheetTabName): Promise<void> {
  const client = getGoogleSheetsClient();
  if (!client) return;

  const { sheets, spreadsheetId } = client;
  const rangeCheck = `${tabName}!A1:Z1`;

  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: rangeCheck,
    });

    const rows = res.data.values;
    if (!rows || rows.length === 0 || rows[0].length === 0) {
      const headers = SHEET_TAB_HEADERS[tabName];
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${tabName}!A1`,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: [headers],
        },
      });
    }
  } catch (err: any) {
    console.error(`[Google Sheets]: Header initialization failed for ${tabName}:`, err.message || err);
  }
}

/**
 * Appends a row to a tab.
 * Fails closed in production if credentials are not configured.
 */
export async function appendToSheet(
  tabName: SheetTabName,
  rowValues: (string | number | boolean | null | undefined)[]
): Promise<{ success: boolean }> {
  const sanitizedRow = rowValues.map((v) => (v === undefined || v === null ? '' : String(v)));

  if (process.env.APP_ENV === 'test') {
    testStore[tabName].push(sanitizedRow);
    return { success: true };
  }

  const client = getGoogleSheetsClient();
  if (!client) {
    throw new Error(`Google Sheets credentials missing. Cannot write to ${tabName}. Failing closed.`);
  }

  await ensureHeadersInitialized(tabName);

  const { sheets, spreadsheetId } = client;
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${tabName}!A1`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [sanitizedRow],
    },
  });

  return { success: true };
}

/**
 * Reads all rows from a tab (excluding header row).
 */
export async function getTabRows(tabName: SheetTabName): Promise<string[][]> {
  if (process.env.APP_ENV === 'test') {
    return [...testStore[tabName]];
  }

  const client = getGoogleSheetsClient();
  if (!client) {
    throw new Error(`Google Sheets credentials missing. Cannot read ${tabName}. Failing closed.`);
  }

  const { sheets, spreadsheetId } = client;
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${tabName}!A2:Z`,
  });

  return (res.data.values as string[][]) || [];
}

/**
 * Finds a row by internal ID in a given column index (0-indexed).
 */
export async function findRowById(
  tabName: SheetTabName,
  idColumnIndex: number,
  idValue: string
): Promise<{ rowIndex: number; row: string[] } | null> {
  if (!idValue) return null;

  if (process.env.APP_ENV === 'test') {
    const rows = testStore[tabName];
    for (let i = 0; i < rows.length; i++) {
      if (rows[i][idColumnIndex] === idValue) {
        return { rowIndex: i + 2, row: rows[i] };
      }
    }
    return null;
  }

  const client = getGoogleSheetsClient();
  if (!client) {
    throw new Error(`Google Sheets credentials missing. Cannot lookup row in ${tabName}. Failing closed.`);
  }

  const rows = await getTabRows(tabName);
  for (let i = 0; i < rows.length; i++) {
    if (rows[i][idColumnIndex] === idValue) {
      // 1-indexed sheet row: row 1 is header, so row 2 is index 0
      return { rowIndex: i + 2, row: rows[i] };
    }
  }

  return null;
}

/**
 * Updates a row by internal ID.
 */
export async function updateRowById(
  tabName: SheetTabName,
  idColumnIndex: number,
  idValue: string,
  updatedValues: (string | number | boolean | null | undefined)[]
): Promise<boolean> {
  const sanitized = updatedValues.map((v) => (v === undefined || v === null ? '' : String(v)));

  if (process.env.APP_ENV === 'test') {
    const rows = testStore[tabName];
    for (let i = 0; i < rows.length; i++) {
      if (rows[i][idColumnIndex] === idValue) {
        rows[i] = sanitized;
        return true;
      }
    }
    return false;
  }

  const found = await findRowById(tabName, idColumnIndex, idValue);
  if (!found) return false;

  const client = getGoogleSheetsClient();
  if (!client) {
    throw new Error(`Google Sheets credentials missing. Cannot update ${tabName}. Failing closed.`);
  }

  const { sheets, spreadsheetId } = client;
  const range = `${tabName}!A${found.rowIndex}:Z${found.rowIndex}`;

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [sanitized],
    },
  });

  return true;
}

/**
 * Idempotently upserts a row: updates if exists, otherwise appends.
 */
export async function upsertRowById(
  tabName: SheetTabName,
  idColumnIndex: number,
  idValue: string,
  rowValues: (string | number | boolean | null | undefined)[]
): Promise<{ operation: 'inserted' | 'updated' }> {
  const existing = await findRowById(tabName, idColumnIndex, idValue);
  if (existing) {
    await updateRowById(tabName, idColumnIndex, idValue, rowValues);
    return { operation: 'updated' };
  } else {
    await appendToSheet(tabName, rowValues);
    return { operation: 'inserted' };
  }
}
