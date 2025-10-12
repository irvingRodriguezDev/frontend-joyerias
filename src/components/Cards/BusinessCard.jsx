import React, { useContext } from "react";
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  Paper,
  Typography,
  Divider,
  Box,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import EditIcon from "../icons/EditIcon";
import BusinessRuleContext from "../../Context/BusinessRule/BusinessRuleContext";
import DeleteIcon from "../icons/DeleteIcon";
const BusinessCard = ({ business }) => {
  const { deleteBusiness } = useContext(BusinessRuleContext);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
          background: "linear-gradient(145deg, #f9f9f9, #ffffff)",
        }}
      >
        <Card
          sx={{
            borderRadius: "16px",
            boxShadow: "none",
            p: 2,
          }}
        >
          <CardContent>
            <Typography
              variant='h6'
              fontWeight='bold'
              color='primary.main'
              sx={{ mb: 1 }}
            >
              Configuración del Negocio
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: "grid", gap: 1 }}>
              <Typography variant='body1' color='text.secondary'>
                <strong>Multiplicador:</strong> {business.multiplicator}
              </Typography>
              <Typography variant='body1' color='text.secondary'>
                <strong>Operador:</strong> {business.operator}
              </Typography>
              <Typography variant='body1' color='text.secondary'>
                <strong>Descuento:</strong> {business.percent_discount} %
              </Typography>
            </Box>
          </CardContent>

          <Divider sx={{ mt: 1 }} />

          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Tooltip title='Editar configuración' arrow>
              <IconButton
                sx={{
                  color: "warning.main",
                  "&:hover": {
                    transform: "scale(1.1)",
                    transition: "0.2s",
                  },
                }}
              >
                <EditIcon width={32} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Eliminar Configuración' arrow>
              <IconButton
                onClick={() => deleteBusiness(business.id)}
                sx={{
                  color: "warning.main",
                  "&:hover": {
                    transform: "scale(1.1)",
                    transition: "0.2s",
                  },
                }}
              >
                <DeleteIcon width={32} />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
      </Paper>
    </motion.div>
  );
};

export default BusinessCard;
