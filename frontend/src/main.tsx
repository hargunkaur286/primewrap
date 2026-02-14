
// src/main.tsx  (or index.tsx – whichever you use as the entry file)

import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";                 // stays .tsx – no change needed
import "./index.css";

/* ------------------------------------------------------------------ */
/* 3.  Render                                                         */
/* ------------------------------------------------------------------ */

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element with id 'root' not found");
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
);
