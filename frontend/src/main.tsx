
// src/main.tsx  (or index.tsx – whichever you use as the entry file)

import React, {
  StrictMode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { createRoot } from "react-dom/client";

import App from "./App";                 // stays .tsx – no change needed
import { CartProvider } from "../src/contexts/CartContext";
import "./index.css";


interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  user: unknown | null;                 // replace `unknown` with your User type
  setUser: Dispatch<SetStateAction<unknown | null>>;
}

export const Context = createContext<AuthContextType>({
  isAuthenticated: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsAuthenticated: () => {},
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {},
});


const AppWrapper: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<unknown | null>(null);          // swap `unknown` for your User type

  return (
    <Context.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
    >
      <CartProvider>
        <App />
      </CartProvider>
    </Context.Provider>
  );
};

/* ------------------------------------------------------------------ */
/* 3.  Render                                                         */
/* ------------------------------------------------------------------ */

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element with id 'root' not found");
}

createRoot(container).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
