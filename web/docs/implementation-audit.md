# LexMinds MVP Implementation Audit Report

**Date:** September 2026  
**Auditor:** Lead Full-Stack Engineer  
**Branch:** `mvp-refactor`  
**Target Platform:** Next.js App Router, Firebase Auth, Google Sheets API, Razorpay Standard Checkout

---

## 1. Executive Summary & Current State

LexMinds is an India-focused legal scholarship, legal journalism, mentorship, and research initiative designed to connect law students with structured research fellowships and a peer-reviewed publication venue.

A technical audit of the codebase revealed that while the visual presentation, typography, and page templates reflect LexMinds' editorial brand identity, the underlying data, authentication, payment, and administrative logic relied heavily on demo-mode simulations, client-side trust, and unauthenticated endpoints.

### Key Functional Deficiencies Identified:
1. **Simulated Payment Gateway**: Razorpay payment integration automatically fell back to mock generation (`pay_sim_...`, `simulated_sig_verified`) if API keys were missing, and the payment verification endpoint returned success without verifying signatures if secrets were not populated.
2. **Client-Trusted Billing & State**: Client components (`ApplicationModal.tsx`, `publish/page.tsx`) transmitted client-specified payment amounts (`amountPaid`), payment IDs, and payment statuses (`paymentStatus: 'paid'`) directly to the backend.
3. **In-Memory & Non-Persistent Backend**: Data mutation endpoints (`/api/applications`, `/api/articles`) wrote directly to an in-memory singleton class in `src/lib/data-store.ts`. On serverless deployments (such as Vercel), this state resets on cold starts.
4. **Unauthenticated Admin Moderation**: `/admin` and its corresponding API endpoints lacked session checks, role gates, and token verification. Anyone navigating to `/admin` could view applicant information and approve/publish submissions.
5. **Fabricated Metrics**: Hard-coded counters inflated applicant statistics (`+ 1420`) and revenue (`+ 492,000 INR`), presenting demo data as live business activity.
6. **Resume Collection**: Forms and schemas requested and validated `resumeUrl` fields, contrary to the defined MVP requirements.
7. **Missing Asynchronous Payment Recovery**: The system lacked Razorpay webhook integration to reconcile transactions if a user abandoned or closed the checkout browser tab after funds were debited.

---

## 2. Risk & Vulnerability Register

| Risk ID | Component | Vulnerability Description | Severity | Remediation Strategy |
| :--- | :--- | :--- | :--- | :--- |
| **SEC-01** | `src/app/admin` & `/api/articles` | Unauthenticated access to admin portal & unauthenticated PATCH mutation endpoints | **Critical** | Enforce Firebase Admin Bearer token verification against server allowlist `ADMIN_EMAILS`. |
| **SEC-02** | `api/payment/verify` | Signature verification bypassed when `RAZORPAY_KEY_SECRET` is unset; returns `{ verified: true }` | **Critical** | Fail closed. Enforce mandatory HMAC-SHA256 signature verification matching order ID, amount, and reference. |
| **SEC-03** | `ApplicationModal` & `publish/page` | Client dictates `amountPaid` and `paymentStatus` in POST payload | **Critical** | Enforce server-side authoritative pricing dictionary. Client transmits only product key and metadata. |
| **SEC-04** | `src/lib/razorpay.ts` | `simulateCheckout` provides fake transaction IDs and signatures | **High** | Remove all client simulation and fake keys; fail with explicit error if checkout fails. |
| **SEC-05** | `src/lib/google-sheets.ts` | Fails open with `{ simulated: true, success: true }` when credentials are absent | **High** | Fail closed in production. Require explicit environment flag (`APP_ENV=development`) for local test mocks. |
| **SEC-06** | `data-store.ts` | Mutating state stored in memory; resets on serverless cold starts | **High** | Replace application/submission/payment storage with Private Google Sheets adapter as MVP system of record. |
| **SEC-07** | `publish/page.tsx` | Unsanitized user-submitted article content rendered directly | **Medium** | Sanitize all content strings to neutralize stored XSS risks before rendering. |
| **SEC-08** | Payment Lifecycle | No webhook reconciliation for dropped client sessions | **High** | Implement `/api/webhooks/razorpay` with raw payload HMAC verification. |

