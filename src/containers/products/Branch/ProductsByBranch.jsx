import React from "react";
import Layout from "../../../components/Layout/Layout";
import { Grid, Typography } from "@mui/material";
const ProductsByBranch = () => {
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography color='white' fontSize='30px'>
            Productos de la sucursal
          </Typography>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ProductsByBranch;
