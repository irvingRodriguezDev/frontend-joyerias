import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import EditIcon from "../icons/EditIcon";
const BusinessCard = ({ business }) => {
  return (
    <Paper sx={{ borderRadius: "12px" }}>
      <Card sx={{ borderRadius: "12px" }}>
        <CardContent>
          <Typography fontWeight='bold' fontSize='25px'>
            {" "}
            Multiplicador: {business.multiplicator}
          </Typography>
          <Typography fontWeight='bold' fontSize='25px'>
            {" "}
            Operador: {business.operator}
          </Typography>
          <Typography fontWeight='bold' fontSize='25px'>
            {" "}
            Descuento: {business.percent_discount} %
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton>
            <EditIcon width={40} />
          </IconButton>
        </CardActions>
      </Card>
    </Paper>
  );
};

export default BusinessCard;
