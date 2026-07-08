import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Layout from "../../components/Layout/Layout";
import QuotationList from "../../components/Qoutations/QoutationsList";
import QoutationContext from "../../Context/Quotation/QuotationContext";

// Estilos planos y limpios para las tarjetas de métricas (KPIs)
const kpiCardSx = (color) => ({
  p: 2.5,
  borderRadius: "16px",
  background: "#ffffff",
  border: "1px solid rgba(1,82,140,0.08)",
  boxShadow: "0 4px 20px rgba(1,82,140,0.02)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "4px",
    backgroundColor: color,
  },
});

const searchInputSx = {
  width: { xs: "100%", md: "320px" },
  "& .MuiOutlinedInput-root": {
    fontFamily: "'Jost', sans-serif",
    fontSize: "14px",
    borderRadius: "12px",
    background: "#ffffff",
    height: "45px",
    "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.4)" },
    "&.Mui-focused fieldset": { borderColor: "#ffffff", borderWidth: "1.5px" },
  },
  "& .MuiInputBase-input": { color: "#01528C" }, // Ajustado para contraste interno si hereda
};

const filterTabsSx = {
  minHeight: "45px",
  "& .MuiTabs-indicator": {
    backgroundColor: "#A3BB13", // Tu verde lima institucional
    height: "3px",
    borderRadius: "3px 3px 0 0",
  },
  "& .MuiTab-root": {
    fontFamily: "'Jost', sans-serif",
    textTransform: "none",
    fontSize: "15px",
    fontWeight: 500,
    color: "rgba(255, 255, 255, 0.6)",
    minHeight: "45px",
    padding: "6px 16px",
    "&.Mui-selected": {
      color: "#ffffff",
      fontWeight: 600,
    },
  },
};

const Quotations = () => {
  const { qoutations, getAllQoutationsPending } = useContext(QoutationContext);
  const [currentTab, setCurrentTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllQoutationsPending();
  }, []);

  const handleEdit = (quotation) => {
    console.log("gestionar", quotation);
  };

  // ── LÓGICA DE FILTRADO Y BÚSQUEDA ──
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const filteredQuotations = (qoutations ?? []).filter((q) => {
    // 1. Filtrar por pestaña seleccionada (Estatus)
    const matchesTab =
      currentTab === 0
        ? q.status === "pending"
        : currentTab === 1
        ? q.status === "sent"
        : q.status === "accepted";

    // 2. Filtrar por término de búsqueda (Nombre del cliente o ID)
    const clientName = q.contractorName?.toLowerCase() || "";
    const quotationId = q.id?.toLowerCase() || "";
    const matchesSearch =
      clientName.includes(searchTerm.toLowerCase()) ||
      quotationId.includes(searchTerm.toLowerCase());

    return matchesTab && matchesSearch;
  });

  // Conteo rápido para los KPIs
  const countByStatus = (status) =>
    qoutations?.filter((q) => q.status === status).length ?? 0;

  return (
    <Layout>
      <Box sx={{ mt: 10, px: { xs: 2, md: 4 } }}>
        {/* ── SECCIÓN DE ENCABEZADO PRINCIPAL ── */}
        <Box
          sx={{
            mb: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <Typography
            variant='h4'
            fontWeight={600}
            color='#fff'
            sx={{ fontFamily: "'Jost', sans-serif" }}
          >
            Panel de Cotizaciones
          </Typography>
          <Typography
            variant='body1'
            color='rgba(255,255,255,0.7)'
            sx={{ fontFamily: "'Jost', sans-serif" }}
          >
            {filteredQuotations.length} de {qoutations?.length ?? 0} registros
            filtrados
          </Typography>
        </Box>

        {/* ── 📊 TARJETAS DE INDICADORES (KPIS) ── */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={kpiCardSx("#FFAA00")}>
              <Box>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  fontWeight={500}
                  sx={{ fontFamily: "'Jost', sans-serif" }}
                >
                  Por Revisar
                </Typography>
                <Typography
                  variant='h4'
                  fontWeight={700}
                  color='#01528C'
                  sx={{ mt: 0.5, fontFamily: "'Jost', sans-serif" }}
                >
                  {countByStatus("pending")}
                </Typography>
              </Box>
              <HourglassEmptyIcon
                sx={{ color: "rgba(255, 170, 0, 0.15)", fontSize: 40 }}
              />
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={kpiCardSx("#01528C")}>
              <Box>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  fontWeight={500}
                  sx={{ fontFamily: "'Jost', sans-serif" }}
                >
                  Enviadas al Cliente
                </Typography>
                <Typography
                  variant='h4'
                  fontWeight={700}
                  color='#01528C'
                  sx={{ mt: 0.5, fontFamily: "'Jost', sans-serif" }}
                >
                  {countByStatus("sent")}
                </Typography>
              </Box>
              <SendIcon
                sx={{ color: "rgba(1, 82, 140, 0.15)", fontSize: 40 }}
              />
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={kpiCardSx("#A3BB13")}>
              <Box>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  fontWeight={500}
                  sx={{ fontFamily: "'Jost', sans-serif" }}
                >
                  Viajes Confirmados
                </Typography>
                <Typography
                  variant='h4'
                  fontWeight={700}
                  color='#01528C'
                  sx={{ mt: 0.5, fontFamily: "'Jost', sans-serif" }}
                >
                  {countByStatus("accepted")}
                </Typography>
              </Box>
              <CheckCircleOutlineIcon
                sx={{ color: "rgba(163, 187, 19, 0.15)", fontSize: 40 }}
              />
            </Paper>
          </Grid>
        </Grid>

        {/* ── 🔍 CONTROLES DE INTERACCIÓN (FILTROS Y BUSCADOR) ── */}
        <Box
          sx={{
            mb: 4,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "stretch", md: "center" },
            gap: 2,
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            pb: 2,
          }}
        >
          <Tabs value={currentTab} onChange={handleTabChange} sx={filterTabsSx}>
            <Tab label='📥 Pendientes' />
            <Tab label='✉️ Enviadas' />
            <Tab label='✅ Aceptadas' />
          </Tabs>

          <TextField
            placeholder='Buscar por cliente o folio...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={searchInputSx}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon
                    sx={{ color: "rgba(1,82,140,0.4)", fontSize: 20 }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* ── LISTADO DINÁMICO FILTRADO ── */}
        <QuotationList quotations={filteredQuotations} onEdit={handleEdit} />
      </Box>
    </Layout>
  );
};

export default Quotations;
