import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { PriceFormat } from "../../utils/PriceFormat";
const Totals = ({ subtotal, total }) => {
  return (
    <Paper elevation={4} sx={{ padding: "20px", borderRadius: "10px" }}>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Grid size={6}>
          <Typography variant='h6' fontWeight='bold'>
            Subtotal
          </Typography>
        </Grid>
        <Grid size={6}>
          <Typography variant='h6' fontWeight='bold'>
            $ {PriceFormat(Number(subtotal))}
          </Typography>
        </Grid>
        <Grid size={6}>
          <Typography variant='h6' fontWeight='bold'>
            Total a pagar
          </Typography>
        </Grid>
        <Grid size={6}>
          <Typography variant='h6' fontWeight='bold'>
            $ {PriceFormat(Number(total))}
          </Typography>
        </Grid>
        <Grid size={6}>
          <Typography variant='h6' fontWeight='bold'>
            Total Pagado
          </Typography>
        </Grid>
        <Grid size={6}>
          <Typography variant='h6' fontWeight='bold'>
            $ {PriceFormat(Number(0))}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Totals;
