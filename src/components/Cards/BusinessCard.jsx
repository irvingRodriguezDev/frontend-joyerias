import { Paper, Typography } from "@mui/material";
import React from "react";

const BusinessCard = ({ business }) => {
  return (
    <Paper>
      <Typography>{business.multiplicator}</Typography>
      <Typography>{business.operator}</Typography>
      <Typography>{business.percent_discount}</Typography>
    </Paper>
  );
};

export default BusinessCard;
