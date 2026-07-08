import React from "react";
import { Box, Button, Typography, Stack } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const QuotationDetailActions = ({
  quotation,
  customer,
  order,
  onPromote,
  onConvert,
}) => {
  // Aseguramos consistencia con el estado en minúsculas o mayúsculas
  const status = quotation?.status?.toLowerCase();
  if (status !== "accepted" && quotation?.status !== "Aceptada") return null;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography
        variant='subtitle2'
        sx={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 700,
          color: "#01528C",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        💼 Flujo de Operación
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* ── SECCIÓN: PROMOVER A CLIENTE ── */}
        {customer ? (
          <Box
            sx={{
              p: 2,
              borderRadius: "12px",
              backgroundColor: "rgba(163,187,19,0.05)",
              border: "1px solid rgba(163,187,19,0.2)",
              display: "flex",
              gap: 1.5,
              alignItems: "flex-start",
            }}
          >
            <CheckCircleIcon
              sx={{ color: "#A3BB13", fontSize: 20, mt: 0.2 }} // Tu verde lima institucional
            />
            <Stack>
              <Typography
                variant='body2'
                sx={{
                  fontFamily: "'Jost', sans-serif",
                  color: "#1E293B",
                  fontWeight: 600,
                }}
              >
                Cliente registrado correctamente
              </Typography>
              <Typography
                variant='caption'
                sx={{
                  fontFamily: "'Jost', sans-serif",
                  color: "text.secondary",
                  mt: 0.2,
                }}
              >
                {customer.name} · {customer.email}
              </Typography>
            </Stack>
          </Box>
        ) : (
          <Button
            variant='outlined'
            startIcon={<PersonAddIcon />}
            onClick={onPromote}
            fullWidth
            disableElevation
            sx={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: "12px",
              borderColor: "rgba(1,82,140,0.25)",
              color: "#01528C",
              py: 1.2,
              "&:hover": {
                borderColor: "#01528C",
                backgroundColor: "rgba(1,82,140,0.03)",
              },
            }}
          >
            Promover a Cliente
          </Button>
        )}

        {/* ── SECCIÓN: CONVERTIR A ORDEN ── */}
        {order ? (
          <Box
            sx={{
              p: 2,
              borderRadius: "12px",
              backgroundColor: "rgba(163,187,19,0.05)",
              border: "1px solid rgba(163,187,19,0.2)",
              display: "flex",
              gap: 1.5,
              alignItems: "flex-start",
            }}
          >
            <CheckCircleIcon sx={{ color: "#A3BB13", fontSize: 20, mt: 0.2 }} />
            <Stack>
              <Typography
                variant='body2'
                sx={{
                  fontFamily: "'Jost', sans-serif",
                  color: "#1E293B",
                  fontWeight: 600,
                }}
              >
                Orden de servicio generada
              </Typography>
              <Typography
                variant='caption'
                sx={{
                  fontFamily: "'Jost', sans-serif",
                  color: "text.secondary",
                  mt: 0.2,
                }}
              >
                Folio de orden: {order.orderNumber}
              </Typography>
            </Stack>
          </Box>
        ) : (
          <Button
            variant='contained'
            startIcon={<AssignmentIcon />}
            onClick={onConvert}
            fullWidth
            disableElevation
            sx={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: "12px",
              backgroundColor: "#A3BB13", // Verde lima institucional para la acción principal de éxito
              color: "#ffffff",
              py: 1.2,
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "#8E0410", // Ajuste sutil de hover o tono un poco más oscuro controlado
                transform: "translateY(-2px)",
                boxShadow: "0 8px 16px rgba(163,187,19,0.2)",
              },
            }}
          >
            Convertir a Orden de Servicio
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default QuotationDetailActions;
