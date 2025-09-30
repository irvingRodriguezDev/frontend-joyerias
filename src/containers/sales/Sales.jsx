import React from "react";
import Layout from "../../components/Layout/Layout";
import { Button, Grid, Typography } from "@mui/material";

const Sales = () => {
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography fontSize='30px' fontWeight='bold' sx={{ color: "white" }}>
            Mis ventas
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

export default Sales;
