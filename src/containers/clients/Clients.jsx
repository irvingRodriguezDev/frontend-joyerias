import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ClientsContext from "../../Context/Clients/ClientsContext";
import ClientsTable from "../../components/Tables/ClientsTable";
const Clients = () => {
  const {
    clients,
    getAllClients,
    total,
    lastPage,
    currentPage,
    next_page_url,
    prev_page_url,
  } = useContext(ClientsContext);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    getAllClients(page, rowsPerPage);
  }, [page, rowsPerPage]);

  if (loading) return <LoadingSpinner message='Cargando clientes...' />;

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography fontSize='30px' fontWeight='bold' sx={{ color: "white" }}>
            Mis Clientes
          </Typography>
        </Grid>
        <Grid size={12} sx={{ display: "flex", justifyContent: "end" }}>
          <Link to={"/crear-cliente"}>
            <Button variant='contained' color='secondary'>
              Agregar
            </Button>
          </Link>
        </Grid>
        <Grid size={12}>
          <ClientsTable
            data={clients}
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

export default Clients;