---

## 3. Component Categorization

### 3.1 Files to Retain
These files represent genuine editorial UI, brand styling, layout infrastructure, and legal compliance pages:
- `src/app/layout.tsx` (Root Next.js layout, font configurations, theme wrapper)
- `src/app/globals.css` (Tailwind styles, custom styling classes, dark mode tokens)
- `src/app/page.tsx` (Homepage layout, hero section, editorial values)
- `src/app/internships/page.tsx` & `src/app/internships/[slug]/page.tsx` (Internship directory & detail pages)
- `src/app/articles/page.tsx` & `src/app/articles/[slug]/page.tsx` (Articles directory & reader pages)
- `src/app/contact/page.tsx` (Contact & inquiry registry utilizing official Google Form)
- `src/app/about/page.tsx`, `src/app/editorial-policy/page.tsx`, `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` (Legal and editorial policy documentation)
- `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/components/Breadcrumbs.tsx`, `src/components/ThemeProvider.tsx`, `src/components/JsonLd.tsx`

### 3.2 Files to Replace / Overhaul
These files contain core business logic, authentication, data persistence, and payment flows that must be rebuilt:
- `src/lib/types.ts`: Replaced with strict TypeScript data models (`InternshipApplication`, `ArticleSubmission`, `PaymentRecord`, `CertificateRecord`, `ContactTicket`).
- `src/lib/google-sheets.ts`: Replaced with a secure server-only adapter handling the 5 required tabs (`Applications`, `ArticleSubmissions`, `Payments`, `ContactTickets`, `Certificates`) with ID lookup, update, and idempotent upsert.
- `src/lib/firebase-admin.ts`: Overhauled to verify Bearer tokens and enforce the `ADMIN_EMAILS` allowlist.
- `src/lib/firebase.ts`: Hardened to enforce real Google authentication without mock tokens in production.
- `src/lib/razorpay.ts`: Stripped of all simulation fallbacks and fake keys; standard checkout loader only.
- `src/lib/data-store.ts`: Stripped of in-memory mutations and fake metrics; retained strictly as static seed data for content development.
- `src/app/api/payment/create-order/route.ts`: Replaced with server-priced order creation tied to authenticated user.
- `src/app/api/payment/verify/route.ts`: Replaced with cryptographically verified, idempotent payment recording.
- `src/components/ApplicationModal.tsx`: Rebuilt without resume inputs; requires Google sign-in; integrates verified payment flow.
- `src/app/publish/page.tsx`: Rebuilt with mandatory Google sign-in; collects peer-review submissions with server-verified payments.
- `src/app/admin/page.tsx`: Rebuilt with administrative authorization gate, accurate metrics, and editorial review actions.
- `.env.example`: Updated with all required configuration keys and safe variable documentation.

### 3.3 Files to Remove or Archive
- `src/app/api/verify-and-save/route.ts`: Removed / archived. (Superseded by dedicated `/api/payment/create-order`, `/api/payment/verify`, and `/api/webhooks/razorpay`).
- `test-api.js` & `test-routes.js`: Archived into `docs/archive/` and replaced by an automated integration test suite in `tests/`.

---

## 4. Next Phase Authorization

The refactoring will proceed in sequential, verifiable phases:
- **Phase 1**: Types, environment documentation, and model definitions.
- **Phase 2**: Firebase Admin auth hardening and Google Sheets adapter.
- **Phase 3**: Authoritative Razorpay payment service and webhook processor.
- **Phase 4**: User-facing application and article submission pipelines.
- **Phase 5**: Admin moderation API, article publishing, and certificate issuance.
- **Phase 6**: Automated testing, security checks, and operational runbook.
