import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: number;
  image: string;
  title: string;
  price: number;
  discountPrice?: string;
  category?: string;
  description?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  title,
  price,
  discountPrice,
}) => {
  const navigate = useNavigate();
  // onClick image就會前往該商品細節頁面
  const handleClick = () => {
    navigate(`/products/${id}`);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={title}
        sx={{ cursor: "pointer", objectFit: "contain" }}
        onClick={handleClick}
      />
      <CardContent>
        <Tooltip title={title}>
          <Typography
            variant="h6"
            component="div"
            fontSize={"0.8rem"}
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </Typography>
        </Tooltip>
        <Typography variant="body2" color="text.secondary">
          {discountPrice ? (
            <>
              <span style={{ textDecoration: "line-through" }}> ${price}</span>{" "}
              <span>${discountPrice}</span>
            </>
          ) : (
            `$ ${price}`
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
