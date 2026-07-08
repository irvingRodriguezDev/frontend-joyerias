import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Chip,
  IconButton,
  Tooltip,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import PlaceIcon from "@mui/icons-material/Place";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import {
  STATUS_CONFIG,
  TRIP_LABEL,
  formatDate,
  formatPrice,
} from "./quotation.helpers";
import { useNavigate } from "react-router-dom";

// Mapa de colores laterales planos reactivos al estatus
const STATUS_BORDER_COLOR = {
  pendiente: "#FFAA00", // Ámbar / Alerta
  enviada: "#01528C", // Azul institucional
  aceptada: "#A3BB13", // Verde lima institucional
  rechazada: "#EF4444", // Rojo plano
};

const QuotationCard = ({ quotation, onEdit }) => {
  const navigate = useNavigate();

  // Normalizar llave del estatus para el color del borde lateral
  const statusKey = quotation.status?.toLowerCase() || "pendiente";
  const statusBorder =
    STATUS_BORDER_COLOR[statusKey] || STATUS_BORDER_COLOR.pendiente;
  const statusCfg = STATUS_CONFIG[quotation.status] ?? STATUS_CONFIG.pending;

  const handleView = () => navigate(`/cotizaciones/${quotation.id}`);

  return (
    <Card
      sx={{
        borderRadius: "16px",
        background: "#ffffff",
        border: "1px solid rgba(1,82,140,0.08)",
        // 🚀 TRUCO PREMIUM: Borde izquierdo reactivo plano en vez de gradiente superior
        borderLeft: `6px solid ${statusBorder}`,
        boxShadow: "0 4px 16px rgba(1,82,140,0.02)",
        transition: "all 0.2s ease-in-out",
        overflow: "hidden",
        position: "relative",
        "&:hover": {
          boxShadow: "0 12px 30px rgba(1,82,140,0.06)",
          borderColor: "rgba(1,82,140,0.15)",
        },
      }}
    >
      <CardContent sx={{ pt: 2.5, pb: 1, px: 2.5 }}>
        {/* ── FOLIO + STATUS + TIPO VIAJE ── */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <RequestQuoteIcon sx={{ fontSize: 18, color: "#01528C" }} />
            <Typography
              variant='subtitle1'
              sx={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 700,
                color: "#01528C",
                letterSpacing: "0.02em",
              }}
            >
              {quotation.quoteNumber}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 0.8 }}>
            <Chip
              label={TRIP_LABEL[quotation.tripType] ?? quotation.tripType}
              size='small'
              sx={{
                backgroundColor: "rgba(1,82,140,0.05)",
                color: "#01528C",
                fontWeight: 600,
                fontFamily: "'Jost', sans-serif",
                borderRadius: "6px",
                fontSize: "0.7rem",
                textTransform: "capitalize",
              }}
            />
            <Chip
              label={statusCfg.label}
              size='small'
              sx={{
                backgroundColor: statusCfg.bg,
                color: statusCfg.color,
                fontWeight: 600,
                fontFamily: "'Jost', sans-serif",
                borderRadius: "6px",
                fontSize: "0.7rem",
              }}
            />
          </Box>
        </Box>

        {/* ── CLIENTE CONTRATADOR ── */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 1.2 }}>
          <PersonIcon sx={{ fontSize: 18, color: "rgba(1,82,140,0.4)" }} />
          <Typography
            variant='body2'
            sx={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 600,
              color: "#1E293B",
            }}
          >
            {quotation.contractorName}
          </Typography>
          <Typography
            variant='caption'
            sx={{
              fontFamily: "'Jost', sans-serif",
              color: "text.secondary",
              fontWeight: 400,
            }}
          >
            · {quotation.contractorPhone}
          </Typography>
        </Box>

        {/* ── RUTA (ORIGEN → DESTINO) ── */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 1.2 }}>
          <PlaceIcon sx={{ fontSize: 18, color: "rgba(1,82,140,0.4)" }} />
          <Typography
            variant='body2'
            sx={{ fontFamily: "'Jost', sans-serif", color: "#475569" }}
          >
            <Typography
              component='span'
              variant='body2'
              sx={{ fontWeight: 500, color: "#1E293B" }}
            >
              {quotation.origin}
            </Typography>
            {" → "}
            <Typography
              component='span'
              variant='body2'
              sx={{ fontWeight: 600, color: "#01528C" }}
            >
              {quotation.destination}
            </Typography>
          </Typography>
        </Box>

        {/* ── AUTOBÚS / UNIDAD ── */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 1.2 }}>
          <DirectionsBusIcon
            sx={{ fontSize: 18, color: "rgba(1,82,140,0.4)" }}
          />
          <Typography
            variant='body2'
            sx={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 400,
              color: "#475569",
            }}
          >
            {quotation.unitType?.name ?? "Sin unidad asignada"}
          </Typography>
        </Box>

        {/* ── FECHAS DE VIAJE ── */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 2 }}>
          <CalendarMonthIcon
            sx={{ fontSize: 18, color: "rgba(1,82,140,0.4)" }}
          />
          <Typography
            variant='body2'
            sx={{
              fontFamily: "'Jost', sans-serif",
              color: "#475569",
              fontSize: "13px",
            }}
          >
            Salida:{" "}
            <Typography
              component='span'
              variant='body2'
              sx={{ fontWeight: 600, color: "#1E293B", fontSize: "13px" }}
            >
              {formatDate(quotation.departureAt)}
            </Typography>
            {quotation.returnAt && (
              <>
                {"  |  "}Regreso:{" "}
                <Typography
                  component='span'
                  variant='body2'
                  sx={{ fontWeight: 600, color: "#1E293B", fontSize: "13px" }}
                >
                  {formatDate(quotation.returnAt)}
                </Typography>
              </>
            )}
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "rgba(1,82,140,0.06)", mb: 2 }} />

        {/* ── PIE DE TARJETA: CREACIÓN + PRECIO TOTAL ── */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant='caption'
            sx={{
              fontFamily: "'Jost', sans-serif",
              color: "text.disabled",
              fontWeight: 400,
            }}
          >
            Creada el {formatDate(quotation.createdAt)}
          </Typography>

          {formatPrice(quotation.totalPrice) ? (
            <Typography
              variant='h6'
              sx={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 700,
                color: "#01528C",
              }}
            >
              {formatPrice(quotation.totalPrice)}
            </Typography>
          ) : (
            <Typography
              variant='caption'
              sx={{
                fontFamily: "'Jost', sans-serif",
                color: "#FFAA00",
                backgroundColor: "rgba(255,170,0,0.06)",
                px: 1,
                py: 0.3,
                borderRadius: "4px",
                fontWeight: 500,
              }}
            >
              Por asignar costo
            </Typography>
          )}
        </Box>
      </CardContent>

      {/* ── ACCIONES PLANAS LIMPIAS ── */}
      <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 1.5, pt: 0.5 }}>
        <Tooltip title='Ver detalle de viaje'>
          <IconButton
            size='small'
            onClick={handleView}
            sx={{
              color: "#01528C",
              backgroundColor: "rgba(1,82,140,0.03)",
              mx: 0.5,
              "&:hover": { backgroundColor: "rgba(1,82,140,0.08)" },
            }}
          >
            <VisibilityIcon fontSize='small' />
          </IconButton>
        </Tooltip>

        {/* <Tooltip title='Gestionar Estatus y Costo'>
          <IconButton
            size='small'
            onClick={() => onEdit(quotation)}
            sx={{
              color: "#A3BB13",
              backgroundColor: "rgba(163,187,19,0.04)",
              mx: 0.5,
              "&:hover": { backgroundColor: "rgba(163,187,19,0.1)" },
            }}
          >
            <EditIcon fontSize='small' />
          </IconButton>
        </Tooltip> */}
      </CardActions>
    </Card>
  );
};

export default QuotationCard;
