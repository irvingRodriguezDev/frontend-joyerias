import React, { useState } from "react";
import Layout from "../../../components/Layout/Layout";
import { Button, Grid, Paper, Typography } from "@mui/material";
import ClientsSelectAdmin from "../../selectOptions/Admin/ClientsSelectAdmin";
import { useParams } from "react-router-dom";
import ModalAddClients from "../../clients/ModalAddClients";

const AddSaleBranch = () => {
  const params = useParams;
  const { id } = params;
  const [client, setClient] = useState(null);
  const detectarCambiosClientAdmin = (value) => {
    setClient(value.value);
  };
  //modal addclient
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography fontWeight='bold' fontSize='40px' color='white'>
            Registrar nueva venta
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid size={8}>
          <Paper sx={{ padding: "20px", borderRadius: "10px" }}>
            <Grid container spacing={2}>
              <Grid size={8}>
                <ClientsSelectAdmin
                  detectarCambiosClientAdmin={detectarCambiosClientAdmin}
                  branch_id={id}
                />
              </Grid>
              <Grid size={4}>
                <Button
                  variant='contained'
                  color='primary'
                  size='large'
                  sx={{ mt: 2.5 }}
                  onClick={handleClickOpen}
                >
                  Registrar cliente
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <ModalAddClients open={open} handleClose={handleClose} />
    </Layout>
  );
};

export default AddSaleBranch;
