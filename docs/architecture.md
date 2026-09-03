# LexMinds MVP System Architecture

## 1. Architectural Overview

LexMinds is built on Next.js 14 App Router, separating public editorial content, transactional processing, user authentication, and private administrative persistence across distinct boundaries.

```mermaid
flowchart TD
    subgraph Client["Client (Next.js Frontend)"]
        UI_Home["Public Pages (/articles, /internships)"]
        UI_Publish["Publish Page (/publish)"]
        UI_AppModal["Internship Application Modal"]
        UI_Admin["Admin Moderation Portal (/admin)"]
        GA_Gate["Firebase Google Sign-In"]
        RZP_SDK["Razorpay Standard Checkout"]
    end

    subgraph Security["Security & Authentication Boundary"]
        FB_Admin["Firebase Admin SDK (Token Verification)"]
        Admin_Allowlist["ADMIN_EMAILS (2-Admin Allowlist)"]
        HMAC_Verify["HMAC-SHA256 Signature Verification"]
    end

    subgraph Server["Serverless API Layer (Next.js App Router)"]
        API_Order["POST /api/payment/create-order"]
        API_Verify["POST /api/payment/verify"]
        API_Webhook["POST /api/webhooks/razorpay"]
        API_AdminArticles["GET, PATCH /api/admin/articles"]
        API_AdminApps["GET, PATCH /api/admin/applications"]
        API_AdminCerts["POST /api/admin/certificates"]
        API_PublicArticles["GET /api/articles (Published Only)"]
    end

    subgraph External["External Services"]
        RZP_API["Razorpay API (v1/orders)"]
        FB_Auth["Firebase Auth Service"]
    end

    subgraph Persistence["Persistence & Systems of Record"]
        GSheets[("Private Google Sheets (MVP Storage)
        • Applications
        • ArticleSubmissions
        • Payments
        • ContactTickets
        • Certificates")]
        ContentSeed[("Editorial Content Adapter
        (Sanity CMS Boundary)")]
    end

    %% Client Interactions
    UI_Publish --> GA_Gate
    UI_AppModal --> GA_Gate
    GA_Gate --> FB_Auth
    
    UI_AppModal --> API_Order
    UI_Publish --> API_Order
    API_Order --> FB_Admin
    API_Order --> RZP_API
    API_Order --> GSheets

    UI_AppModal --> RZP_SDK
    UI_Publish --> RZP_SDK
    RZP_SDK --> API_Verify
    API_Verify --> FB_Admin
    API_Verify --> HMAC_Verify
    API_Verify --> GSheets

    RZP_API -.->|Webhook Events| API_Webhook
    API_Webhook --> HMAC_Verify
    API_Webhook --> GSheets

    UI_Admin --> FB_Admin
    UI_Admin --> Admin_Allowlist
    UI_Admin --> API_AdminArticles
    UI_Admin --> API_AdminApps
    UI_Admin --> API_AdminCerts
    API_AdminArticles --> GSheets
    API_AdminArticles --> ContentSeed
    API_AdminApps --> GSheets
    API_AdminCerts --> GSheets
    UI_Home --> API_PublicArticles
    API_PublicArticles --> ContentSeed
```

---

## 2. Subsystem Boundaries

| Subsystem | Concern | System of Record | Access Control |
| :--- | :--- | :--- | :--- |
| **Public Content** | Articles, internships, static policies | Seed adapter / Sanity CMS | Public read-only |
| **User Identity** | Google Authentication | Firebase Authentication | Google ID Token (Bearer) |
| **Payment Gateway** | Order creation & payment processing | Razorpay Standard | Server-side Key + Secret |
| **Transactions & Submissions** | Applications, submissions, payments, certificates | Private Google Sheets | Server-only Google Service Account JWT |
| **Admin Operations** | Moderation, publishing, certificate issuance | Private Google Sheets | Server-verified `ADMIN_EMAILS` allowlist |

---

## 3. Data Flow Workflows

### 3.1 Paid Internship Enrollment Flow
1. **Student Signs In**: Authenticates with Google via `GoogleAuthGate`.
2. **Form Entry**: Fills personal, institutional, and academic details. (No resume uploaded).
3. **Server Order Creation**: Client sends `productKey: 'internship_enrollment'`. The server validates catalog price (₹299 / 29,900 paise), calls Razorpay API, and creates a pending record in the `Payments` tab.
4. **Razorpay Standard Checkout**: Opens official checkout window.
5. **Server Verification**: Razorpay returns payment ID, order ID, and signature. The server verifies HMAC-SHA256, matches the order and amount, idempotently updates `Payments` tab to `verified`, and creates the application row in `Applications` tab with status `paid`.
6. **Reference Assigned**: Displays confirmed `APP-XXXXX` docket to student.

### 3.2 Paid Article Submission Flow
1. **Author Signs In**: Authenticates with Google.
2. **Manuscript Submission**: Enters author byline, institution, bio, title, abstract, content (or restricted document URL), and signs originality and review declarations.
3. **Server Order Creation**: Server prices order at ₹499 (49,900 paise) and creates pending payment record.
4. **Payment Verification**: On verified payment, server creates `ArticleSubmission` in `ArticleSubmissions` tab with status `paid_submitted`.
5. **Editorial Review Queue**: Article enters moderation queue. It is **not** public until approved by an administrator.

### 3.3 Asynchronous Webhook Recovery
- If a user closes the browser window after payment before the client callback executes, Razorpay sends a signed `payment.captured` webhook.
- Server validates `x-razorpay-signature` against raw request body using `RAZORPAY_WEBHOOK_SECRET`.
- Reconciles payment in `Payments` tab and marks linked application or submission as paid.
