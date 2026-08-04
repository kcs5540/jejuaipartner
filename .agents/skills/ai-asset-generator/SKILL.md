---
name: ai-asset-generator
description: Prompting rules and template styles for generating pristine web UI elements, assets, and hero illustration images.
---

# AI Asset & Image Generation Guidelines

This skill guides the agent in using the `generate_image` tool effectively to produce stunning visual web assets, icons, illustrations, and hero banners.

## 1. Preventing Device Mockups (Critical Rule)
When generating UI mockups or visual components, explicitly request the UI itself without surrounding device frames (e.g., "no phone mockup, no laptop container, flat user interface").

## 2. Recommended Prompt Styles & Keywords

### Flat Vector & Minimalist Style (For features, badges, icons)
> **Template**: "Minimalist flat vector illustration of [Subject], clean solid background, geometric style, modern UI design, vibrant color scheme, SVG look, --no shadows --no 3d"
* Best for: Informational card graphics, icon sets, step-by-step guides.

### Modern 3D Claymorphism / Neomorphism (For high-tech modern sites)
> **Template**: "Cute 3D clay style render of [Subject], smooth soft lighting, pastel color palette, isometric view, transparent background feeling, high fidelity, modern digital asset style"
* Best for: SaaS features, dashboard elements, visual eye-candy.

### Cyberpunk / Dark Glow Style (For dark mode tech sites)
> **Template**: "Futuristic dark neon concept of [Subject], glowing lines, dark blue and purple gradient background, high-contrast, cyberpunk aesthetic, digital art, high resolution"
* Best for: Dark theme landing page hero banners, AI features.

## 3. Configuration Best Practices
* **Aspect Ratios**:
  * For hero sections, use `16:9` or `3:2`.
  * For card graphics or profiles, use `1:1` or `4:3`.
* **Output Naming**: Keep names lowercase and underscore-separated (e.g., `hero_glow_banner`, `feature_clay_globe`).
* **Image editing / refinement**: Provide existing image paths to modify styles or combine assets when iterating on page designs with the user.
