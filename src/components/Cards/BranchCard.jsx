import React, { useContext } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Paper,
  Tooltip,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProductsIcon from "../icons/ProductsIcon";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import BranchesContext from "../../Context/Branches/BranchesContext";
const BranchCard = ({ branch }) => {
  const { deleteBranch } = useContext(BranchesContext);
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
          background: "linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%)",
        }}
      >
        <Card
          sx={{
            borderRadius: "16px",
            boxShadow: "none",
            p: 1,
          }}
        >
          <CardHeader
            titleTypographyProps={{
              variant: "h6",
              fontWeight: "bold",
              color: "primary.main",
            }}
            title={branch.branch_name}
            sx={{
              pb: 0,
            }}
          />

          <CardContent sx={{ pt: 1, pb: 0 }}>
            <Box sx={{ display: "grid", gap: 0.5 }}>
              <Typography variant='body2' color='text.secondary'>
                <strong>Representante:</strong> {branch.legal_representative}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                <strong>RFC:</strong> {branch.rfc}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                <strong>Email:</strong> {branch.email}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                <strong>Teléfono:</strong> {branch.phone}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                <strong>Dirección:</strong> {branch.address}
              </Typography>
            </Box>
          </CardContent>

          <Divider sx={{ my: 1 }} />

          <CardActions sx={{ justifyContent: "space-between" }}>
            <Tooltip title='Ver productos' arrow>
              <Link to={`/productos-sucursal/${branch.id}`}>
                <IconButton
                  sx={{
                    color: "primary.main",
                    transition: "0.2s",
                  }}
                >
                  <ProductsIcon width={30} />
                </IconButton>
              </Link>
            </Tooltip>

            <Box>
              <Tooltip title='Editar' arrow>
                <IconButton
                  sx={{
                    color: "warning.main",
                    transition: "0.2s",
                  }}
                >
                  <EditIcon width={30} />
                </IconButton>
              </Tooltip>

              <Tooltip title='Eliminar' arrow>
                <IconButton
                  sx={{
                    color: "error.main",
                    transition: "0.2s",
                  }}
                  onClick={() => deleteBranch(branch.id)}
                >
                  <DeleteIcon width={30} />
                </IconButton>
              </Tooltip>
            </Box>
          </CardActions>
        </Card>
      </Paper>
    </motion.div>
  );
};

export default BranchCard;
