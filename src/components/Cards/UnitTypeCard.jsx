import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  IconButton,
  Box,
  Tooltip,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CategoryIcon from "@mui/icons-material/Category";

const UnitTypeCard = ({ unitType, onEdit, onDelete }) => {
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
      {/* Franja superior decorativa */}
      <Box
        sx={{
          height: 6,
          background:
            "linear-gradient(90deg, rgba(38,89,139,0.8), rgba(38,89,139,0.3))",
        }}
      />

      <CardContent sx={{ pt: 2.5, pb: 1 }}>
        {/* Ícono + nombre */}
        <Box
          sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 2 }}
        >
          <Box
            sx={{
              backgroundColor: "rgba(38, 89, 139, 0.08)",
              borderRadius: "12px",
              p: 1.2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <DirectionsBusIcon
              sx={{ color: "rgba(38, 89, 139, 0.85)", fontSize: 26 }}
            />
          </Box>
          <Box>
            <Typography
              variant='subtitle1'
              fontWeight={700}
              sx={{ color: "#1a1a2e", lineHeight: 1.3 }}
            >
              {unitType.name}
            </Typography>
            {unitType.category ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  mt: 0.5,
                }}
              >
                <CategoryIcon sx={{ fontSize: 13, color: "text.disabled" }} />
                <Typography variant='caption' color='text.secondary'>
                  {unitType.category.name}
                </Typography>
              </Box>
            ) : (
              <Typography variant='caption' color='text.disabled'>
                Sin categoría
              </Typography>
            )}
          </Box>
        </Box>

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
            lineHeight: 1.6,
            minHeight: "3.2em",
          }}
        >
          {unitType.description ?? "Sin descripción."}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* Capacidad + status */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
            <PeopleAltIcon
              sx={{ fontSize: 18, color: "rgba(38,89,139,0.7)" }}
            />
            <Typography variant='body2' fontWeight={600} color='text.primary'>
              {unitType.capacity ?? "—"}{" "}
              <Typography
                component='span'
                variant='body2'
                color='text.secondary'
                fontWeight={400}
              >
                pasajeros
              </Typography>
            </Typography>
          </Box>

          <Chip
            label={unitType.isActive ? "Activa" : "Inactiva"}
            size='small'
            sx={{
              backgroundColor: unitType.isActive
                ? "rgba(46, 196, 134, 0.15)"
                : "rgba(220, 53, 69, 0.15)",
              color: unitType.isActive ? "#1a7a4a" : "#a71d2a",
              fontWeight: 600,
              borderRadius: "8px",
              fontSize: "0.7rem",
            }}
          />
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2, pt: 0.5 }}>
        <Tooltip title='Editar'>
          <IconButton
            size='small'
            onClick={() => onEdit(unitType)}
            sx={{
              color: "rgba(38, 89, 139, 0.8)",
              "&:hover": { backgroundColor: "rgba(38, 89, 139, 0.08)" },
            }}
          >
            <EditIcon fontSize='small' />
          </IconButton>
        </Tooltip>
        <Tooltip title='Eliminar'>
          <IconButton
            size='small'
            onClick={() => onDelete(unitType)}
            sx={{
              color: "rgba(220, 53, 69, 0.8)",
              "&:hover": { backgroundColor: "rgba(220, 53, 69, 0.08)" },
            }}
          >
            <DeleteIcon fontSize='small' />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default UnitTypeCard;
