import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button,
  Box,
  Stack,
  Divider,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FilterIcon from "@mui/icons-material/Filter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CategoryIcon from "@mui/icons-material/Category";
import { Link } from "react-router-dom";
import TourShowModal from "./TourShowModal";
import { useState } from "react";
import TagIcon from "../icons/TagIcon";

const statusColor = {
  draft: "default",
  published: "success",
  archived: "warning",
};

export default function TourAdminCard({ tour, onView }) {
  const [selectedTour, setSelectedTour] = useState(null);
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        transition: "all .25s ease",
        border: "1px solid",
        borderColor: "divider",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, pb: 2 }}>
        {/* Header */}
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='flex-start'
          mb={1}
        >
          <Typography variant='h6' fontWeight={600}>
            {tour.title}
          </Typography>

          <Chip
            label={tour.status}
            color={statusColor[tour.status] || "default"}
            size='small'
            sx={{ textTransform: "capitalize" }}
          />
        </Stack>

        {/* Descripción */}
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{
            mb: 2,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {tour.short_description}
        </Typography>

        {/* Info */}
        <Stack spacing={1.2} mb={2}>
          <InfoRow icon={<ScheduleIcon />} text={tour.duration} />
          <InfoRow icon={<AttachMoneyIcon />} text={`$${tour.price}`} />
          <InfoRow icon={<CategoryIcon />} text={tour.category} />
        </Stack>

        {/* Tags */}
        {tour.tags?.length > 0 && (
          <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
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
        )}
      </CardContent>

      <Divider />

      {/* Acciones */}
      <CardActions
        sx={{
          px: 2,
          py: 1.5,
          justifyContent: "space-between",
        }}
      >
        <Button
          size='small'
          startIcon={<VisibilityIcon />}
          onClick={() => setSelectedTour(tour)}
        >
          Ver
        </Button>

        <Stack direction='row' spacing={0.5}>
          <IconButton
            size='small'
            component={Link}
            to={`/tour/${tour.id}/media`}
          >
            <FilterIcon fontSize='small' />
          </IconButton>

          <IconButton
            size='small'
            component={Link}
            to={`/tour/${tour.id}/edit`}
          >
            <EditIcon fontSize='small' />
          </IconButton>
        </Stack>
      </CardActions>
      <TourShowModal
        open={Boolean(selectedTour)}
        onClose={() => setSelectedTour(null)}
        tour={selectedTour}
      />
    </Card>
  );
}

const InfoRow = ({ icon, text }) => (
  <Stack direction='row' spacing={1} alignItems='center'>
    <Box sx={{ color: "text.secondary", display: "flex" }}>{icon}</Box>
    <Typography variant='body2'>{text}</Typography>
  </Stack>
);
