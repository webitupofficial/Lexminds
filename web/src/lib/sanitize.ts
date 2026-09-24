/**
 * Basic HTML/Script Sanitizer for user-submitted article content.
 * Prevents stored Cross-Site Scripting (XSS) by stripping dangerous tags,
 * javascript: pseudo-protocols, and inline event handlers.
 */
export function sanitizeHtml(dirty: string): string {
  if (!dirty || typeof dirty !== 'string') return '';

  return dirty
    // Remove script tags and contents
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove iframe, object, embed, form, button, input
    .replace(/<\/?(iframe|object|embed|form|input|button|style|link|meta|applet)\b[^>]*>/gi, '')
    // Remove inline event handlers (e.g. onload=, onclick=, onerror=)
    .replace(/\son\w+\s*=\s*(['"]).*?\1/gi, '')
    .replace(/\son\w+\s*=\s*[^\s>]+/gi, '')
    // Remove javascript: and data: pseudo-protocols
    .replace(/href\s*=\s*(['"])\s*(javascript|data):.*?\1/gi, 'href="#"')
    .replace(/src\s*=\s*(['"])\s*(javascript|data):.*?\1/gi, 'src=""');
}
