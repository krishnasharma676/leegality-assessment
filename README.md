# Leegality Assessment - E-Commerce Platform

A premium, responsive product catalog application built with React and Tailwind CSS, featuring category-wise pagination, advanced filtering, and a sleek product detail view.

## 🚀 Live Demo & Repository
- **GitHub Repository**: [https://github.com/your-username/leegality-assessment](https://github.com/your-username/leegality-assessment)
- **Tech Stack**: React 19, Vite, Tailwind CSS 4, Lucide React, React Router 7.

---

## 🛠️ Setup Instructions

### Prerequisites
- **Node.js**: v18 or higher
- **npm** or **yarn**

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/leegality-assessment.git
   cd leegality-assessment
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🧠 Architectural Decisions

### 1. Centralized Layout Management
Used a `MainLayout` component to manage the application's shell. This includes the sidebar filters and navbar. By using `Outlet` with context, filter states (search, category, price) are shared seamlessly with the listing page without needing a complex state management library like Redux.

### 2. Category-Grouped Pagination
Unlike traditional e-commerce sites that use global pagination, this app groups products by category. Each category section features its own independent pagination (4 items per page). This improves discoverability and provides a cleaner "catalog" feel.

### 3. Service Layer for API
All network requests are abstracted into `services/api.js`. This makes the code more maintainable and allows for easy swapping of data sources or adding error handling/interceptors in the future.

### 4. Modern Aesthetics with Tailwind 4
Leveraged the latest Tailwind CSS 4 features for styling, using a slate-based color palette with deep blue accents to create a premium, high-end dashboard feel.

---

## 📝 Assumptions Made

1. **Currency Conversion**: The FakeStoreAPI provides prices in USD. I have assumed a fixed conversion rate of **1 USD = 80 INR** for a more localized user experience.
2. **Product Gallery**: Since the API provides only one image per product, the gallery section in the `ProductDetail` page uses the main image as a placeholder for thumbnails.
3. **Cart Functionality**: The "Add to Cart" button currently serves as a UI interaction. A full-fledged cart system was considered out of scope for the current assessment focus on listing and details.
4. **Data Freshness**: Assumed the API data is relatively static for the duration of the user session; hence, no complex caching (like React Query) was implemented.

---

## 📈 Improvements (Given More Time)

1. **Global Cart Management**: Implement a persistent cart using Redux Toolkit or Context API, with `localStorage` persistence.
2. **Skeleton Loaders**: Replace the central loading spinner with content-aware skeleton screens for a smoother perceived performance.
3. **TypeScript Migration**: Convert the project to TypeScript to ensure strict type safety for API responses and component props.
4. **Enhanced Search**: Implement fuzzy search and debounced input to improve the search experience on large datasets.
5. **Unit & E2E Testing**: Add Jest/Vitest for logic testing and Playwright for end-to-end user flow validation.
6. **Dark Mode Support**: Add a theme switcher to leverage Tailwind's dark mode capabilities fully.

---

### Developed for Leegality Frontend Assessment
