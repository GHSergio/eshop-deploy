import React, { useEffect } from "react";
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

interface MainContentProps {
  category?: string;
}

const MainContent: React.FC<MainContentProps> = ({ category }) => {
  // 明確指定 dispatch 的類型
  const dispatch: AppDispatch = useDispatch();
  // useSelector 用來從 Redux store 中提取狀態
  const { products, searchQuery, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  // 當組件掛載時，調用 fetchProductsAndCategories Thunk 獲取商品和分類數據
  useEffect(() => {
    dispatch(fetchProductsAndCategories());
  }, [dispatch]);

  // 當 category 改變時，清空搜尋字串
  useEffect(() => {
    dispatch(setSearchQuery(""));
  }, [category, dispatch]);

  // 根據 category 和 searchQuery 進行過濾
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !category || product.category.toLowerCase() === category.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
