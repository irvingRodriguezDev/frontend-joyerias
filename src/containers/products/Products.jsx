import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useContext, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import ProductContext from "../../Context/Products/ProductsContext";
import ProductsCard from "../../components/Cards/ProductsCard";
const Products = () => {
  const { products, getAllProducts } = useContext(ProductContext);
  useEffect(() => {
    getAllProducts();
  }, []);
  console.log(products);

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography fontSize='30px' fontWeight='bold' sx={{ color: "white" }}>
            Mis Productos
          </Typography>
        </Grid>
        <Grid size={12} sx={{ display: "flex", justifyContent: "end" }}>
          <Link to={"/crear-producto"}>
            <Button variant='contained' color='secondary'>
              Agregar
            </Button>
          </Link>
        </Grid>
        {products.map((p, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
            <ProductsCard product={p} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Products;
