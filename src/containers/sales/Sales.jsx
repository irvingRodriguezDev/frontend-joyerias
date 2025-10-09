import React, { useContext, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SalesContext from "../../Context/Sales/SalesContext";
import TableSales from "./TableSales";

const Sales = () => {
  const { sales, getAllSales, downloadTicketSale } = useContext(SalesContext);
  useEffect(() => {
    getAllSales();
  }, []);

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography fontSize='30px' fontWeight='bold' sx={{ color: "white" }}>
            Mis ventas
          </Typography>
        </Grid>
        <Grid size={12} sx={{ display: "flex", justifyContent: "end" }}>
          <Link to={"/crear-venta"}>
            <Button variant='contained' color='secondary'>
              Agregar
            </Button>
          </Link>
        </Grid>
        <Grid size={12}>
          <Paper sx={{ padding: "20px", borderRadius: "12px" }}>
            <TableSales
              downloadTicketSale={downloadTicketSale}
              sale={sales ? sales : []}
            />
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Sales;
