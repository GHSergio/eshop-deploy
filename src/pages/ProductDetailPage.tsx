import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { Product, fetchProductById } from "../api/FakeStoreAPI";
import { useDispatch } from "react-redux";
import { addToCart } from "../slice/productSlice";

const ProductDetail: React.FC = () => {
  //從網址動態參數獲取id
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const dispatch = useDispatch();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const fetchedProduct = await fetchProductById(Number(id));
        setProduct(fetchedProduct);

        if (fetchedProduct) {
          const updatedProduct = {
            ...fetchedProduct,
            sizes: ["S", "M", "L", "XL"],
            colors: ["Red", "Blue", "Green", "Yellow"],
          };
          console.log(updatedProduct);
          setProduct(updatedProduct);
          setSelectedColor(updatedProduct.colors[0]);
          setSelectedSize(updatedProduct.sizes[0]);
        }
      } catch (err) {
        setError("商品資訊獲取失敗");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = useCallback(() => {
    if (product) {
      // 生成唯一的 ID，基於原始 ID、顏色和尺寸
      const uniqueId = `${product.id}-${selectedColor}-${selectedSize}`;
      dispatch(
        addToCart({
          id: uniqueId,
          // id: product.id,
          title: product.title,
          price: product.price,
          quantity,
          image: product.image,
          color: selectedColor,
          size: selectedSize,
        })
      );
    }
  }, [product, quantity, selectedColor, selectedSize, dispatch]);

  const handleColorChange = useCallback((e: SelectChangeEvent<string>) => {
    setSelectedColor(e.target.value as string);
  }, []);

  const handleSizeChange = useCallback((e: SelectChangeEvent<string>) => {
    setSelectedSize(e.target.value as string);
  }, []);

  const handleQuantityChange = useCallback((e: SelectChangeEvent<number>) => {
    setQuantity(e.target.value as number);
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6">找不到該商品資訊</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: "1000px",
        margin: "1rem auto",
        padding: "1rem",
        height: "100%",
      }}
    >
      {/* 上面中容器 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: "2rem",
        }}
      >
        {/* 左側區域：商品圖片 */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            style={{ width: "100%", maxHeight: "400px", objectFit: "contain" }}
          />
        </Box>

        {/* 右側區域：商品詳情 */}
        <Box sx={{ flex: 1 }}>
          {/* 商品名稱 */}
          <Typography
            variant="h5"
            component="h1"
            gutterBottom
            sx={{ fontSize: { xs: "1.15rem", sm: "2rem" } }}
          >
            {product.title} {selectedColor && `- ${selectedColor}`}{" "}
            {selectedSize && `(${selectedSize})`}
          </Typography>
          <Divider sx={{ marginY: "1rem" }} />

          {/* 顏色 & 尺寸 & 價錢 */}
          <Box>
            <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
              <InputLabel>Color</InputLabel>
              <Select
                value={selectedColor}
                onChange={handleColorChange}
                label="Color"
              >
                <MenuItem value="Red">Red</MenuItem>
                <MenuItem value="Blue">Blue</MenuItem>
                <MenuItem value="Green">Green</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
              <InputLabel>Size</InputLabel>
              <Select
                value={selectedSize}
                onChange={handleSizeChange}
                label="Size"
              >
                <MenuItem value="S">Small</MenuItem>
                <MenuItem value="M">Medium</MenuItem>
                <MenuItem value="L">Large</MenuItem>
              </Select>
            </FormControl>

            <Typography variant="h5" component="h2" gutterBottom>
              Price: ${product.price}
            </Typography>
          </Box>
          <Divider sx={{ marginY: "1rem" }} />

          {/* 數量 & 加到購物車 */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <FormControl sx={{ minWidth: "100px" }}>
              <InputLabel>Quantity</InputLabel>
              <Select
                value={quantity}
                onChange={handleQuantityChange}
                label="Quantity"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>

      {/* 下面中容器 */}
      {/* 商品敘述 */}
      <Box sx={{ marginTop: "2rem" }}>
        <Typography variant="h6" component="h3" gutterBottom>
          Product Description
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {product.description}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductDetail;
