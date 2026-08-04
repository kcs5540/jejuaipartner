---
name: premium-ui-motion
description: Guidelines for high-end web designs, dark/light colors using HSL, and smooth CSS/JS transitions.
---

# Premium UI & Motion Guidelines

This skill guides the agent in implementing high-end, premium web layouts with dynamic micro-interactions, rich color systems, and modern visual design patterns.

## 1. Color System (HSL & Variables)
Avoid default CSS hex colors. Use HSL-based Tailwind-like tokens or CSS variables to allow seamless opacity modifications and theme switching.

### Premium Dark Theme Palette
```css
:root {
  --background: 224 71% 4%;
  --foreground: 213 31% 91%;
  --card: 224 71% 4%;
  --card-foreground: 213 31% 91%;
  --primary: 263.4 70% 50.4%; /* Neon Violet */
  --primary-foreground: 210 20% 98%;
  --secondary: 215 27.9% 16.9%;
  --accent: 190 90% 50%; /* Electric Cyan */
  --border: 216 34% 17%;
}
```

## 2. Advanced CSS Styles

### Glassmorphism Card
Always apply a subtle border and blur to cards in dark/gradient layouts to give a "premium glass" feel.
```css
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
}
```

### Soft Gradients
Use multi-stop gradients with opacity transitions for text headers and background blobs.
```css
.text-gradient {
  background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

## 3. Motion & Micro-interactions
* **Transitions**: Use `cubic-bezier(0.16, 1, 0.3, 1)` (easeOutExpo) for snappy yet premium-feeling transitions instead of default `ease`.
* **Hover State Elevation**:
  ```css
  .hover-elevate {
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
  }
  .hover-elevate:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
  ```
