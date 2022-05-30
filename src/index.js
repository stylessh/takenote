import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import * as serviceWorkerRegistration from "./pwa/serviceWorkerRegistration";
import reportWebVitals from "./utils/reportWebVitals";

// Theme
import { ThemeProvider } from "./context/themeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// Service Worker
serviceWorkerRegistration.register();

// Web vitals
reportWebVitals();
