import { Grid, Paper, TextField, Typography } from "@mui/material";
import React from "react";

const PaymentsForm = ({
  setPaymentCash,
  setPaymentCard,
  setPaymentTransfer,
  paymentCash,
  paymentCard,
  paymentTransfer,
  cardReference,
  setCardReference,
  setTransferReference,
}) => {
  return (
    <Paper sx={{ padding: "20px", borderRadius: "10px" }}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography variant='h5' fontWeight='bold'>
            Registrar pago
          </Typography>
        </Grid>
        <Grid size={12}>
          <TextField
            variant='outlined'
            label='Pago en efectivo'
            fullWidth
            onChange={(e) => setPaymentCash(e.target.value)}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            variant='outlined'
            label='Pago con tarjeta'
            fullWidth
            onChange={(e) => setPaymentCard(e.target.value)}
          />
        </Grid>
        {paymentCard > 0 && (
          <Grid size={12}>
            <TextField
              variant='outlined'
              label='Ref. Pago Tarjeta'
              fullWidth
              onChange={(e) => setCardReference(e.target.value)}
            />
          </Grid>
        )}
        <Grid size={12}>
          <TextField
            variant='outlined'
            label='Pago con transferencia'
            fullWidth
            onChange={(e) => setPaymentTransfer(e.target.value)}
          />
        </Grid>
        {paymentTransfer > 0 && (
          <Grid size={12}>
            <TextField
              variant='outlined'
              label='Ref. Pago transferencia'
              fullWidth
              onChange={(e) => setTransferReference(e.target.value)}
            />
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default PaymentsForm;
