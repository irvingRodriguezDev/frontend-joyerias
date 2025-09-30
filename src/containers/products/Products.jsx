import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import Layout from "../../components/Layout/Layout";
import { Button } from "@mui/material";
const Products = () => {
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography fontSize='30px' fontWeight='bold' sx={{ color: "white" }}>
            Mis Productos
          </Typography>
        </Grid>
        <Grid size={12} sx={{ display: "flex", justifyContent: "end" }}>
          <Button variant='contained' color='secondary'>
            Agregar
          </Button>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Products;
