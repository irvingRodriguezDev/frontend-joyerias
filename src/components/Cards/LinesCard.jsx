import { Paper, Typography } from "@mui/material";
import React from "react";

const LinesCard = ({ line }) => {
  return (
    <Paper>
      <Typography>{line.name}</Typography>
    </Paper>
  );
};

export default LinesCard;
