import { Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
// import TraspasosTable from "./TableTransfers";
const Transfers = () => {
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography fontWeight='bold' fontSize='30px' color='white'>
            Transpasos de productos
          </Typography>
        </Grid>
        <Grid size={12} sx={{ display: "flex", justifyContent: "end" }}>
          <Link to='/crear-traspaso'>
            <Button variant='contained' color='secondary' size='large'>
              Agregar
            </Button>
          </Link>
        </Grid>
        <Grid size={12}>
          <Paper sx={{ padding: "20px" }}>{/* <TraspasosTable /> */}</Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Transfers;
