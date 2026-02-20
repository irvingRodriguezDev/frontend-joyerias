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
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CategoryIcon from "@mui/icons-material/Category";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TagIcon from "../icons/TagIcon";
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
      PaperProps={{
        sx: {
          borderRadius: 4,
        },
      }}
    >
      {/* HERO IMAGE */}
      {coverImage && (
        <Box sx={{ position: "relative" }}>
          <Box
            component='img'
            src={coverImage}
            alt={tour.title}
            sx={{
              width: "100%",
              height: 300,
              objectFit: "cover",
            }}
          />

          {/* Overlay */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,.65), rgba(0,0,0,.15))",
            }}
          />

          {/* Close */}
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "#fff",
              bgcolor: "rgba(0,0,0,.35)",
              "&:hover": { bgcolor: "rgba(0,0,0,.55)" },
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Title */}
          <Box
            sx={{
              position: "absolute",
              bottom: 24,
              left: 24,
              right: 24,
              color: "#fff",
            }}
          >
            <Typography variant='h5' fontWeight={700}>
              {tour.title}
            </Typography>
            <Typography variant='body2' sx={{ opacity: 0.85 }}>
              {tour.slug}
            </Typography>
          </Box>
        </Box>
      )}

      <DialogContent sx={{ p: 4 }}>
        {/* Status + Price */}
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          mb={3}
        >
          <Chip
            label={tour.status}
            color={statusColor[tour.status] || "default"}
            sx={{
              textTransform: "capitalize",
              fontWeight: 600,
            }}
          />

          <Typography variant='h5' fontWeight={700}>
            ${tour.price}
          </Typography>
        </Stack>

        {/* Short Description */}
        {tour.short_description && (
          <Paper
            variant='outlined'
            sx={{
              p: 2.5,
              borderRadius: 3,
              mb: 3,
              bgcolor: "background.default",
            }}
          >
            <Typography variant='body1'>{tour.short_description}</Typography>
          </Paper>
        )}

        {/* Info Grid */}
        <Stack spacing={2.5} mb={4}>
          <InfoRow
            icon={<LocationOnIcon />}
            label='Ubicación'
            value={tour.location}
            isHtml
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

        <Divider sx={{ mb: 3 }} />

        {/* Long Description */}
        {tour.description && (
          <>
            <Typography variant='subtitle1' fontWeight={700} mb={1}>
              Descripción
            </Typography>
            <Box
              sx={{
                color: "text.secondary",
                lineHeight: 1.7,
                mb: 4,
              }}
              dangerouslySetInnerHTML={{ __html: tour.description }}
            />
          </>
        )}

        {/* Tags */}
        {tour.tags?.length > 0 && (
          <>
            <Typography variant='subtitle2' mb={1}>
              Tags
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
                mb: 4,
              }}
            >
              {tour.tags.map((tag, index) => (
                <Chip
                  key={index}
                  size='small'
                  variant='outlined'
                  label={
                    <span
                      style={{ display: "flex", alignItems: "center", gap: 6 }}
                    >
                      <TagIcon width={19} />
                      {tag}
                    </span>
                  }
                />
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
              py: 1.6,
              borderRadius: 3,
              fontWeight: 600,
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

/* ========================= */
/* Subcomponent */
/* ========================= */

const InfoRow = ({ icon, label, value, isHtml = false }) => (
  <Stack direction='row' spacing={2} alignItems='flex-start'>
    <Box
      sx={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        bgcolor: "action.hover",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "text.secondary",
        mt: "2px",
      }}
    >
      {icon}
    </Box>

    <Box>
      <Typography variant='body2' fontWeight={600} mb={0.3}>
        {label}
      </Typography>

      {isHtml ? (
        <Box
          sx={{ color: "text.secondary", lineHeight: 1.6 }}
          dangerouslySetInnerHTML={{ __html: value }}
        />
      ) : (
        <Typography variant='body2' color='text.secondary'>
          {value}
        </Typography>
      )}
    </Box>
  </Stack>
);
