import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import { PriceFormat } from "../../utils/PriceFormat";
const LinesCard = ({ line }) => {
  return (
    <Paper>
      <Card>
        <CardContent>
          <Typography>Linea: {line.name}</Typography>
          <Typography>
            Precio Compra:{PriceFormat(Number(line.price_purchase))}
          </Typography>
          <Typography>
            Precio Venta: ${PriceFormat(Number(line.price))}
          </Typography>
          <Typography>Descuento: {line.percent_discount} %</Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton>
            <EditIcon width={40} />
          </IconButton>
          <IconButton>
            <DeleteIcon width={40} />
          </IconButton>
        </CardActions>
      </Card>
    </Paper>
  );
};

export default LinesCard;
