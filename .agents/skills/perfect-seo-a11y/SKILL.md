---
name: perfect-seo-a11y
description: Semantic HTML practices, SEO optimizations, Meta tags, and W3C accessibility compliance.
---

# SEO & Web Accessibility (A11y) Guidelines

This skill guides the agent in making websites SEO-friendly and highly accessible to search crawlers and screen readers.

## 1. Semantic HTML Structure
Use HTML5 semantic elements correctly. Refrain from nesting everything in `div`s.
* **Structure Example**:
  ```html
  <header>
    <nav aria-label="Main Navigation">...</nav>
  </header>
  <main id="main-content">
    <section>
      <h1>Primary Goal Description</h1>
    </section>
  </main>
  <footer>...</footer>
  ```
* **Rule**: Exactly one `<h1>` per page.

## 2. Advanced SEO Implementation

### Meta tags & Open Graph (OG)
Ensure every page contains search and social previews.
```html
<title>Premium Jeju AI Partner | Dynamic Business Solutions</title>
<meta name="description" content="Unlock your business potential with Jeju AI Partner's custom web designs and smart marketing strategies.">
<meta property="og:title" content="Jeju AI Partner - Web & AI Solutions">
<meta property="og:description" content="Custom web designs and smart marketing strategies.">
<meta property="og:image" content="https://jejuaipartner.com/images/og-image.jpg">
<meta property="og:type" content="website">
```

### Structured Data (JSON-LD)
Embed structured JSON-LD for rich search engine results (LocalBusiness, Organization, etc.).
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Jeju AI Partner",
  "image": "https://jejuaipartner.com/images/og-image.jpg",
  "url": "https://jejuaipartner.com",
  "telephone": "+82-64-000-0000",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Jeju",
    "addressCountry": "KR"
  }
}
</script>
```

## 3. Web Accessibility (A11y)
Make interactive elements accessible to everyone.
* **Interactive Controls**: Always use native elements (`<button>`, `<a>`) for interactive elements. If a custom element must be used, provide `role="button"` and `tabindex="0"`.
* **Screen Reader Descriptions**: Use `aria-label` or `aria-labelledby` for icon-only buttons.
* **Focus States**: Never disable focus outlines without adding a distinct, visible custom focus style (`:focus-visible`).
