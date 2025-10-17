import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SalesContext from "../../Context/Sales/SalesContext";
import TableSales from "./TableSales";

const Sales = () => {
  const {
    sales,
    getAllSales,
    downloadTicketSale,
    total,
    lastPage,
    currentPage,
    next_page_url,
    prev_page_url,
  } = useContext(SalesContext);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
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
            total={total}
            lastPage={lastPage}
            currentPage={currentPage}
            next_page_url={next_page_url}
            prev_page_url={prev_page_url}
            handleChangePage={handleChangePage}
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Sales;
