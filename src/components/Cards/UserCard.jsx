import { Paper, Typography } from "@mui/material";
import React from "react";

const UserCard = ({ user }) => {
  return (
    <Paper>
      <Typography>{user.name}</Typography>
      <Typography>{user.name}</Typography>
      <Typography>{user.name}</Typography>
    </Paper>
  );
};

export default UserCard;
