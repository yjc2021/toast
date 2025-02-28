import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Toaster from "./components/Toast/Toaster.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster position="top-right" delay={4000}>
      <App />
    </Toaster>
  </StrictMode>,
);
