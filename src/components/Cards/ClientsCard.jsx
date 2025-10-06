import { Paper, Typography } from "@mui/material";
import React from "react";

const ClientsCard = ({ client }) => {
  return (
    <Paper sx={{ padding: "10px" }}>
      <Typography>{client.name}</Typography>
    </Paper>
  );
};

export default ClientsCard;
