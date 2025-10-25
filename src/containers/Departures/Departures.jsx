import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import DeparturesContext from "../../Context/Departures/DeparturesContext";
import TableDepartures from "./TableDepartures";
const Departures = () => {
  const {
    getAlldepartures,
    departures,
    total,
    lastPage,
    currentPage,
    next_page_url,
    prev_page_url,
  } = useContext(DeparturesContext);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    getAlldepartures(page, rowsPerPage);
  }, [page, rowsPerPage]);
  if (loading) return <LoadingSpinner message='Cargando salidas...' />;
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography fontWeight='bold' fontSize={30} color='white'>
            Salidas de productos
          </Typography>
        </Grid>
        <Grid size={12} sx={{ display: "flex", justifyContent: "end" }}>
          <Link to={"/crear-salida"}>
            <Button variant='contained' color='secondary'>
              Agregar
            </Button>
          </Link>
        </Grid>
        <Grid size={12} sx={{ padding: "12px", borderRadius: "12px" }}>
          {departures && (
            <TableDepartures
              data={departures}
              total={total}
              lastPage={lastPage}
              currentPage={currentPage}
              next_page_url={next_page_url}
              prev_page_url={prev_page_url}
              handleChangePage={handleChangePage}
            />
          )}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Departures;
