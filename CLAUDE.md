# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server at http://localhost:3000
npm run build    # production build
npm run lint     # run ESLint
```

No test suite is configured.

## Architecture

This is a Next.js 16 app (App Router) with React 19, TypeScript, and Tailwind CSS v4. The React Compiler is enabled via `next.config.ts`.

The app randomly generates an English grammar exercise prompt (subject + verb + tense) on each button click.

**Data flow:**
1. CSV files in `public/data/` (`subjects.csv`, `verbs.csv`, `tenses.csv`) are fetched at runtime by the browser via `fetch("/data/*.csv")`.
2. `src/utils/csv.ts` — generic CSV parser; skips the header row and maps each row via a caller-supplied mapper function.
3. `src/hooks/useGrammarData.ts` — loads all three CSVs on mount, then exposes a `generate()` function that picks a random item from each list using `getDifferentRandomIndex` (guaranteed to differ from the previous pick).
4. `src/app/page.tsx` — single page that consumes `useGrammarData` and renders the results + `GenerateButton`.

**Adding new grammar data:** edit the corresponding CSV in `public/data/`. The header row (`id,<field>`) must be kept; the parser skips it.

**Adding a new data dimension** (e.g., objects): add a CSV, extend the types and `parseCSV` call in `useGrammarData.ts`, and add a `useRef` for the last index to avoid repeats.
