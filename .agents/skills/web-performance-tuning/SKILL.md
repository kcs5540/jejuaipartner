---
name: web-performance-tuning
description: Standards and guidelines for web asset optimization, fast loading, and minimizing Layout Shifts (CLS).
---

# Web Performance & Tuning Guidelines

This skill guides the agent in writing fast, optimized web interfaces that achieve excellent Core Web Vitals (LCP, CLS, FID/INP).

## 1. Image Optimization
Never use raw heavy PNG/JPG files for large assets. Use modern formats and lazy loading.

### Responsive WebP/AVIF with Fallbacks
Use the `<picture>` tag to deliver the best format based on browser support.
```html
<picture>
  <source srcset="images/hero.avif" type="image/avif">
  <source srcset="images/hero.webp" type="image/webp">
  <img src="images/hero.jpg" alt="Hero Banner" loading="lazy" width="800" height="600">
</picture>
```

### Essential Image Best Practices
1. **Always define `width` and `height`**: This reserves layout space and prevents Layout Shift (CLS).
2. **Apply `loading="lazy"`**: Use this on all offscreen images. Do NOT apply to the LCP (Largest Contentful Paint) image above the fold.
3. **Use CSS `aspect-ratio`**: Secure container sizes for responsive layouts.

## 2. Web Font Optimization
Avoid rendering invisible text during font loading (FOIT).
* **Font Display**: Always append `font-display: swap;` in `@font-face` rules.
* **Preloading critical fonts**:
  ```html
  <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
  ```

## 3. Minimizing Layout Shifts (CLS)
Ensure custom UI elements do not dynamically shift elements around during render:
* Reserve height for dynamic components (like skeleton loaders for lazy fetched data).
* Avoid inserting content above existing content dynamically unless initiated by user interaction.
