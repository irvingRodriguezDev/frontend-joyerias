import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CategoryIcon from "@mui/icons-material/Category";

const CategoryCard = ({ category, onEdit, onDelete }) => {
  return (
    <Card
      sx={{
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
        },
      }}
    >
      <CardContent>
        {/* Ícono + nombre */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
          <Box
            sx={{
              backgroundColor: "rgba(38, 89, 139, 0.1)",
              borderRadius: "10px",
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CategoryIcon
              sx={{ color: "rgba(38, 89, 139, 0.8)", fontSize: 28 }}
            />
          </Box>
          <Typography variant='h6' fontWeight={600} sx={{ color: "#1a1a2e" }}>
            {category.name}
          </Typography>
        </Box>

        {/* Status */}
        <Chip
          label={category.isActive ? "Activa" : "Inactiva"}
          size='small'
          sx={{
            backgroundColor: category.isActive
              ? "rgba(46, 196, 134, 0.15)"
              : "rgba(220, 53, 69, 0.15)",
            color: category.isActive ? "#1a7a4a" : "#a71d2a",
            fontWeight: 500,
            borderRadius: "8px",
          }}
        />

        {/* Fecha de creación */}
        <Typography
          variant='caption'
          sx={{ display: "block", mt: 1.5, color: "text.secondary" }}
        >
          Creada el{" "}
          {new Date(category.createdAt).toLocaleDateString("es-MX", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
        <Tooltip title='Editar'>
          <IconButton
            size='small'
            onClick={() => onEdit(category)}
            sx={{
              color: "rgba(38, 89, 139, 0.8)",
              "&:hover": { backgroundColor: "rgba(38, 89, 139, 0.1)" },
            }}
          >
            <EditIcon fontSize='small' />
          </IconButton>
        </Tooltip>
        <Tooltip title='Eliminar'>
          <IconButton
            size='small'
            onClick={() => onDelete(category)}
            sx={{
              color: "rgba(220, 53, 69, 0.8)",
              "&:hover": { backgroundColor: "rgba(220, 53, 69, 0.1)" },
            }}
          >
            <DeleteIcon fontSize='small' />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

const UnitTypeCategoryList = ({ categories = [], onEdit, onDelete }) => {
  if (categories.length === 0) {
    return (
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <CategoryIcon sx={{ fontSize: 60, color: "text.disabled", mb: 2 }} />
        <Typography variant='h6' color='text.secondary'>
          No hay categorías registradas
        </Typography>
        <Typography variant='body2' color='text.disabled'>
          Crea una nueva categoría para comenzar
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {categories.map((category) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={category.id}>
          <CategoryCard
            category={category}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default UnitTypeCategoryList;
