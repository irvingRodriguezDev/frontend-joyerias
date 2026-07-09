import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button,
  Box,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FilterIcon from "@mui/icons-material/Filter";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CategoryIcon from "@mui/icons-material/Category";
import { Link } from "react-router-dom";
import TourShowModal from "./TourShowModal";
import { useState } from "react";
import TagIcon from "../icons/TagIcon";

// Mapeo de estatus con tus colores corporativos
const statusConfig = {
  published: {
    label: "Publicado",
    bg: "rgba(163, 187, 19, 0.12)",
    color: "#7A8C0E",
  },
  draft: { label: "Borrador", bg: "#F1F5F9", color: "#64748B" },
  archived: {
    label: "Archivado",
    bg: "rgba(239, 68, 68, 0.08)",
    color: "#DC2626",
  },
};

export default function TourAdminCard({ tour, onView }) {
  const [selectedTour, setSelectedTour] = useState(null);

  const currentStatus = statusConfig[tour.status] || {
    label: tour.status,
    bg: "#F8FAFC",
    color: "#1E293B",
  };

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "16px",
        backgroundColor: "#ffffff",
        border: "1px solid rgba(1, 82, 140, 0.08)",
        boxShadow: "0 4px 20px rgba(1, 82, 140, 0.01)",
        transition: "all 0.2s ease-in-out",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: "rgba(1, 82, 140, 0.15)",
          boxShadow: "0 10px 25px rgba(1, 82, 140, 0.05)",
        },
      }}
    >
      <CardContent
        sx={{
          flexGrow: 1,
          p: 3,
          pb: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header: Título + Badge de Estatus usando Flexbox puro */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 1.5,
            mb: 1.5,
          }}
        >
          <Typography
            variant='h6'
            sx={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 700,
              color: "#1E293B",
              lineHeight: 1.3,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {tour.title}
          </Typography>

          <Chip
            label={currentStatus.label}
            size='small'
            sx={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 700,
              fontSize: "11px",
              backgroundColor: currentStatus.bg,
              color: currentStatus.color,
              borderRadius: "8px",
              px: 0.5,
              flexShrink: 0,
            }}
          />
        </Box>

        {/* Descripción Corta */}
        <Typography
          variant='body2'
          sx={{
            fontFamily: "'Jost', sans-serif",
            color: "#64748B",
            mb: 2.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: 1.6,
            minHeight: "3.2em",
          }}
        >
          {tour.short_description || "Sin descripción corta registrada."}
        </Typography>

        {/* Bloque Informativo: Filas nativas con gap controlado */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            mb: 2.5,
            mt: "auto",
          }}
        >
          <InfoRow
            icon={<ScheduleIcon sx={{ fontSize: 18 }} />}
            text={tour.duration || "Duración no especificada"}
          />
          <InfoRow
            icon={<AttachMoneyIcon sx={{ fontSize: 18 }} />}
            text={
              tour.price
                ? `${Number(tour.price).toLocaleString("es-MX", {
                    style: "currency",
                    currency: "MXN",
                  })}`
                : "Por cotizar"
            }
            highlight
          />
          <InfoRow
            icon={<CategoryIcon sx={{ fontSize: 18 }} />}
            text={tour.category || "General"}
          />
        </Box>

        {/* Módulo de Tags Planos */}
        {tour.tags?.length > 0 && (
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
            {tour.tags.map((tag, index) => (
              <Chip
                key={index}
                size='small'
                variant='outlined'
                label={
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                  >
                    <TagIcon width={14} style={{ opacity: 0.6 }} />
                    {tag}
                  </Box>
                }
                sx={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  color: "#64748B",
                  borderColor: "rgba(1, 82, 140, 0.12)",
                  backgroundColor: "#F8FAFC",
                  borderRadius: "6px",
                  "& .MuiChip-label": { px: 1 },
                }}
              />
            ))}
          </Box>
        )}
      </CardContent>

      <Divider sx={{ borderColor: "#F1F5F9" }} />

      {/* Barra de Acciones con Controles Flex directos */}
      <CardActions
        sx={{
          px: 2.5,
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#F8FAFC",
        }}
      >
        <Button
          size='small'
          variant='text'
          startIcon={<VisibilityIcon />}
          onClick={() => setSelectedTour(tour)}
          sx={{
            fontFamily: "'Jost', sans-serif",
            textTransform: "none",
            fontWeight: 600,
            color: "#01528C",
            borderRadius: "8px",
            px: 1.5,
            "&:hover": {
              backgroundColor: "rgba(1, 82, 140, 0.06)",
            },
          }}
        >
          Visualizar
        </Button>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title='Galería / Multimedia'>
            <IconButton
              size='small'
              component={Link}
              to={`/tour/${tour.id}/media`}
              sx={{
                color: "#01528C",
                backgroundColor: "#ffffff",
                border: "1px solid rgba(1, 82, 140, 0.12)",
                borderRadius: "8px",
                p: 0.8,
                transition: "all 0.2s",
                "&:hover": {
                  backgroundColor: "#01528C",
                  color: "#ffffff",
                },
              }}
            >
              <FilterIcon fontSize='small' />
            </IconButton>
          </Tooltip>

          <Tooltip title='Editar Tour'>
            <IconButton
              size='small'
              component={Link}
              to={`/tour/${tour.id}/edit`}
              sx={{
                color: "#64748B",
                backgroundColor: "#ffffff",
                border: "1px solid #E2E8F0",
                borderRadius: "8px",
                p: 0.8,
                transition: "all 0.2s",
                "&:hover": {
                  backgroundColor: "#1E293B",
                  color: "#ffffff",
                  borderColor: "#1E293B",
                },
              }}
            >
              <EditIcon fontSize='small' />
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>

      <TourShowModal
        open={Boolean(selectedTour)}
        onClose={() => setSelectedTour(null)}
        tour={selectedTour}
      />
    </Card>
  );
}

// Subcomponente interno simplificado sin Stack (Flex nativo)
const InfoRow = ({ icon, text, highlight }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
    <Box sx={{ color: "rgba(1, 82, 140, 0.45)", display: "flex" }}>{icon}</Box>
    <Typography
      variant='body2'
      sx={{
        fontFamily: "'Jost', sans-serif",
        color: highlight ? "#01528C" : "#334155",
        fontWeight: highlight ? 700 : 500,
        fontSize: "14px",
      }}
    >
      {text}
    </Typography>
  </Box>
);
