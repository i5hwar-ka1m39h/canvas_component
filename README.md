# Fabric Trial

## How to Run the Project Locally

To run this project on your local machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd fabric-trial
   ```

2. **Install dependencies:**
   Ensure you have [Node.js](https://nodejs.org/) installed, then run:
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open the project in your browser:**
   By default, the development server runs at `http://localhost:5173`. Open this URL in your browser to view the project.

## Build for Production

To build the project for production, run:
```bash
npm run build
```
The output files will be located in the `dist` directory.

## Libraries Used

### Dependencies
- **[fabric](https://github.com/fabricjs/fabric.js):** A powerful and simple to use JavaScript canvas library.
- **[react](https://reactjs.org/):** A JavaScript library for building user interfaces.
- **[react-dom](https://reactjs.org/docs/react-dom.html):** Provides DOM-specific methods for React.

### DevDependencies
- **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react):** Enables React fast refresh and other optimizations in Vite.
- **[eslint](https://eslint.org/):** A tool for identifying and fixing code quality issues.
- **[@eslint/js](https://github.com/eslint/eslint):** JavaScript-specific configurations for ESLint.
- **[eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react):** Linting rules for React projects.
- **[eslint-plugin-react-hooks](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks):** Enforces React Hooks rules.
- **[eslint-plugin-react-refresh](https://github.com/facebook/react/tree/main/packages/react-refresh):** Ensures React Refresh works seamlessly.
- **[tailwindcss](https://tailwindcss.com/):** A utility-first CSS framework.
- **[postcss](https://postcss.org/):** A tool for transforming CSS with JavaScript plugins.
- **[autoprefixer](https://github.com/postcss/autoprefixer):** A PostCSS plugin to parse CSS and add vendor prefixes.
- **[vite](https://vitejs.dev/):** A next-generation frontend tooling for faster and leaner development.
- **[@types/react](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react):** TypeScript definitions for React.
- **[@types/react-dom](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-dom):** TypeScript definitions for React DOM.
- **[globals](https://github.com/sindresorhus/globals):** Provides a global variables list for use in ESLint configurations.



## Challeges faced
Initially i tried to use 