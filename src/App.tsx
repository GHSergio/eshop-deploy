//App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProviderComponent } from "./contexts/ThemeContext";
import { ProductProvider } from "./contexts/ProductContext";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import Layout from "./components/Layout";
import CategoryPage from "./pages/CategoryPage";

const App: React.FC = () => {
  return (
    <ThemeProviderComponent>
      <ProductProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />}></Route>
              {/* :參數 -> 動態參數 */}
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route
                path="products/:id"
                element={<ProductDetailPage />}
              ></Route>
              <Route path="cart" element={<CartPage />}></Route>
            </Route>
          </Routes>
        </Router>
      </ProductProvider>
    </ThemeProviderComponent>
  );
};

export default App;
