import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/index";
import {
  Product,
  fetchAllProducts,
  fetchAllCategories,
} from "../api/FakeStoreAPI";

interface CartItem {
  id: string;
  image: string;
  title: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
}

//定義狀態
interface ProductState {
  products: Product[];
  categories: string[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  cart: CartItem[];
  showCart: boolean;
}

//定義 狀態 初始值
const initialState: ProductState = {
  products: [],
  categories: [],
  loading: true,
  error: null,
  searchQuery: "",
  cart: [],
  showCart: false,
};

// 定義非同步操作 (Thunk)
export const fetchProductsAndCategories = createAsyncThunk(
  // 路徑用來識別這個 Thunk，隨意命名
  "products/fetchProductsAndCategories",
  async () => {
    const [productsData, categoriesData] = await Promise.all([
      fetchAllProducts(),
      fetchAllCategories(),
    ]);
    return { products: productsData, categories: categoriesData };
  }
);

// 創建 Slice
const productSlice = createSlice({
  // Slice 的名稱，用於區分不同的 Slice
  name: "products",
  initialState, // 初始化狀態
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const item = action.payload;
      const existingItem = state.cart.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.color === item.color &&
          cartItem.size === item.size
      );

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.cart.push(item);
      }
    },
    removeFromCart(
      state,
      action: PayloadAction<{ id: string; color: string; size: string }>
    ) {
      const { id, color, size } = action.payload;
      state.cart = state.cart.filter(
        (item) => item.id !== id || item.color !== color || item.size !== size
      );
    },
    updateCartItemQuantity(
      state,
      action: PayloadAction<{
        id: string;
        color: string;
        size: string;
        quantity: number;
      }>
    ) {
      const { id, color, size, quantity } = action.payload;
      const existingItem = state.cart.find(
        (item) => item.id === id && item.color === color && item.size === size
      );
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
    clearCart(state) {
      state.cart = [];
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setShowCart(state, action: PayloadAction<boolean>) {
      state.showCart = action.payload;
    },
    openCart(state) {
      state.showCart = true;
    },
    closeCart(state) {
      state.showCart = false;
    },
  },
  // 處理 Thunk 狀態變化
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAndCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsAndCategories.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.categories = action.payload.categories;
        state.loading = false;
      })
      .addCase(fetchProductsAndCategories.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch products and categories";
      });
  },
});

// Selector：計算購物車中商品的總數量
export const selectCartItemCount = (state: RootState) => {
  return state.products.cart.reduce((total, item) => total + item.quantity, 0);
};

// 導出 actions 給元件使用
export const {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  setSearchQuery,
  setShowCart,
  openCart,
  closeCart,
} = productSlice.actions;

// 導出 reducer 給 store 使用
export default productSlice.reducer;
