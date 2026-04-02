---
name: design-preview-capture
description: Use when a design app created from this template needs a generated screenshot preview image. Uses the bundled scripts/capture-preview.cjs Playwright helper instead of writing ad hoc screenshot code.
---

# Design Preview Capture

For design tasks, keep the result minimalist and lightweight.

Use the repository script:

```bash
npm run capture:preview -- --output .codly/design-preview.png --width 1200 --height 900 --format png
```

Rules:

- Prefer `scripts/capture-preview.cjs` over writing a new screenshot script.
- Default script output is `jpeg`, but use `--format png` for Codly preview artifacts.
- Pass explicit `--width` and `--height` when the task implies a target aspect ratio.
- Start the app only as needed for the screenshot.
- Do not add export UI or screenshot features to the generated app unless explicitly requested.
