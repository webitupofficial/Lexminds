# LexMinds MVP Production Deployment Checklist

This checklist guides the platform owner and lead engineer through deploying LexMinds to production on Vercel or similar hosting infrastructure.

---

## 1. Google Cloud & Google Sheets Configuration (Owner Action)

1. **Create Google Cloud Project**:
   - Navigate to [Google Cloud Console](https://console.cloud.google.com/).
   - Enable the **Google Sheets API**.
2. **Create Service Account**:
   - Go to **IAM & Admin > Service Accounts** and create `lexminds-sheet-adapter`.
   - Create and download a new **JSON Private Key**.
3. **Create Private Google Sheet**:
   - Create a private spreadsheet in Google Drive titled `LexMinds Production Database`.
   - Note the `GOOGLE_SHEET_ID` from the URL: `https://docs.google.com/spreadsheets/d/<GOOGLE_SHEET_ID>/edit`.
4. **Grant Editor Permission**:
   - Click **Share** on the Google Sheet.
   - Share with the service account email (e.g. `lexminds-sheet-adapter@<project-id>.iam.gserviceaccount.com`) with **Editor** role.
5. **Initialize Sheet Tabs**:
   - Create the following 5 tab names in the sheet:
     1. `Applications`
     2. `ArticleSubmissions`
     3. `Payments`
     4. `ContactTickets`
     5. `Certificates`
   *(Header rows will be automatically initialized by the adapter if left blank).*

---

## 2. Firebase Authentication Setup

1. **Enable Google Sign-In**:
   - Go to [Firebase Console](https://console.firebase.google.com/).
   - In **Authentication > Sign-in method**, enable **Google**.
2. **Authorized Domains**:
   - Add your production domain (e.g. `lexminds.in`) and Vercel staging domains (`*.vercel.app`) to the **Authorized Domains** list in Firebase Authentication settings.
3. **Generate Firebase Admin Credentials**:
   - In Firebase Console > **Project Settings > Service accounts**, click **Generate new private key**.
   - Note `project_id`, `client_email`, and `private_key` for environment variables.

---

## 3. Razorpay Standard Checkout & Webhook Setup

1. **Razorpay Account & API Keys**:
   - Log into [Razorpay Dashboard](https://dashboard.razorpay.com/).
   - **Initial Staging**: Use **Test Mode** API Keys (`rzp_test_...`).
   - **Production Transition**: Complete business KYC and activate **Live Mode** keys (`rzp_live_...`).
2. **Configure Webhook**:
   - In Razorpay Dashboard > **Settings > Webhooks**, click **Add New Webhook**.
   - **Webhook URL**: `https://<your-domain>/api/webhooks/razorpay`
   - **Secret**: Generate a secure 32+ character random string and store as `RAZORPAY_WEBHOOK_SECRET`.
   - **Active Events**:
     - `payment.captured`
     - `payment.failed`
     - `refund.created`
     - `refund.processed`

---

## 4. Environment Variables on Vercel / Hosting Provider

Set the following variables in your hosting environment:

| Variable Name | Description | Example / Target Value |
| :--- | :--- | :--- |
| `APP_ENV` | Application runtime mode | `production` |
| `ADMIN_EMAILS` | Comma-separated admin allowlist (exactly 2 admins) | `owner@lexminds.in,editor@lexminds.in` |
| `GOOGLE_SHEET_ID` | Private spreadsheet ID | `<sheet_id_from_url>` |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Google service account email | `service-account@project.iam.gserviceaccount.com` |
| `GOOGLE_PRIVATE_KEY` | RSA Private Key with newlines | `"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"` |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Client Firebase Web API Key | `AIzaSy...` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | `lexminds.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID | `lexminds` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | `lexminds.appspot.com` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Cloud messaging ID | `123456789012` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase Web App ID | `1:123456789012:web:...` |
| `FIREBASE_PROJECT_ID` | Server Firebase project ID | `lexminds` |
| `FIREBASE_CLIENT_EMAIL` | Firebase Admin SDK client email | `firebase-adminsdk@lexminds.iam.gserviceaccount.com` |
| `FIREBASE_PRIVATE_KEY` | Firebase Admin SDK private key | `"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"` |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Public Razorpay Key ID | `rzp_test_...` or `rzp_live_...` |
| `RAZORPAY_KEY_ID` | Server Razorpay Key ID | `rzp_test_...` or `rzp_live_...` |
| `RAZORPAY_KEY_SECRET` | Server Razorpay Secret | `<secret_from_dashboard>` |
| `RAZORPAY_WEBHOOK_SECRET` | Secret configured for webhook | `<webhook_secret>` |

---

## 5. Pre-Flight Verification Steps

- [ ] Run `npm test` locally to verify all 15 security and transaction tests pass.
- [ ] Run `npm run lint` and `npx tsc --noEmit` to verify zero type or lint errors.
- [ ] Deploy staging build on Vercel with Test Mode keys.
- [ ] Navigate to `/admin` as a non-admin Google user; verify 403 Forbidden Access Denied screen appears.
- [ ] Navigate to `/admin` as an authorized admin; verify review queue loads.
- [ ] Perform an end-to-end Test Mode enrollment on `/internships`; verify order, signature check, and Google Sheet record creation.
- [ ] Perform an end-to-end Test Mode article submission on `/publish`; verify manuscript is recorded as `paid_submitted` and not visible publicly.
- [ ] Review and publish manuscript in `/admin`; verify article is now visible live under `/articles`.
