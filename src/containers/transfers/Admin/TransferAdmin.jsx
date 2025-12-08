import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import TransferContext from "../../../Context/Transfer/TransferContext";
import TransferTabs from "../TransferTabs";
import TableTransfersIncome from "../TableTransfersIncome";
import TableTransferOutgoing from "../TableTransfersOutgoing";

const TransferAdmin = () => {
  const { id } = useParams();

  const {
    getIncomeTransferAdmin,
    getOutgoingTransferAdmin,
    transferIncome,
    transferOutgoing,
    incomePagination,
    outgoingPagination,
  } = useContext(TransferContext);

  // Estado local para cada tabla
  const [incomePage, setIncomePage] = useState(1);
  const [outgoingPage, setOutgoingPage] = useState(1);

  const [rowsPerPage] = useState(10); // si no va a cambiar, ni lo expongas

  // Cargar incoming
  useEffect(() => {
    getIncomeTransferAdmin(id, incomePage, rowsPerPage);
  }, [id, incomePage, rowsPerPage]);

  // Cargar outgoing
  useEffect(() => {
    getOutgoingTransferAdmin(id, outgoingPage, rowsPerPage);
  }, [id, outgoingPage, rowsPerPage]);

  return (
    <Layout>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Grid size={12}>
          <Typography fontWeight='bold' fontSize='35px' color='white'>
            Traspasos sucursal
          </Typography>
        </Grid>

        <Grid size={12} sx={{ display: "flex", justifyContent: "end" }}>
          <Link to={`/traspasos/crear/sucursal/${id}`}>
            <Button variant='contained' color='secondary'>
              Agregar
            </Button>
          </Link>
        </Grid>

        <Grid size={12}>
          <Paper sx={{ padding: "20px" }}>
            <TransferTabs
              incomingContent={
                <TableTransfersIncome
                  transfersIncome={transferIncome}
                  pagination={incomePagination}
                  onPageChange={(newPage) => setIncomePage(newPage)}
                />
              }
              outgoingContent={
                <TableTransferOutgoing
                  transfersOutgoing={transferOutgoing}
                  pagination={outgoingPagination}
                  onPageChange={(newPage) => setOutgoingPage(newPage)}
                />
              }
            />
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default TransferAdmin;
