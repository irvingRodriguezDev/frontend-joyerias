import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button,
  Box,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

const statusColor = {
  draft: "default",
  published: "success",
  archived: "warning",
};

export default function TourAdminCard({ tour, onView }) {
  return (
    <Card
      sx={{
        borderRadius: "14px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        {/* Título */}
        <Typography variant='h6' fontWeight='bold' gutterBottom>
          {tour.title}
        </Typography>

        {/* Descripción corta */}
        <Typography variant='body2' color='text.secondary' mb={2}>
          {tour.short_description}
        </Typography>

        {/* Info principal */}
        <Stack spacing={1} mb={2}>
          <Typography variant='body2'>
            <strong>Ubicación:</strong> {tour.location}
          </Typography>
          <Typography variant='body2'>
            <strong>Duración:</strong> {tour.duration}
          </Typography>
          <Typography variant='body2'>
            <strong>Precio:</strong> ${tour.price}
          </Typography>
          <Typography variant='body2'>
            <strong>Categoría:</strong> {tour.category}
          </Typography>
        </Stack>

        {/* Tags */}
        <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
          {tour.tags?.map((tag, index) => (
            <Chip key={index} label={tag} size='small' />
          ))}
        </Box>
      </CardContent>

      <CardActions
        sx={{
          justifyContent: "space-between",
          px: 2,
          pb: 2,
        }}
      >
        {/* Status */}
        <Chip
          label={tour.status}
          color={statusColor[tour.status] || "default"}
          size='small'
        />

        {/* Acciones */}
        <Box>
          <Button
            size='small'
            startIcon={<VisibilityIcon />}
            onClick={() => onView(tour)}
          >
            Ver
          </Button>
          <Link to={`/tour/${tour.id}/edit`}>
            <Button size='small' startIcon={<EditIcon />}>
              Editar
            </Button>
          </Link>
        </Box>
      </CardActions>
    </Card>
  );
}
