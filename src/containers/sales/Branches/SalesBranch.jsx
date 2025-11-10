import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import { Button, Grid, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import SalesContext from "../../../Context/Sales/SalesContext";
import TableSales from "../TableSales";
const SalesBranch = () => {
  const {
    sales,
    indexForAdmin,
    downloadTicketSale,
    total,
    lastPage,
    currentPage,
    next_page_url,
    prev_page_url,
  } = useContext(SalesContext);
  const params = useParams();
  const { id } = params;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    indexForAdmin(id, page, rowsPerPage);
  }, [id, page, rowsPerPage]);
  if (loading) return <LoadingSpinner message='Cargando ventas...' />;
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography color='white' fontWeight='bold' fontSize='40px'>
            Ventas sucursal
          </Typography>
        </Grid>
        <Grid size={12} sx={{ display: "flex", justifyContent: "end" }}>
          <Link to={`/nueva-venta-sucursal/${id}`}>
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

export default SalesBranch;
