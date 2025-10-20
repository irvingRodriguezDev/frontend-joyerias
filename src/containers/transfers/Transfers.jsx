import { Grid, Typography } from "@mui/material";
import React from "react";
import Layout from "../../components/Layout/Layout";
const Transfers = () => {
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography fontWeight='bold' fontSize='30px' color='white'>
            Transpasos de productos
          </Typography>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Transfers;
