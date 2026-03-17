import React from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AssignmentIcon from "@mui/icons-material/Assignment";

const QuotationDetailActions = ({
  quotation,
  customer,
  order,
  onPromote,
  onConvert,
}) => {
  if (quotation?.status !== "accepted") return null;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: "16px",
        border: "1px solid rgba(0,0,0,0.07)",
        mt: 3,
      }}
    >
      <Typography
        variant='subtitle2'
        fontWeight={700}
        color='rgba(38,89,139,0.9)'
        sx={{ mb: 2 }}
      >
        Acciones
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Promover a cliente */}
        {customer ? (
          <Box
            sx={{
              p: 1.5,
              borderRadius: "10px",
              backgroundColor: "rgba(25,135,84,0.08)",
              border: "1px solid rgba(25,135,84,0.2)",
            }}
          >
            <Typography variant='body2' color='#0a3622' fontWeight={600}>
              ✓ Cliente ya registrado
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              {customer.name} · {customer.email}
            </Typography>
          </Box>
        ) : (
          <Button
            variant='outlined'
            startIcon={<PersonAddIcon />}
            onClick={onPromote}
            fullWidth
            sx={{
              borderRadius: "10px",
              borderColor: "rgba(38,89,139,0.4)",
              color: "rgba(38,89,139,0.9)",
              "&:hover": {
                borderColor: "rgba(38,89,139,0.8)",
                backgroundColor: "rgba(38,89,139,0.04)",
              },
            }}
          >
            Promover a cliente
          </Button>
        )}

        {/* Convertir a orden */}
        {order ? (
          <Box
            sx={{
              p: 1.5,
              borderRadius: "10px",
              backgroundColor: "rgba(25,135,84,0.08)",
              border: "1px solid rgba(25,135,84,0.2)",
            }}
          >
            <Typography variant='body2' color='#0a3622' fontWeight={600}>
              ✓ Orden generada
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              {order.orderNumber}
            </Typography>
          </Box>
        ) : (
          <Button
            variant='contained'
            startIcon={<AssignmentIcon />}
            onClick={onConvert}
            fullWidth
            sx={{
              borderRadius: "10px",
              backgroundColor: "rgba(38,89,139,0.9)",
              "&:hover": { backgroundColor: "rgba(38,89,139,1)" },
            }}
          >
            Convertir a orden
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default QuotationDetailActions;
