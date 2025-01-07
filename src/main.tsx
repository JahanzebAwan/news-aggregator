import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline } from "@mui/material";
import App from "./App";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement); // Only call createRoot if the element exists
  root.render(
    <StrictMode>
      <CssBaseline />
      <App />
    </StrictMode>
  );
} else {
  console.error("Root element not found!");
}
