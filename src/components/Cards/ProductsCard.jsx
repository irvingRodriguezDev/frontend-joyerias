import { Paper, Typography } from "@mui/material";
import React from "react";

const ProductsCard = ({ product }) => {
  return (
    <Paper>
      <Typography>{product.clave}</Typography>
    </Paper>
  );
};

export default ProductsCard;
