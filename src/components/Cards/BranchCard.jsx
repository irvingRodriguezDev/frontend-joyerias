import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import ProductsIcon from "../icons/ProductsIcon";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import { Link } from "react-router-dom";

const BranchCard = ({ branch }) => {
  return (
    <Paper elevation={2} sx={{ borderRadius: "12px" }}>
      <Card sx={{ borderRadius: "12px" }}>
        <CardHeader title={branch.branch_name} />
        <CardContent>
          <Typography>{branch.legal_representative}</Typography>
          <Typography>{branch.rfc}</Typography>
          <Typography>{branch.email}</Typography>
          <Typography>{branch.phone}</Typography>
          <Typography>{branch.address}</Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link to={`/productos-sucursal/${branch.id}`}>
            <Tooltip title='Productos' placement='top'>
              <IconButton>
                <ProductsIcon width={40} />
              </IconButton>
            </Tooltip>
          </Link>
          <Tooltip title='Editar' placement='top'>
            <IconButton>
              <EditIcon width={40} />
            </IconButton>
          </Tooltip>
          <Tooltip title='Eliminar' placement='top'>
            <IconButton>
              <DeleteIcon width={40} />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </Paper>
  );
};

export default BranchCard;
