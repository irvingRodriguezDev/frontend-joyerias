import React, { useContext, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ClientsContext from "../../Context/Clients/ClientsContext";
import ClientsCard from "../../components/Cards/ClientsCard";
const Clients = () => {
  const { clients, getAllClients } = useContext(ClientsContext);

  useEffect(() => {
    getAllClients();
  }, []);

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
        {clients.map((c, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
            <ClientsCard client={c} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Clients;
