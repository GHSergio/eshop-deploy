import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { ThemeProviderComponent } from "./contexts/ThemeContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProviderComponent>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProviderComponent>
  </StrictMode>
);
