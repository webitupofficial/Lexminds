# LexMinds Editorial & Platform Operations Runbook

This operational guide details step-by-step procedures for the platform owner and editorial teammates managing articles, payments, fellowships, certificates, and refunds.

---

## 1. Editorial Workflow: Reviewing & Publishing Manuscripts

All user submissions to the **Publish With Us** portal undergo double-blind review before any content appears on the live website.

### Step 1: Accessing the Queue
1. Navigate to `/admin`.
2. Sign in using your authorized Google account (`ADMIN_EMAILS`).
3. Select the **Article Submissions** tab.

### Step 2: Quality & Plagiarism Assessment
1. Click **Review Full Manuscript & Take Action** on any submission with status `paid_submitted` or `under_review`.
2. Inspect the abstract, keywords, and full text or document link.
3. Conduct desk screening:
   - Run manuscript through plagiarism verification (e.g. Turnitin). Record percentage in the **Plagiarism Notes** field.
   - Evaluate writing style, citations format (Bluebook 21st / OSCOLA), and academic rigor. Record findings in **AI & Editorial Screening Notes**.

### Step 3: Determining Action
- **Approve & Publish Live**:
  - Click **Approve & Publish Live**.
  - The server automatically sanitizes content to prevent XSS, generates a search-engine friendly slug from the title, sets status to `published`, updates the `ArticleSubmissions` sheet with reviewer email and timestamp, and publishes the treatise live on `/articles`.
- **Request Revision**:
  - If citations or phrasing require author adjustment, enter guidance in **Editorial Decision Notes** and click **Request Revision**.
- **Reject**:
  - If the manuscript fails originality thresholds or academic criteria, enter rationale in notes and click **Reject**.

---

## 2. Fellowship Enrollment & Certificate Issuance

Internships and research fellowships on LexMinds are selective, merit-assessed programs.

### Step 1: Reviewing Applicants
1. In `/admin`, open the **Fellowship Enrollees** tab.
2. Review applicant institution, year of study, academic score, and Statement of Purpose (SOP).
3. If shortlisted, update status to `accepted` and invite the student to the orientation roundtable.

### Step 2: Milestones & Completion Criteria
- **Rule**: Never issue a certificate merely because payment was received.
- Student must fulfill:
  1. Minimum 80% attendance at research roundtables.
  2. Completion of statutory case brief or legal commentary milestone.
  3. Mentor approval.

### Step 3: Issuing Verifiable Certificates
1. Once all criteria are met, update applicant status to `completed`.
2. In the modal, enter the assigned Mentor name (e.g., `Senior Advocate Chambers & LexMinds Editorial Council`).
3. Click **Issue Verifiable Certificate**.
4. The system generates a tamper-proof certificate ID (e.g. `CERT-XXXXX`), records the completion date and verification URL in the `Certificates` tab, and updates the application status to `certificate_issued`.

---

## 3. Payment Reconciliation & Webhook Diagnostics

The primary source of payment truth is Razorpay server-side verification and webhook logs.

### Standard Flow:
- When a user pays, Razorpay checkout returns `razorpay_payment_id`, `razorpay_order_id`, and `razorpay_signature`.
- The server verifies HMAC-SHA256 and updates the row in the `Payments` tab to `verified`.

### Dropped User Recovery (Browser Closed):
- If the student or author closes the browser before redirect, the Razorpay webhook delivers a `payment.captured` event to `/api/webhooks/razorpay`.
- The webhook processor verifies signature, marks the payment `verified` in `Payments`, and activates the linked application (`paid`) or submission (`paid_submitted`).

### Manual Payment Audit:
1. Open the private Google Sheet > `Payments` tab.
2. Cross-reference the `Razorpay Order ID` and `Razorpay Payment ID` with the Razorpay Merchant Dashboard.
3. If an order is marked `created` in Sheets but `Captured` in Razorpay, trigger the webhook re-delivery from Razorpay Dashboard > Webhooks > Retry.

---

## 4. Refund Processing Procedure

Refunds are governed by the LexMinds Terms and Editorial Policy.

### When Refunds Apply:
- Fellowship cohort cancellation by LexMinds.
- Duplicate debit caused by gateway latency.
- Editorial desk rejection prior to peer assignment upon author request within policy window.

### Refund Execution:
1. Log into [Razorpay Merchant Dashboard](https://dashboard.razorpay.com/) > **Payments**.
2. Locate the specific `payment_id` from the applicant's record.
3. Click **Issue Refund** (Full or Partial).
4. Razorpay executes the refund to the original payment source and sends a `refund.processed` webhook.
5. The `/api/webhooks/razorpay` endpoint automatically:
   - Updates `Payments` status to `refunded` with `refundStatus = 'full'`.
   - Updates linked `Applications` row to `cancelled` OR `ArticleSubmissions` row to `refunded`.
