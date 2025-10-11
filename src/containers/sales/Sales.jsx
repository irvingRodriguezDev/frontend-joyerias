import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SalesContext from "../../Context/Sales/SalesContext";
import TableSales from "./TableSales";

const Sales = () => {
  const { sales, getAllSales, downloadTicketSale } = useContext(SalesContext);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  useEffect(() => {
    getAllSales(page, rowsPerPage);
  }, [page, rowsPerPage]);
  if (loading) return <LoadingSpinner message='Cargando ventas...' />;

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
          <TableSales
            data={sales}
            downloadTicketSale={downloadTicketSale}
            onPageChange={(p) => setPage(p)}
            onRowsPerPageChange={(r) => setRowsPerPage(r)}
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Sales;
