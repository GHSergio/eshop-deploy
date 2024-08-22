import React, { useEffect, useCallback } from "react";
import { Grid, Typography, Box } from "@mui/material";
import SearchBar from "./SearchBar";
import ProductCard from "./ProductCard";
// import Sidebar from "./SideBar";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/index";
import {
  setSearchQuery,
  fetchProductsAndCategories,
} from "../slice/productSlice";
import { createSelector } from "reselect";

// 使用 reselect 創建記憶化選擇器，優化性能。
// 這個選擇器會記住上次的計算結果，除非依賴的state改變，否則不會重新計算。
const selectFilteredProducts = createSelector(
  (state: RootState) => state.products.products, // 提取 products 狀態
  (state: RootState) => state.products.searchQuery, // 提取 searchQuery 狀態
  (_: RootState, category?: string) => category, // 接受額外的參數 category
  (products, searchQuery, category) => {
    // 基於提取的狀態和參數進行計算
    return products.filter((product) => {
      const matchesCategory =
        !category || product.category.toLowerCase() === category.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }
);

interface MainContentProps {
  category?: string;
}

const MainContent: React.FC<MainContentProps> = ({ category }) => {
  // 明確指定 dispatch 的類型
  const dispatch: AppDispatch = useDispatch();
  // useSelector 用來從 Redux store 中提取狀態
  const { loading, error } = useSelector((state: RootState) => state.products);

  // useCallback 優化的回調函數來避免不必要的重渲染。
  // 只有當 `dispatch` 改變時，這些回調函數才會重新創建。
  const fetchProducts = useCallback(() => {
    dispatch(fetchProductsAndCategories());
  }, [dispatch]);

  const clearSearchQuery = useCallback(() => {
    dispatch(setSearchQuery(""));
  }, [dispatch]);

  // 當組件掛載時執行 API 請求，並且在 category 改變時重置搜尋字串。
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    clearSearchQuery();
  }, [category, clearSearchQuery]);

  // 使用 reselect 選擇器從 Redux store 中選取需要的狀態。
  // 避免每次重渲染都重新計算過濾結果，提升性能。
  const filteredProducts = useSelector((state: RootState) =>
    selectFilteredProducts(state, category)
  );

  // // 根據 category 和 searchQuery 進行過濾
  // const filteredProducts = products.filter((product) => {
  //   const matchesCategory =
  //     !category || product.category.toLowerCase() === category.toLowerCase();
  //   const matchesSearch =
  //     searchQuery === "" ||
  //     product.title.toLowerCase().includes(searchQuery.toLowerCase());
  //   return matchesCategory && matchesSearch;
  // });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {/* Main Container */}
      <Grid
        container
        sx={{
          width: { xs: "95%", sm: "98%" },
          marginX: "auto",
          marginY: "20px",
          paddingX: { xs: "0", sm: "0.5rem" },
          height: "100%",
        }}
      >
        {/* Sidebar SM */}
        {/* <Grid
          item
          xs={2}
          sm={2}
          sx={{
            height: "100%",
            display: { xs: "none", sm: "block" },
          }}
        >
          <Sidebar categories={categories} />
        </Grid> */}

        {/* Search & Card */}
        <Grid item xs={12} sm={12}>
          {/* SearchBar */}
          <Grid item sm={4} md={4} lg={3}>
            <SearchBar />
          </Grid>

          {/* 顯示結果文字 */}
          <Grid item my={3}>
            符合的結果為 {filteredProducts.length} 筆
          </Grid>

          {/* Card container with grid layout */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 2,
            }}
          >
            {filteredProducts.length === 0 ? (
              <Typography variant="h6" align="center">
                搜尋不到相關結果
              </Typography>
            ) : (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.image}
                  title={product.title}
                  price={product.price}
                />
              ))
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default MainContent;
