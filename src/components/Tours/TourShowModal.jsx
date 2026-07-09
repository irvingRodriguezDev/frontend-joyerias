import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Chip,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CategoryIcon from "@mui/icons-material/Category";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TagIcon from "../icons/TagIcon";

// Mapeo de estatus plano y consistente
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

export default function TourShowModal({ open, onClose, tour }) {
  if (!tour) return null;

  const coverImage =
    tour.media?.find((m) => m.is_cover)?.url || tour.media?.[0]?.url;

  const currentStatus = statusConfig[tour.status] || {
    label: tour.status,
    bg: "#F8FAFC",
    color: "#1E293B",
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='md'
      fullWidth
      scroll='paper'
      elevation={0}
      PaperProps={{
        sx: {
          borderRadius: "24px",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          border: "1px solid rgba(1, 82, 140, 0.08)",
          boxShadow: "0 20px 50px rgba(1, 82, 140, 0.12)",
        },
      }}
    >
      {/* HERO IMAGE CON OVERLAY PLANO */}
      {coverImage ? (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 280,
            overflow: "hidden",
          }}
        >
          <Box
            component='img'
            src={coverImage}
            alt={tour.title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* Gradiente sutil y elegante */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(30, 41, 59, 0.85), rgba(30, 41, 59, 0.2))",
            }}
          />

          {/* Botón de cierre integrado */}
          <IconButton
            onClick={onClose}
            size='small'
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "#ffffff",
              bgcolor: "rgba(30, 41, 59, 0.4)",
              borderRadius: "10px",
              backdropFilter: "blur(4px)",
              p: 1,
              transition: "all 0.2s",
              "&:hover": { bgcolor: "rgba(30, 41, 59, 0.7)" },
            }}
          >
            <CloseIcon fontSize='small' />
          </IconButton>

          {/* Títulos sobre el Hero */}
          <Box
            sx={{
              position: "absolute",
              bottom: 24,
              left: 24,
              right: 24,
              color: "#ffffff",
            }}
          >
            <Typography
              variant='h5'
              sx={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 700,
                fontSize: "26px",
                lineHeight: 1.2,
              }}
            >
              {tour.title}
            </Typography>
            {tour.slug && (
              <Typography
                variant='body2'
                sx={{
                  fontFamily: "'Jost', sans-serif",
                  opacity: 0.75,
                  mt: 0.5,
                  fontWeight: 500,
                  letterSpacing: "0.5px",
                }}
              >
                /{tour.slug}
              </Typography>
            )}
          </Box>
        </Box>
      ) : (
        /* Header alternativo plano en caso de que no haya imagen */
        <Box
          sx={{
            p: 3,
            pb: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Typography
            variant='h5'
            sx={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 700,
              color: "#1E293B",
            }}
          >
            {tour.title}
          </Typography>
          <IconButton onClick={onClose} size='small' sx={{ color: "#64748B" }}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      <DialogContent sx={{ p: { xs: 3, md: 4 }, pt: 3 }}>
        {/* Fila superior: Estado + Precio Financiado */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Chip
            label={currentStatus.label}
            sx={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 700,
              fontSize: "12px",
              backgroundColor: currentStatus.bg,
              color: currentStatus.color,
              borderRadius: "8px",
              px: 0.5,
            }}
          />

          <Typography
            variant='h5'
            sx={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 800,
              color: "#01528C",
            }}
          >
            {tour.price
              ? `${Number(tour.price).toLocaleString("es-MX", {
                  style: "currency",
                  currency: "MXN",
                })}`
              : "Por cotizar"}
          </Typography>
        </Box>

        {/* Descripción Corta Estilizada sin Paper pesado */}
        {tour.short_description && (
          <Box
            sx={{
              p: 2.5,
              borderRadius: "14px",
              mb: 3.5,
              bgcolor: "#F8FAFC",
              border: "1px solid rgba(1, 82, 140, 0.05)",
            }}
          >
            <Typography
              variant='body1'
              sx={{
                fontFamily: "'Jost', sans-serif",
                color: "#475569",
                lineHeight: 1.6,
                fontSize: "15px",
              }}
            >
              {tour.short_description}
            </Typography>
          </Box>
        )}

        {/* Info Grid con Flexbox Nativo */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, mb: 4 }}>
          <InfoRow
            icon={<LocationOnIcon sx={{ fontSize: 18 }} />}
            label='Ubicación / Destino'
            value={tour.location}
            isHtml
          />
          <InfoRow
            icon={<ScheduleIcon sx={{ fontSize: 18 }} />}
            label='Duración estimada'
            value={tour.duration}
          />
          <InfoRow
            icon={<CategoryIcon sx={{ fontSize: 18 }} />}
            label='Categoría de viaje'
            value={tour.category}
          />
        </Box>

        {/* Descripción Larga (Detallada u Operativa) */}
        {tour.description && (
          <Box sx={{ mt: 2, mb: 4 }}>
            <Typography
              variant='subtitle1'
              sx={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 700,
                color: "#1E293B",
                mb: 1.5,
              }}
            >
              Itinerario & Descripción detallada
            </Typography>
            <Box
              sx={{
                fontFamily: "'Jost', sans-serif",
                color: "#475569",
                lineHeight: 1.7,
                fontSize: "14px",
                "& p": { mb: 1.5 },
                "& ul, & ol": { pl: 3, mb: 1.5 },
              }}
              dangerouslySetInnerHTML={{ __html: tour.description }}
            />
          </Box>
        )}

        {/* Sección de Tags Planos */}
        {tour.tags?.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography
              variant='subtitle2'
              sx={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 700,
                color: "#64748B",
                mb: 1.5,
              }}
            >
              Etiquetas informativas
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {tour.tags.map((tag, index) => (
                <Chip
                  key={index}
                  size='small'
                  variant='outlined'
                  label={
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                    >
                      <TagIcon width={13} style={{ opacity: 0.6 }} />
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
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ========================= */
/* Subcomponente Refacturado */
/* ========================= */

const InfoRow = ({ icon, label, value, isHtml = false }) => {
  if (!value) return null;

  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: "10px",
          bgcolor: "rgba(1, 82, 140, 0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#01528C",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography
          variant='body2'
          sx={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 700,
            color: "#1E293B",
            mb: 0.3,
          }}
        >
          {label}
        </Typography>

        {isHtml ? (
          <Box
            sx={{
              fontFamily: "'Jost', sans-serif",
              color: "#64748B",
              lineHeight: 1.6,
              fontSize: "14px",
            }}
            dangerouslySetInnerHTML={{ __html: value }}
          />
        ) : (
          <Typography
            variant='body2'
            sx={{
              fontFamily: "'Jost', sans-serif",
              color: "#64748B",
              fontSize: "14px",
            }}
          >
            {value}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
