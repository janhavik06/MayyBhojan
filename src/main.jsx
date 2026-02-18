import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./components/Cart/CartContext.jsx";
import { FavoriteProvider } from "./components/Customer/Dashboard/FavoriteContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FavoriteProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </FavoriteProvider>
  </StrictMode>
);
