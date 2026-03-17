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

const QuotationCard = ({ quotation, onView, onEdit }) => {
  const statusCfg = STATUS_CONFIG[quotation.status] ?? STATUS_CONFIG.pending;
  const navigate = useNavigate();
  const handleView = () => navigate(`/cotizaciones/${quotation.id}`);
  return (
    <Card
      sx={{
        borderRadius: "20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
        transition: "transform 0.2s, box-shadow 0.2s",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
        },
      }}
    >
      {/* Franja superior */}
      <Box
        sx={{
          height: 6,
          background:
            "linear-gradient(90deg, rgba(38,89,139,0.8), rgba(38,89,139,0.3))",
        }}
      />

      <CardContent sx={{ pt: 2.5, pb: 1 }}>
        {/* Folio + status + tipo de viaje */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <RequestQuoteIcon
              sx={{ fontSize: 18, color: "rgba(38,89,139,0.7)" }}
            />
            <Typography
              variant='subtitle2'
              fontWeight={700}
              color='rgba(38,89,139,0.9)'
            >
              {quotation.quoteNumber}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 0.8 }}>
            <Chip
              label={TRIP_LABEL[quotation.tripType] ?? quotation.tripType}
              size='small'
              sx={{
                backgroundColor: "rgba(38,89,139,0.08)",
                color: "rgba(38,89,139,0.9)",
                fontWeight: 600,
                borderRadius: "8px",
                fontSize: "0.68rem",
              }}
            />
            <Chip
              label={statusCfg.label}
              size='small'
              sx={{
                backgroundColor: statusCfg.bg,
                color: statusCfg.color,
                fontWeight: 600,
                borderRadius: "8px",
                fontSize: "0.68rem",
              }}
            />
          </Box>
        </Box>

        {/* Contratador */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <PersonIcon sx={{ fontSize: 16, color: "text.disabled" }} />
          <Typography variant='body2' fontWeight={600} color='text.primary'>
            {quotation.contractorName}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            · {quotation.contractorPhone}
          </Typography>
        </Box>

        {/* Ruta */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <PlaceIcon sx={{ fontSize: 16, color: "text.disabled" }} />
          <Typography variant='body2' color='text.secondary'>
            <Typography
              component='span'
              variant='body2'
              fontWeight={600}
              color='text.primary'
            >
              {quotation.origin}
            </Typography>
            {" → "}
            <Typography
              component='span'
              variant='body2'
              fontWeight={600}
              color='text.primary'
            >
              {quotation.destination}
            </Typography>
          </Typography>
        </Box>

        {/* Unidad */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
          <DirectionsBusIcon sx={{ fontSize: 16, color: "text.disabled" }} />
          <Typography variant='body2' color='text.secondary'>
            {quotation.unitType?.name ?? "Sin unidad"}
          </Typography>
        </Box>

        {/* Fechas */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
          <CalendarMonthIcon sx={{ fontSize: 16, color: "text.disabled" }} />
          <Typography variant='body2' color='text.secondary'>
            Salida:{" "}
            <Typography
              component='span'
              variant='body2'
              fontWeight={600}
              color='text.primary'
            >
              {formatDate(quotation.departureAt)}
            </Typography>
            {quotation.returnAt && (
              <>
                {" · "}Regreso:{" "}
                <Typography
                  component='span'
                  variant='body2'
                  fontWeight={600}
                  color='text.primary'
                >
                  {formatDate(quotation.returnAt)}
                </Typography>
              </>
            )}
          </Typography>
        </Box>

        <Divider sx={{ mb: 1.5 }} />

        {/* Fecha de creación + precio */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant='caption' color='text.secondary'>
            Creada el {formatDate(quotation.createdAt)}
          </Typography>
          {formatPrice(quotation.totalPrice) ? (
            <Typography
              variant='subtitle2'
              fontWeight={700}
              color='rgba(38,89,139,0.9)'
            >
              {formatPrice(quotation.totalPrice)}
            </Typography>
          ) : (
            <Typography variant='caption' color='text.disabled'>
              Sin precio asignado
            </Typography>
          )}
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2, pt: 0.5 }}>
        <Tooltip title='Ver detalle'>
          <IconButton
            size='small'
            onClick={handleView}
            sx={{
              color: "rgba(38,89,139,0.8)",
              "&:hover": { backgroundColor: "rgba(38,89,139,0.08)" },
            }}
          >
            <VisibilityIcon fontSize='small' />
          </IconButton>
        </Tooltip>
        <Tooltip title='Gestionar'>
          <IconButton
            size='small'
            onClick={() => onEdit(quotation)}
            sx={{
              color: "rgba(38,89,139,0.8)",
              "&:hover": { backgroundColor: "rgba(38,89,139,0.08)" },
            }}
          >
            <EditIcon fontSize='small' />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default QuotationCard;
