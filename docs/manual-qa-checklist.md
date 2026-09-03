# LexMinds Owner Manual QA Checklist

This checklist is designed for the platform owner to perform a final, end-to-end verification of LexMinds in staging or production before public launch.

---

## Pre-Requisites
- [ ] Staging or Production deployment is active.
- [ ] `.env.local` or hosting environment variables are fully populated.
- [ ] Google Sheet is created and shared with the Service Account email with **Editor** permissions.
- [ ] Razorpay is configured with Test Mode API keys for testing.
- [ ] You have access to at least two Google accounts:
  - **Account A (Admin)**: Email listed in `ADMIN_EMAILS` (e.g. `owner@lexminds.in`).
  - **Account B (Regular User)**: Any standard Gmail account NOT in `ADMIN_EMAILS`.

---

## Test Scenario 1: Admin Access & Allowlist Enforcement

| Step | Action | Expected Result | Pass/Fail |
| :--- | :--- | :--- | :--- |
| 1.1 | Open `/admin` in Incognito. | Prompted to sign in with Google via GoogleAuthGate. | [ ] |
| 1.2 | Sign in using **Account B** (non-admin). | "Access Denied (403 Forbidden)" message appears. No submissions, applications, or admin buttons are visible. | [ ] |
| 1.3 | Click "Switch Account" and sign in using **Account A** (admin). | Admin Moderation Desk loads successfully showing real counters, Article Submissions, and Fellowship Enrollees tabs. | [ ] |

---

## Test Scenario 2: Paid Internship Enrollment Flow

| Step | Action | Expected Result | Pass/Fail |
| :--- | :--- | :--- | :--- |
| 2.1 | Open `/internships` in Incognito. | Active fellowship card displays with deadline, stipend, seats, and fee (₹299). | [ ] |
| 2.2 | Click "View Role & Apply" and then "Apply for Fellowship". | Application modal opens. Requires Google sign-in. | [ ] |
| 2.3 | Sign in with **Account B**. | Verified Google email is shown as read-only. Step 1 (Applicant details) unlocks. | [ ] |
| 2.4 | Fill Step 1 and Step 2. Verify **no resume field** exists. | Proceed to Step 3. Fill SOP (>30 chars) and check declaration. | [ ] |
| 2.5 | Click "Pay ₹299 & Submit". | Razorpay Checkout popup appears showing ₹299.00 fee. | [ ] |
| 2.6 | Complete test payment (e.g., using Razorpay Test UPI or Card). | Payment is cryptographically verified on server. Success screen shows confirmed `APP-XXXXX` docket reference and payment ID. | [ ] |
| 2.7 | Check Private Google Sheet > `Applications` tab. | A new row exists with `Application ID`, student details, status `paid`, and `Payment Record ID`. No resume column exists. | [ ] |
| 2.8 | Check `Payments` tab. | A row exists matching the transaction with status `verified` and amount `29900`. | [ ] |

---

## Test Scenario 3: Paid Article Submission Flow

| Step | Action | Expected Result | Pass/Fail |
| :--- | :--- | :--- | :--- |
| 3.1 | Navigate to `/publish`. | "Publish Your Legal Research" page loads. | [ ] |
| 3.2 | Sign in with **Account B** via GoogleAuthGate. | Verified email displays. | [ ] |
| 3.3 | Fill author credentials, preferred byline, article title, category, keywords, abstract (>50 chars), and manuscript content/link. | Form validation requires all three declaration checkboxes. | [ ] |
| 3.4 | Check all declarations and click "Pay ₹499 & Submit Manuscript". | Razorpay Checkout popup opens showing ₹499.00 fee. | [ ] |
| 3.5 | Complete test payment. | Server verifies payment. Success screen shows confirmed `SUB-XXXXX` docket and informs author that article has entered review queue. | [ ] |
| 3.6 | Check `/articles` directory. | The submitted manuscript is **NOT** visible on public pages. | [ ] |
| 3.7 | Check Google Sheet > `ArticleSubmissions` tab. | A new row exists with status `paid_submitted`. | [ ] |

---

## Test Scenario 4: Editorial Moderation & Live Publishing

| Step | Action | Expected Result | Pass/Fail |
| :--- | :--- | :--- | :--- |
| 4.1 | In `/admin` as **Account A**, click "Sync Records". | The new manuscript appears under Article Submissions with status `paid_submitted`. | [ ] |
| 4.2 | Click "Review Full Manuscript & Take Action". | Review modal opens showing full abstract, content, and author details. | [ ] |
| 4.3 | Enter Plagiarism notes (e.g. `2.8% Turnitin verified`) and click "Approve & Publish Live". | Success alert appears. Status updates to `published`. | [ ] |
| 4.4 | Open `/articles` in another tab. | The newly approved article is now **live on the website**, complete with author bio, byline, and standardized Bluebook/OSCOLA citations. | [ ] |

---

## Test Scenario 5: Fellowship Milestones & Certificate Issuance

| Step | Action | Expected Result | Pass/Fail |
| :--- | :--- | :--- | :--- |
| 5.1 | In `/admin`, open "Fellowship Enrollees" tab. | The student's application from Scenario 2 appears with status `paid`. | [ ] |
| 5.2 | Click "Manage Fellow". Attempt to click "Issue Verifiable Certificate". | Button is disabled because status is not `completed`. | [ ] |
| 5.3 | Click "Accept Application", then click "Mark Requirements Completed". | Status updates to `completed`. "Issue Verifiable Certificate" button is now active. | [ ] |
| 5.4 | Enter mentor name and click "Issue Verifiable Certificate". | System generates a certificate ID (`CERT-XXXXX`). Status updates to `certificate_issued`. | [ ] |
| 5.5 | Check Google Sheet > `Certificates` tab. | A row is recorded with certificate ID, student name, mentor, completion date, and verification URL. | [ ] |

---

## Test Scenario 6: Free Contact & Grievance Desk

| Step | Action | Expected Result | Pass/Fail |
| :--- | :--- | :--- | :--- |
| 6.1 | Open `/contact`. | Official Inquiry Registry loads with embedded Google Form and FAQs. | [ ] |
| 6.2 | Verify this form does not request any payment or look like a paid product enrollment. | Clean inquiry form for support, partnerships, or grievance redressal. | [ ] |
