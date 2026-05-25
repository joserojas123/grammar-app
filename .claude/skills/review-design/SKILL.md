---
name: review-design
description: Review the UI/UX design of this grammar app and give a score, checklist, and suggestions. Use when the user asks to review the UI, check the design, evaluate the interface, or says things like "how does the UI look?", "review my design", "is the UX good?", "give me feedback on the interface", or anything about the visual design or user experience of the app.
---

## Instructions

Read the following source files to understand the current UI:

- `src/app/page.tsx` — main page layout and content
- `src/app/globals.css` — global styles
- `src/app/layout.tsx` — root layout and font setup
- `src/components/GenerateButton.tsx` — the generate button component

After reading them, evaluate the UI/UX across these dimensions:

- **Layout & Structure** — Is the page well-organized? Does it use space effectively?
- **Typography** — Font sizes, hierarchy, readability
- **Color & Contrast** — Are colors accessible? Does contrast meet WCAG AA standards?
- **Consistency** — Are spacing, sizing, and style uniform across components?
- **Responsiveness** — Does the layout adapt to mobile and different screen sizes?
- **Accessibility** — Semantic HTML, ARIA labels, keyboard navigation support
- **UX Flow** — Is the interaction clear and intuitive?
- **Visual Feedback** — Does the user get clear feedback after interacting?

## Output format

Present your review using this exact structure:

---
## UI/UX Review

### Score: X/10

### Checklist
- [x/space] Layout is well-structured
- [x/space] Typography is readable and hierarchical
- [x/space] Color contrast meets WCAG AA
- [x/space] Responsive on mobile
- [x/space] Accessible (semantic HTML, ARIA, keyboard)
- [x/space] Clear visual feedback on interaction
- [x/space] Consistent spacing and sizing
- [x/space] Intuitive UX flow

### Suggestions
1. **[Area]** — What the issue is and how to fix it
2. **[Area]** — ...

---

Be specific — reference actual class names, elements, or patterns from the code when pointing out issues or praising something. Avoid generic advice that could apply to any app.
