# 🐎 Horse Racing Game

An interactive horse racing simulator built with **Vue 3**, **Vuex 4**, and **Vite**.  
The project simulates 6 rounds of racing between randomly generated horses, each with unique attributes and animated movement.

## 🚀 Live Demo

The app is deployed on Google Cloud Run and accessible at:
▶️ [Live App (Google Cloud Run)](https://horse-race-panel-82874565963.europe-west1.run.app/)

---

## ⚙️ Tech Stack

- **Frontend**: Vue 3 + Vite
- **State Management**: Vuex 4
- **Vue Router** – Client-side routing
- **Vue Good Table** – [Vue Good Table Plugin](https://www.npmjs.com/package/vue-good-table)
- **Styling**: SCSS / CSS Modules
- **Testing**:
  - ✅ Unit Testing with [Vitest](https://vitest.dev)
  - ✅ End-to-End Testing with [Cypress](https://www.cypress.io)

---

## 🧩 Features

- 🐎 Generate up to 20 unique horses (with name, condition score, and color)
- 🏁 Auto-scheduling of 6 racing rounds with randomized horses
- 🕹️ Start, Pause, and Continue functionality
- 🎥 Real-time animated horse movement
- 🏆 Round-by-round result display with race winners
- 🧪 Full test coverage (unit + E2E)

---

### 🛠 Installation

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd horse-race-game
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to http://localhost:3030

### 🧪 Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### 🧪 Run E2E Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/)
