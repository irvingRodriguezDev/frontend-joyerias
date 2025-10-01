import { Paper, Typography } from "@mui/material";
import React from "react";

const BranchCard = ({ branch }) => {
  return (
    <Paper>
      <Typography>{branch.branch_name}</Typography>
      <Typography></Typography>
      <Typography></Typography>
      <Typography></Typography>
      <Typography></Typography>
    </Paper>
  );
};

export default BranchCard;
