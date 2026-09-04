import { getTabRows, updateRowById } from './google-sheets';

export interface CleanupReport {
  timestamp: string;
  cutoffTime: string;
  maxAgeHours: number;
  applicationsAbandoned: number;
  submissionsAbandoned: number;
  paymentsExpired: number;
  totalCleaned: number;
}

/**
 * Scans Google Sheets for payment_pending or unverified created records older than maxAgeHours
 * and transitions them to 'abandoned' / 'expired' status.
 */
export async function reportAndCleanupAbandonedPendingRows(
  maxAgeHours: number = 24
): Promise<CleanupReport> {
  const now = Date.now();
  const cutoffMs = now - maxAgeHours * 60 * 60 * 1000;
  const cutoffTime = new Date(cutoffMs).toISOString();
  const timestamp = new Date(now).toISOString();

  let applicationsAbandoned = 0;
  let submissionsAbandoned = 0;
  let paymentsExpired = 0;

  // 1. Scan Applications tab
  // [Application ID (0), ..., Status (9), ..., Created At (12), Updated At (13)]
  const appRows = await getTabRows('Applications');
  for (let i = 0; i < appRows.length; i++) {
    const row = appRows[i];
    const status = row[9];
    const createdAt = row[12];
    const appId = row[0];

    if (status === 'payment_pending' && createdAt) {
      const createdMs = new Date(createdAt).getTime();
      if (!isNaN(createdMs) && createdMs < cutoffMs) {
        const updatedRow = [...row];
        updatedRow[9] = 'abandoned';
        updatedRow[13] = timestamp;
        await updateRowById('Applications', 0, appId, updatedRow);
        applicationsAbandoned++;
      }
    }
  }

  // 2. Scan ArticleSubmissions tab
  // [Submission ID (0), ..., Status (16), ..., Created At (21)]
  const subRows = await getTabRows('ArticleSubmissions');
  for (let i = 0; i < subRows.length; i++) {
    const row = subRows[i];
    const status = row[16];
    const createdAt = row[21];
    const subId = row[0];

    if (status === 'payment_pending' && createdAt) {
      const createdMs = new Date(createdAt).getTime();
      if (!isNaN(createdMs) && createdMs < cutoffMs) {
        const updatedRow = [...row];
        updatedRow[16] = 'abandoned';
        await updateRowById('ArticleSubmissions', 0, subId, updatedRow);
        submissionsAbandoned++;
      }
    }
  }

  // 3. Scan Payments tab
  // [Payment Record ID (0), ..., Status (9), ..., Created At (12)]
  const paymentRows = await getTabRows('Payments');
  for (let i = 0; i < paymentRows.length; i++) {
    const row = paymentRows[i];
    const status = row[9];
    const createdAt = row[12];
    const payId = row[0];

    if (status === 'created' && createdAt) {
      const createdMs = new Date(createdAt).getTime();
      if (!isNaN(createdMs) && createdMs < cutoffMs) {
        const updatedRow = [...row];
        updatedRow[9] = 'failed';
        await updateRowById('Payments', 0, payId, updatedRow);
        paymentsExpired++;
      }
    }
  }

  return {
    timestamp,
    cutoffTime,
    maxAgeHours,
    applicationsAbandoned,
    submissionsAbandoned,
    paymentsExpired,
    totalCleaned: applicationsAbandoned + submissionsAbandoned + paymentsExpired,
  };
}
