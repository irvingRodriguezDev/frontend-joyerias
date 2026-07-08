import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import QuotationCard from "./QuotationCard";
import { useNavigate } from "react-router-dom";

const QuotationList = ({ quotations = [], onEdit }) => {
  if (quotations.length === 0) {
    return (
      <Box sx={{ textAlign: "center", mt: 8 }}>
        <RequestQuoteIcon
          sx={{ fontSize: 60, color: "rgba(255,255,255,0.9)", mb: 2 }}
        />
        <Typography variant='h6' color='rgba(255,255,255,0.9)'>
          No hay cotizaciones registradas
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {quotations.map((quotation) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={quotation.id}>
          <QuotationCard quotation={quotation} onEdit={onEdit} />
        </Grid>
      ))}
    </Grid>
  );
};

export default QuotationList;
