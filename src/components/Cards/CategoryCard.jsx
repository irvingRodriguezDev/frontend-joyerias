import { Paper, Typography } from "@mui/material";
import React from "react";

const CategoryCard = ({ category }) => {
  return (
    <Paper>
      <Typography>{category.name}</Typography>
      <Typography></Typography>
      <Typography></Typography>
      <Typography></Typography>
      <Typography></Typography>
    </Paper>
  );
};

export default CategoryCard;
