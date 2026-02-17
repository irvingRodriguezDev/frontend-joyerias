import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Stack,
  Chip,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CategoryIcon from "@mui/icons-material/Category";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const statusColor = {
  draft: "default",
  published: "success",
  archived: "warning",
};

export default function TourShowModal({ open, onClose, tour }) {
  if (!tour) return null;

  const coverImage =
    tour.media?.find((m) => m.is_cover)?.url || tour.media?.[0]?.url;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='md'
      fullWidth
      scroll='paper'
    >
      {/* Header */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Box>
          <Typography variant='h6' fontWeight={600}>
            {tour.title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {tour.slug}
          </Typography>
        </Box>

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {/* Imagen */}
        {coverImage && (
          <Box
            component='img'
            src={coverImage}
            alt={tour.title}
            sx={{
              width: "100%",
              height: 260,
              objectFit: "cover",
              borderRadius: 2,
              mb: 3,
            }}
          />
        )}

        {/* Status + Precio */}
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          mb={2}
        >
          <Chip
            label={tour.status}
            color={statusColor[tour.status] || "default"}
            sx={{ textTransform: "capitalize" }}
          />

          <Typography variant='h6' fontWeight={600}>
            ${tour.price}
          </Typography>
        </Stack>

        {/* Descripción corta */}
        <Typography variant='body1' mb={2}>
          {tour.short_description}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Info principal */}
        <Stack spacing={1.5} mb={3}>
          <InfoRow
            icon={<LocationOnIcon />}
            label='Ubicación'
            value={tour.location}
          />
          <InfoRow
            icon={<ScheduleIcon />}
            label='Duración'
            value={tour.duration}
          />
          <InfoRow
            icon={<CategoryIcon />}
            label='Categoría'
            value={tour.category}
          />
        </Stack>

        {/* Descripción larga */}
        <Typography variant='subtitle1' fontWeight={600} mb={1}>
          Descripción
        </Typography>
        <Typography variant='body2' color='text.secondary' mb={3}>
          {tour.description}
        </Typography>

        {/* Tags */}
        {tour.tags?.length > 0 && (
          <>
            <Typography variant='subtitle2' mb={1}>
              Tags
            </Typography>
            <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mb: 3 }}>
              {tour.tags.map((tag, index) => (
                <Chip key={index} label={tag} size='small' variant='outlined' />
              ))}
            </Box>
          </>
        )}

        {/* CTA */}
        {tour.whatsapp_link && (
          <Button
            fullWidth
            size='large'
            startIcon={<WhatsAppIcon />}
            href={tour.whatsapp_link}
            target='_blank'
            sx={{
              bgcolor: "#25D366",
              color: "#fff",
              "&:hover": {
                bgcolor: "#1ebe5d",
              },
            }}
          >
            Contactar por WhatsApp
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}

const InfoRow = ({ icon, label, value }) => (
  <Stack direction='row' spacing={1.5} alignItems='center'>
    <Box sx={{ color: "text.secondary", display: "flex" }}>{icon}</Box>
    <Typography variant='body2'>
      <strong>{label}:</strong> {value}
    </Typography>
  </Stack>
);
