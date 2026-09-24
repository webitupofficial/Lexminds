# LexMinds MVP Refactoring Change Summary

This document details all code changes, replacements, removals, and retained components executed during the conversion of the LexMinds demo into a production-grade MVP.

---

## 1. Retained Files
The following files were retained and verified for UI integrity, editorial design, and compliance with the visual brand:
- `src/app/layout.tsx`: Next.js Root Layout, Google Font pairing, theme wrapper.
- `src/app/globals.css`: LexMinds custom gold/slate styling tokens, glassmorphism, claymorphism, and responsive design utilities.
- `src/app/page.tsx`: Homepage hero, active fellowship card, peer-reviewed articles showcase, and academic commitments.
- `src/app/internships/page.tsx`: Fellowship listing directory with search and practice area filtering.
- `src/app/internships/[slug]/page.tsx` & `InternshipDetailClient.tsx`: Fellowship detail view with JSON-LD JobPosting schema.
- `src/app/articles/page.tsx` & `src/app/articles/[slug]/page.tsx` & `ArticleReaderClient.tsx`: Articles directory and scholarly treatise reader view with standardized Bluebook/OSCOLA citations.
- `src/app/contact/page.tsx`: Official contact desk and inquiry registry utilizing embedded Google Form for free queries.
- `src/app/about/page.tsx`, `src/app/editorial-policy/page.tsx`, `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`: Legal policies and editorial standards.
- `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/components/Breadcrumbs.tsx`, `src/components/ThemeProvider.tsx`, `src/components/JsonLd.tsx`: Reusable layout and navigation components.

---

## 2. Replaced & Overhauled Files
The following files were completely overhauled or rewritten to eliminate mock fallbacks, client trust, and security vulnerabilities:
- `src/lib/types.ts`: Replaced with strict TypeScript domain models (`InternshipApplication`, `ArticleSubmission`, `PaymentRecord`, `CertificateRecord`, `ContactTicket`) with finite statuses, internal IDs, and timestamps. Completely stripped of resume fields.
- `src/lib/google-sheets.ts`: Replaced with a server-only adapter handling all 5 required tabs (`Applications`, `ArticleSubmissions`, `Payments`, `ContactTickets`, `Certificates`) with ID lookup, update, idempotent upsert, and fail-closed security.
- `src/lib/firebase-admin.ts`: Overhauled to verify Bearer tokens and enforce the `ADMIN_EMAILS` allowlist.
- `src/lib/razorpay.ts`: Stripped of `simulateCheckout`, demo secrets, and fake signatures. Standard Razorpay checkout loader only.
- `src/lib/data-store.ts`: Stripped of in-memory mutable state arrays and fake counters (+1420 applicants, +492000 revenue); converted into a clean static content adapter for Sanity CMS integration.
- `src/app/api/payment/create-order/route.ts`: Rebuilt with mandatory user auth, server-side catalog pricing (₹299 internship, ₹499 article), and pending payment record creation.
- `src/app/api/payment/verify/route.ts`: Rebuilt with cryptographic HMAC-SHA256 signature verification and idempotent reconciliation.
- `src/components/ApplicationModal.tsx`: Rebuilt without resume inputs; requires Google sign-in; integrates verified payment flow; displays official docket reference.
- `src/app/publish/page.tsx`: Rebuilt with mandatory Google sign-in; collects complete author byline and declarations; integrates verified payment flow; informs author of review queue.
- `src/components/RazorpayModal.tsx`: Rebuilt with authenticated order initialization and server verification.
- `src/app/admin/page.tsx`: Rebuilt with strict Google Auth gate, `ADMIN_EMAILS` check, real platform metrics, and editorial action dialogs (review, request revision, approve & publish live, refund, issue certificate).
- `src/app/api/articles/route.ts`: Rebuilt as a public read-only endpoint returning strictly published articles.
- `src/app/api/applications/route.ts`: Rebuilt to reject unauthenticated access and direct submissions.
- `.env.example`: Updated with comprehensive variable definitions and zero exposed secrets.

---

## 3. New Modules Created
- `src/lib/payment-service.ts`: Central authoritative payment engine handling product catalog pricing, order creation, HMAC-SHA256 signature verification, and webhook processing.
- `src/lib/sanitize.ts`: HTML and script sanitizer preventing stored XSS in user manuscripts.
- `src/app/api/webhooks/razorpay/route.ts`: Asynchronous webhook handler reconciling `payment.captured`, `payment.failed`, and `refund.processed` events using raw request HMAC verification.
- `src/app/api/admin/verify/route.ts`: Administrative authorization verification endpoint.
- `src/app/api/admin/articles/route.ts`: Protected endpoint for manuscript queue retrieval, status updates, and live publishing.
- `src/app/api/admin/applications/route.ts`: Protected endpoint for internship applicant administration.
- `src/app/api/admin/certificates/route.ts`: Protected certificate issuance endpoint verifying requirement completion before issuance.
- `tests/mvp-security-pipeline.test.ts`: Automated test suite testing all 15 required security and functional criteria.

---

## 4. Removed & Archived Files
- `test-api.js` & `test-routes.js`: Moved to `docs/archive/` (superseded by automated test suite).
- `src/app/api/verify-and-save/route.ts`: Archived to `docs/archive/api-verify-and-save-route.ts`; replaced with 410 Gone stub in live routes.
