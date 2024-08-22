import React, { useMemo } from "react";
import { Box, Typography, Divider, Card, CardMedia, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";

interface ReviewOrderProps {
  shippingInfo: any;
  paymentInfo: any;
}

const ReviewOrder: React.FC<ReviewOrderProps> = ({
  shippingInfo,
  paymentInfo,
}) => {
  const { cart } = useSelector((state: RootState) => state.products);

  const totalAmount = useMemo(() => {
    return cart.reduce(
      (total, item) => total + Math.floor(item.price * item.quantity),
      0
    );
  }, [cart]);

  const MainTextStyle = {
    fontWeight: "bold",
    fontSize: { xs: "0.5rem", sm: "0.9rem", md: "1rem" },
    textAlign: "center",
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        確認您的訂單
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        收件人資訊
      </Typography>
      <Typography variant="body1">姓名: {shippingInfo.fullName}</Typography>
      <Typography variant="body1">手機: {shippingInfo.phone}</Typography>
      <Typography variant="body1">縣市: {shippingInfo.city}</Typography>
      <Typography variant="body1">地區: {shippingInfo.area}</Typography>
      <Typography variant="body1">地址: {shippingInfo.address}</Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        付款資訊
      </Typography>
      <Typography variant="body1">
        信用卡號: **** **** **** {paymentInfo.cardNumber?.slice(-4)}
      </Typography>
      <Typography variant="body1">
        有效期限: {paymentInfo.expiryDate}
      </Typography>
      <Typography variant="body1">背面末三碼: ***</Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        購物車內容
      </Typography>
      <Grid container spacing={2}>
        {/* 參數說明 */}
        <Grid
          container
          item
          xs={12}
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          spacing={0.5}
          p={{ xs: 0.5, sm: 2 }}
        >
          <Grid item xs={2}>
            <Typography sx={MainTextStyle}>圖片</Typography>
          </Grid>{" "}
          <Grid item xs={4}>
            <Typography sx={MainTextStyle}>名稱</Typography>
          </Grid>{" "}
          <Grid item xs={2}>
            <Typography sx={MainTextStyle}>單價</Typography>
          </Grid>{" "}
          <Grid item xs={2}>
            <Typography sx={MainTextStyle}>數量</Typography>
          </Grid>{" "}
          <Grid item xs={2}>
            <Typography sx={MainTextStyle}>總額</Typography>
          </Grid>
        </Grid>

        {/* 商品內容 */}
        {cart.map((item) => (
          <Grid key={item.id} item xs={12}>
            <Grid
              container
              alignItems="center"
              spacing={0.5}
              p={{ xs: 0.5, sm: 2 }}
              sx={{
                border: "1px solid green",
                borderRadius: "8px",
                position: "relative",
                height: { xs: "100px", sm: "150px" },
              }}
            >
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
                <Typography variant="body1" sx={MainTextStyle}>
                  {item.title}
                </Typography>
                {/* 顏色 & 尺寸 */}
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={MainTextStyle}
                >
                  {item.color || "N/A"} - {item.size || "N/A"}
                </Typography>
              </Grid>
              {/* 單價 */}
              <Grid item xs={2}>
                <Typography variant="body1" align="right" sx={MainTextStyle}>
                  ${item.price}
                </Typography>
              </Grid>
              {/* 數量 */}
              <Grid item xs={2}>
                <Typography variant="body1" align="right" sx={MainTextStyle}>
                  {item.quantity}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1" align="right" sx={MainTextStyle}>
                  ${Math.floor(item.price * item.quantity)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ marginTop: "2rem", textAlign: "right" }}>
        <Typography variant="h5" gutterBottom>
          總計: ${totalAmount}{" "}
        </Typography>
      </Box>
    </Box>
  );
};

export default ReviewOrder;
