import React from "react";
import Layout from "../../components/Layout/Layout";
import { Button, Grid, Typography } from "@mui/material";
const Branches = () => {
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography
            sx={{ color: "white", fontWeight: "bold", fontSize: "30px" }}
          >
            Mis sucursales
          </Typography>
        </Grid>
        <Grid size={12} sx={{ display: "flex", justifyContent: "end" }}>
          <Button variant='contained' sx={{ bgcolor: "#173757" }}>
            Agregar
          </Button>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Branches;
