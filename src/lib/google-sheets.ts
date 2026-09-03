import { google } from 'googleapis';

export type SheetTabName = 'Articles' | 'Internship-XYZ' | 'Contact-Us';

export const SHEET_TAB_HEADERS: Record<SheetTabName, string[]> = {
  'Articles': [
    'Timestamp',
    'Submission ID',
    'Verified Email',
    'Author Name',
    'Phone',
    'Institution / University',
    'Paper Title',
    'Abstract',
    'Theme / Track',
    'Manuscript Drive / Document URL',
    'Payment Status',
    'Payment ID'
  ],
  'Internship-XYZ': [
    'Timestamp',
    'Application ID',
    'Verified Email',
    'Applicant Name',
    'Phone',
    'College / Law School',
    'Year of Study',
    'CGPA / Grade',
    'LinkedIn Profile URL',
    'Resume Drive URL',
    'Statement of Purpose',
    'Payment Status',
    'Payment ID',
    'Amount Paid (INR)'
  ],
  'Contact-Us': [
    'Timestamp',
    'Ticket ID',
    'Verified Email',
    'Full Name',
    'Phone Number',
    'Address / Institution',
    'Category / Subject',
    'Message / Query',
    'Anti-Spam Security Check'
  ]
};

/**
 * Initializes authenticated Google Sheets API client
 */
function getGoogleSheetsClient() {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!spreadsheetId || !clientEmail || !privateKey) {
    return null;
  }

  // Handle newline formatting in environment variables (e.g. from Vercel / .env files)
  if (privateKey.includes('\\n')) {
    privateKey = privateKey.replace(/\\n/g, '\n');
  }

  // Clean surrounding quotes if passed with them
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
 * Appends a row of verified data to a specific sheet tab.
 * Automatically checks and initializes the header row if the sheet is blank.
 */
export async function appendToGoogleSheet(
  tabName: SheetTabName,
  rowValues: (string | number | boolean | null | undefined)[]
): Promise<{ success: boolean; simulated?: boolean; message?: string }> {
  const client = getGoogleSheetsClient();

  // If credentials are not set in .env.local, operate in safe Dev Simulation Mode
  if (!client) {
    console.warn(
      `[Google Sheets Warning]: Credentials not configured in .env.local. Operating in Simulation Mode.\n` +
      `Target Sheet: "${tabName}"\nPayload:`,
      rowValues
    );
    return {
      success: true,
      simulated: true,
      message: `Simulated append to "${tabName}". Set GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, and GOOGLE_PRIVATE_KEY to push to live Google Sheets.`
    };
  }

  const { sheets, spreadsheetId } = client;

  try {
    // 1. Check if headers exist in row 1 of the tab
    const rangeCheck = `${tabName}!A1:Z1`;
    const checkResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: rangeCheck,
    });

    const existingRows = checkResponse.data.values;
    if (!existingRows || existingRows.length === 0 || existingRows[0].length === 0) {
      // Sheet tab is empty -> append standard headers first
      const headers = SHEET_TAB_HEADERS[tabName];
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${tabName}!A1`,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: [headers]
        }
      });
      console.log(`[Google Sheets]: Initialized header row for tab "${tabName}".`);
    }

    // 2. Format row values (convert undefined/null to empty string)
    const sanitizedRow = rowValues.map((val) => (val === undefined || val === null ? '' : String(val)));

    // 3. Append the row
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${tabName}!A1`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [sanitizedRow]
      }
    });

    console.log(`[Google Sheets]: Successfully appended row to "${tabName}".`);
    return { success: true };
  } catch (error: any) {
    console.error(`[Google Sheets Error] Failed appending to "${tabName}":`, error.message || error);
    throw new Error(`Google Sheets API Error: ${error.message || 'Failed to append row'}`);
  }
}
