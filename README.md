# Frontend Test – Articles SPA

Single Page Application built with **React + TypeScript** that displays and filters articles from an open public API.

The project follows the provided **Figma low-fidelity prototype** and implements all required features from the test assignment.

---

## 🔗 Demo

Local development:


http://localhost:5173


API used:


https://api.spaceflightnewsapi.net/v4/articles


---

## 📌 Features

### Home page
- Articles displayed as **cards**
- Each card contains:
  - Image
  - Publication date
  - Title
  - Short description (trimmed to 100 characters)
- Keyword search with:
  - Multiple keywords support
  - Case-insensitive matching
  - Highlighted matches (yellow)
- Result counter
- Responsive grid:
  - Desktop: 3 columns
  - Tablet: 2 columns
  - Mobile: 1 column

### Article page
- Full article view
- Hero image
- Title
- Full description
- Back to homepage link
- **No date shown**, according to Figma

---

## 🔍 Search logic

- Input supports multiple keywords separated by spaces or commas
- Articles are filtered if **at least one keyword** matches:
  - Title
  - Description
- Ranking priority:
  1. Matches in title
  2. Matches in description
- Highlighting is applied to matched words only

---

## 🧠 State management

State is managed using **React Context + useReducer** with clean architecture:
- **articles.reducer.ts** - Actions, reducer logic, and state types
- **articles.store.tsx** - Context provider and custom hooks
- **articles.selectors.ts** - Computed state and business logic

Features:
- Articles list with pagination
- Search query with real-time filtering
- Loading states and error handling
- Type-safe actions with exhaustive checking

This approach keeps the logic predictable, testable, and easy to scale.

---

## 🧩 Custom logic & utilities

The project includes:
- Custom selectors
- Search and ranking utilities
- Keyword parsing
- Highlighting logic
- Result counter
- Text truncation

All core logic is **unit-tested**.

---

## 🧪 Tests

Tests are written with **Vitest** and cover:
- Keyword parsing
- Article filtering and sorting
- Highlight splitting
- Utility helpers

Test files:
- `articles.reducer.test.ts` - State management tests
- `articles.search.test.ts` - Search logic tests
- `articles.utils.test.ts` - Utility functions tests

---

## 🔒 Quality Gates

The project uses **Husky** to enforce code quality before pushes:

**Pre-push checks include:**
- **Linting** (`npm run lint`) - Code style and error checking
- **Testing** (`npm test`) - All unit tests must pass
- **Building** (`npm run build`) - TypeScript compilation and build verification

If any check fails, the push will be blocked automatically.

---

## 🛠️ Tech stack

- **React**
- **TypeScript**
- **Vite**
- **Material UI**
- **SCSS Modules**
- **Axios**
- **React Router**
- **Vitest**

---

## 📁 Project structure

```
src/
├── api/ # API layer (axios, requests)
├── app/ # App bootstrap & router
├── components/ # Reusable UI components
│ ├── ArticleCard
│ ├── HighlightText
│ └── SearchBar
├── features/
│ └── articles/ # Domain logic
│     ├── articles.reducer.ts & .test.ts # State management (actions, reducer)
│     ├── articles.store.tsx # Context provider & hooks
│     ├── articles.selectors.ts # Computed state selectors
│     ├── articles.search.ts & .test.ts # Search & filtering logic
│     ├── articles.utils.ts & .test.ts # Utility functions
│     └── articles.types.ts # TypeScript type definitions
├── pages/
│ ├── ArticlesPage
│ └── ArticlePage
├── styles/ # Global styles
└── main.tsx
```

---

## 🚀 Getting started

Install dependencies:
```bash
npm install
```

Run development server:
```bash
npm run dev
```

Run tests:
```bash
npm run test
```

Build for production:
```bash
npm run build
```




# Test comment
