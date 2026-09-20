# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A single-page Thai food recommender ("เว็บแนะนำอาหารไทย"): a random-pick button, a favorites list, and a browsable/searchable grid of 30 menus. All UI text is Thai, mobile-first, with dark mode. `task.md` is the checklist of done/pending work (pending: menu images in `images/`, mobile/desktop testing, publishing).

## Running

There is no build system, package manager, linter, or test suite. It is static HTML/JS with no dependencies: open `index.html` in a browser (or serve the folder with any static server). Behavior is verified manually in the browser.
## Architecture

- `menus.js` — the only data source: a global `const MENUS` array (`id`, `category`, `name`, `emoji`, `image`, `description`). Loaded by both pages via `<script src="menus.js">`.
- `index.html` — home page with inline CSS and JS. State is module-level (`today`, `favorites`, `query`, `category`); every change calls `render()`, which rebuilds the DOM with `replaceChildren`.
- `details.html` — detail page for one menu, selected by `?id=<menu id>`. It has its own inline script and duplicates the favorites `load`/`save` logic from `index.html`.

Constraints that span files:
- Menu `id` is the persistence key for favorites, so it must be unique and never renamed. Favorites live in `localStorage` under `thai-food-favorites` as an array of ids, shared by both pages. Every `localStorage` access is wrapped in try/catch so the app still works when storage is unavailable. Ids no longer in `MENUS` are dropped on load.
- If `image` is empty the card falls back to `emoji`. Images go in `images/` (not created yet).
- `category` is a single value per menu and is used for the card badge and the category filter chips on the home page.

## Domain language

Use the terms in `CONTEXT.md` (Thai is the source of truth): **เมนู** (one dish; variants like กะเพราหมู/ไก่ are not separate menus), **ประเภท** (one category per menu), **เมนูวันนี้** (latest random result: never equal to the previous one, not persisted across refresh, so none until the user presses random), **เมนูโปรด** (user-toggled favorite). Avoid the listed alternative words (จาน, หมวด, แท็ก, ผลสุ่ม, บุ๊กมาร์ก, etc.).
