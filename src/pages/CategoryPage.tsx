import React from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import MainContent from "../components/MainContent";

const CategoryPage: React.FC = () => {
  //從網址動態參數獲取category
  const { category } = useParams<{ category: string }>();

  return (
    <div>
      <Grid
        container
        direction="column"
        sx={{ minHeight: "100vh", width: "100%" }}
      >
        <MainContent category={category} />
      </Grid>
    </div>
  );
};

export default CategoryPage;
