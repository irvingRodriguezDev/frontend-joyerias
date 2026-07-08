import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Grid,
  CircularProgress,
  Chip,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Layout from "../../Layout/Layout";
import QuotationDetailInfo from "./QuotationDetailInfo";
import QuotationStatusForm from "./QuotationStatusForm";
import QuotationDetailActions from "./QuotationDetailActions";
import QoutationContext from "../../../Context/Quotation/QuotationContext";

// Estilo base plano para los contenedores principales (Dashboard style)
const mainContainerSx = {
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  p: { xs: 3, md: 4 },
  border: "1px solid rgba(1,82,140,0.08)",
  boxShadow: "0 4px 20px rgba(1,82,140,0.02)",
};

const sidebarContainerSx = {
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  p: 3,
  border: "1px solid rgba(1,82,140,0.08)",
  boxShadow: "0 4px 20px rgba(1,82,140,0.02)",
  display: "flex",
  flexDirection: "column",
  gap: 3, // Separa orgánicamente el formulario de los botones de acción inferiores
};

const QuotationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    quotation,
    customer,
    order,
    getQuotationById,
    updateQuotationStatus,
    promoteToCustomer,
    convertToOrder,
  } = useContext(QoutationContext);

  useEffect(() => {
    getQuotationById(id);
  }, [id]);

  const handleStatusSubmit = (data) => {
    updateQuotationStatus(id, data);
  };

  const handlePromote = () => {
    promoteToCustomer(id);
  };

  const handleConvert = () => {
    convertToOrder(id);
  };

  return (
    <Layout>
      <Box sx={{ mt: 10, px: { xs: 2, md: 4 }, pb: 6 }}>
        {/* ── HEADER PRINCIPAL INTEGRADO ── */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            gap: 2,
            mb: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <IconButton
              onClick={() => navigate("/cotizaciones")}
              sx={{
                color: "#01528C",
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
              }}
            >
              <ArrowBackIcon fontSize='small' />
            </IconButton>

            <Stack spacing={0.5}>
              <Typography
                variant='h4'
                sx={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 600,
                  color: "#fff",
                }}
              >
                Gestión de Cotización
              </Typography>
              {quotation && (
                <Typography
                  variant='body2'
                  sx={{
                    fontFamily: "'Jost', sans-serif",
                    color: "rgba(255,255,255,0.7)",
                    fontWeight: 500,
                  }}
                >
                  Folio de Control: {quotation.quoteNumber}
                </Typography>
              )}
            </Stack>
          </Box>

          {/* Badges de Estado movidos al Header de la vista para limpiar el contenedor blanco */}
          {quotation && (
            <Stack direction='row' spacing={1}>
              <Chip
                label={
                  quotation.tripType === "round_trip"
                    ? "Viaje Redondo"
                    : "Viaje Sencillo"
                }
                sx={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  color: "#ffffff",
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 600,
                  borderRadius: "8px",
                }}
              />
              <Chip
                label={
                  quotation.status === "pending"
                    ? "Pendiente"
                    : quotation.status === "sent"
                    ? "Enviada"
                    : quotation.status === "accepted" && "Aceptada"
                }
                sx={{
                  backgroundColor:
                    quotation.status === "pending"
                      ? "#FFAA00"
                      : quotation.status === "sent"
                      ? "#ffffff"
                      : "#A3BB13",
                  color: quotation.status === "sent" ? "#01528C" : "#ffffff",
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 700,
                  borderRadius: "8px",
                }}
              />
            </Stack>
          )}
        </Box>

        {!quotation ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
            <CircularProgress sx={{ color: "#ffffff" }} />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {/* ── COLUMNA IZQUIERDA: INFORMACIÓN E ITINERARIO (8/12) ── */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Box sx={mainContainerSx}>
                {/* 📌 Aquí dentro recuerda quitar las tarjetas grises anidadas de QuotationDetailInfo */}
                <QuotationDetailInfo quotation={quotation} />
              </Box>
            </Grid>

            {/* ── COLUMNA DERECHA: PANEL OPERATIVO / STATUS (4/12) ── */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={sidebarContainerSx}>
                {/* Bloque Superior del Sidebar: Cambiar Estado e Inyectar Costo */}
                <Box>
                  <QuotationStatusForm
                    quotation={quotation}
                    onSubmit={handleStatusSubmit}
                  />
                </Box>

                {/* Bloque Inferior del Sidebar: Flujo de Negocio (Promover/Convertir en Orden) */}
                <Box sx={{ pt: 2, borderTop: "1px solid rgba(1,82,140,0.06)" }}>
                  <QuotationDetailActions
                    quotation={quotation}
                    customer={quotation.customer ?? customer}
                    order={quotation.order ?? order}
                    onPromote={handlePromote}
                    onConvert={handleConvert}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </Layout>
  );
};

export default QuotationDetail;
