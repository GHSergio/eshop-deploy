import React, { useState, useEffect, useContext, createContext } from "react";
import {
  Product,
  fetchAllProducts,
  fetchAllCategories,
} from "../api/FakeStoreAPI";

// 定義購物車商品的資料結構
interface CartItem {
  id: string;
  image: string;
  title: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
}

// 定義 Context 的資料結構，包括產品列表、類別列表、載入狀態以及錯誤訊息
interface ProductContextType {
  products: Product[];
  categories: string[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;

  // 購物車相關
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, color: string, size: string) => void;
  updateCartItemQuantity: (
    id: string,
    color: string,
    size: string,
    quantity: number
  ) => void;
  clearCart: () => void;
  // 管理購物車視窗顯示狀態
  showCart: boolean;
  setShowCart: (show: boolean) => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  // 計算購物車商品總數量
  cartItemCount: number;
}

// 創建一個 Context，初始值為 undefined，這樣可以讓 TypeScript 檢查確保我們正確使用這個 Context
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// 自定義 Hook，用於從 ProductContext 中獲取數據
export const useProductContext = (): ProductContextType => {
  const context = useContext(ProductContext); // 使用 useContext 來獲取當前的 Context 值
  if (!context) {
    // 如果 context 為 undefined，拋出錯誤，說明這個 Hook 必須在 ProductProvider 中使用
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context; // 返回 Context 值
};

// 創建一個 Provider 組件，包裹應用或組件樹，提供產品和類別數據
export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  // 購物車
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  console.log("購物車:", cart);

  //從API獲取商品列表 & 分類列表
  useEffect(() => {
    const loadData = async () => {
      try {
        // 同時發送兩個請求，分別獲取所有產品和所有類別數據
        const [productsData, categoriesData] = await Promise.all([
          fetchAllProducts(),
          fetchAllCategories(),
        ]);
        // console.log("商品資訊:", productsData);

        // 將獲取到的產品數據設置到 state
        setProducts(productsData);
        // 將獲取到的類別數據設置到 state
        setCategories(categoriesData);
      } catch (err) {
        // 如果發生錯誤，將錯誤信息設置到 state
        setError("商品清單獲取失敗");
      } finally {
        // 無論成功或失敗，都將 loading 狀態設置為 false
        setLoading(false);
      }
    };

    // 調用 loadData 函數來加載數據
    loadData();
  }, []);

  // 添加到購物車
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      //檢查相同id & color & size品項 是否已存在購物車內
      const existingItem = prevCart.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.color === item.color &&
          cartItem.size === item.size
      );

      // 如果找到相同ID、顏色、尺寸的商品，更新數量
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id &&
          cartItem.color === item.color &&
          cartItem.size === item.size
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        // 如果沒有找到相同的商品，將新商品添加到購物車
        return [...prevCart, item];
      }
    });
  };

  // 移除購物車商品
  // 比對id & color & size;
  const removeFromCart = (id: string, color: string, size: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => item.id !== id || item.color !== color || item.size !== size
      )
    );
  };

  //更新購物車商品數量
  const updateCartItemQuantity = (
    id: string,
    color: string,
    size: string,
    quantity: number
  ) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.color === color && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  // 清空購物車
  const clearCart = () => {
    setCart([]);
  };

  // 計算購物車中商品的總數
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // 控制Cart顯示狀態的函數
  const handleMouseEnter = () => {
    setShowCart(true);
  };

  // 當滑鼠離開
  const handleMouseLeave = () => {
    setShowCart(false);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        cart,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        showCart,
        setShowCart,
        handleMouseEnter,
        handleMouseLeave,
        cartItemCount,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
