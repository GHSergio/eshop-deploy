import React, { useCallback, useMemo } from "react";
import {
  Box,
  Typography,
  Grid,
  Divider,
  IconButton,
  Checkbox,
  Button,
  Card,
  CardMedia,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/index";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../slice/productSlice";

interface SelectedItem {
  id: string;
  color: string;
  size: string;
}

interface CartSummaryProps {
  selectAll: boolean;
  setSelectAll: (value: boolean) => void;
  selectedItems: SelectedItem[];
  setSelectedItems: (items: SelectedItem[]) => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  selectAll,
  setSelectAll,
  selectedItems,
  setSelectedItems,
}) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state.products);

  const buttonTextStyle = {
    minWidth: { xs: "1rem", sm: "36px" },
    fontSize: { xs: "0.3rem", sm: "1rem" },
  };
  const footerTextStyle = { fontSize: { xs: "0.6rem", sm: "1rem" } };

  // 購物車全部品項
  const cartItems = useMemo(
    () =>
      cart.map((item) => ({
        id: item.id,
        color: item.color,
        size: item.size,
      })),
    [cart]
  );
  // 被選擇的商品
  const isItemSelected = useMemo(
    () => (id: string, color: string, size: string) =>
      selectedItems.some(
        (item) => item.id === id && item.color === color && item.size === size
      ),
    [selectedItems]
  );

  // 清空/全選 Cart全部品項
  const handleSelectAll = useCallback(() => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems);
    }
    setSelectAll(!selectAll);
  }, [selectAll, setSelectedItems, setSelectAll, cartItems]);

  // 當選擇Cart內特定品項
  const handleSelectItem = useCallback(
    (id: string, color: string, size: string) => {
      const isSelected = isItemSelected(id, color, size);

      // 已被選擇則移除checked
      if (isSelected) {
        setSelectedItems(
          selectedItems.filter(
            (item) =>
              !(item.id === id && item.color === color && item.size === size)
          )
        );
      } else {
        // 沒被選擇則添加checked
        setSelectedItems([...selectedItems, { id, color, size }]);
      }
    },
    [selectedItems, setSelectedItems]
  );

  // 改變商品數量
  const handleQuantityChange = useCallback(
    (id: string, color: string, size: string, newQuantity: number) => {
      if (newQuantity > 0) {
        dispatch(
          updateCartItemQuantity({ id, color, size, quantity: newQuantity })
        );
      }
    },
    [dispatch]
  );

  // 計算選中的商品的總金額
  const calculateTotal = useMemo(() => {
    return cart
      .filter((item) => isItemSelected(item.id, item.color, item.size))
      .reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart, isItemSelected]);

  // 計算選中的商品的總數量
  const calculateItemsCount = useMemo(() => {
    return cart
      .filter((item) => isItemSelected(item.id, item.color, item.size))
      .reduce((count, item) => count + item.quantity, 0);
  }, [cart, isItemSelected]);

  const totalAmount = Math.floor(calculateTotal);
  const shippingCost = 60;
  const discount = totalAmount > 100 ? shippingCost : 0;
  const finalTotal = totalAmount + shippingCost - discount;

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Checkbox
          checked={selectAll}
          onChange={handleSelectAll}
          sx={{ transform: { xs: "scale(0.5)", sm: "scale(1)" } }}
        />
        <Typography
          variant="h6"
          sx={{
            ml: 1,
            fontSize: { xs: "0.5rem", sm: "1rem" },
          }}
        >
          全選
        </Typography>
      </Box>

      {/* Main */}
      <Grid container spacing={2}>
        {cart.map((item) => (
          <Grid key={item.id} item xs={12}>
            <Grid
              container
              alignItems="center"
              spacing={0.5}
              p={{ xs: 0.5, sm: 1 }}
              sx={{
                border: "1px solid green",
                borderRadius: "8px",
                position: "relative",
                height: { xs: "120px", sm: "150px" },
              }}
            >
              {/* checkBox */}
              <Grid item xs={1} sx={{ textAlign: "center" }}>
                <Checkbox
                  checked={selectedItems.some(
                    (selectedItem) =>
                      selectedItem.id === item.id &&
                      selectedItem.color === item.color &&
                      selectedItem.size === item.size
                  )}
                  onChange={() =>
                    handleSelectItem(item.id, item.color, item.size)
                  }
                  sx={{
                    width: "0.5rem",
                    transform: { xs: "scale(0.5)", sm: "scale(1)" },
                  }}
                />
              </Grid>
              {/* 商品圖片 */}
              <Grid item xs={2}>
                <Card sx={{ width: { xs: "100%", sm: "50%" } }}>
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.title}
                    sx={{
                      objectFit: "contain",
                      width: "100%",
                    }}
                  />
                </Card>
              </Grid>
              <Grid item xs={4}>
                {/* 商品名稱 */}
                <Tooltip title={item.title}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "0.5rem", sm: "1rem" },
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.title}
                  </Typography>
                </Tooltip>
                {/* 顏色 & 尺寸 */}
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ fontSize: { xs: "0.4rem", sm: "0.9rem" } }}
                >
                  {item.color || "N/A"} - {item.size || "N/A"}
                </Typography>
              </Grid>

              {/* 數量Button */}
              <Grid item xs={3}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: { xs: "0.1rem", sm: "1rem" },
                  }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() =>
                      handleQuantityChange(
                        item.id,
                        item.color,
                        item.size,
                        item.quantity - 1
                      )
                    }
                    disabled={item.quantity <= 1}
                    sx={buttonTextStyle}
                  >
                    -
                  </Button>
                  <Typography
                    variant="body1"
                    sx={{
                      marginX: { xs: "0.3rem", sm: "1rem" },
                      fontSize: { xs: "0.5rem", sm: "1rem" },
                    }}
                  >
                    {item.quantity}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() =>
                      handleQuantityChange(
                        item.id,
                        item.color,
                        item.size,
                        item.quantity + 1
                      )
                    }
                    sx={buttonTextStyle}
                  >
                    +
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={2}>
                <Typography
                  variant="body1"
                  align="right"
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "0.5rem", sm: "1rem" },
                  }}
                >
                  ${Math.floor(item.price * item.quantity)}
                </Typography>
              </Grid>

              <IconButton
                onClick={() =>
                  dispatch(
                    removeFromCart({
                      id: item.id,
                      color: item.color,
                      size: item.size,
                    })
                  )
                }
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  transform: { xs: "scale(0.6)", sm: "scale(1)" },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      </Grid>

      {/* Footer */}
      <Box sx={{ my: 2, mr: 1 }}>
        {/* 商品金額 */}
        <Grid container justifyContent="flex-end" spacing={1}>
          <Grid item xs={6}>
            <Typography variant="body1" align="right" sx={footerTextStyle}>
              共 {calculateItemsCount} 件商品
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography variant="body1" align="right" sx={footerTextStyle}>
              商品金額
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" align="right" sx={footerTextStyle}>
              $ {totalAmount}
            </Typography>
          </Grid>
        </Grid>

        {/* 運費 */}
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1" align="right" sx={footerTextStyle}>
              滿$100免運費
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" align="right" sx={footerTextStyle}>
              運費
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography variant="body1" align="right" sx={footerTextStyle}>
              $ {shippingCost}
            </Typography>
          </Grid>
        </Grid>

        {/* 運費折抵 */}
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item xs={9}>
            <Typography variant="body1" align="right" sx={footerTextStyle}>
              運費折抵
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography variant="body1" align="right" sx={footerTextStyle}>
              -$ {discount}
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 1 }} />

        {/* 小計 */}
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item xs={8}>
            <Typography
              variant="h6"
              align="right"
              sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }}
            >
              小計
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant="h6"
              align="right"
              sx={{ fontSize: { xs: "0.7rem", sm: "1.2rem" } }}
            >
              $ {finalTotal}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CartSummary;
