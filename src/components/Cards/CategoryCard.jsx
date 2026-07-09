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
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const CategoryCard = ({ category, onEdit, onDelete }) => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "16px",
        backgroundColor: "#ffffff",
        border: "1px solid rgba(1, 82, 140, 0.08)",
        boxShadow: "0 4px 20px rgba(1, 82, 140, 0.02)",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: "rgba(1, 82, 140, 0.15)",
          boxShadow: "0 10px 25px rgba(1, 82, 140, 0.06)",
        },
      }}
    >
      <CardContent sx={{ p: 3, pb: "16px !important" }}>
        {/* Encabezado: Ícono + Nombre */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 1.5,
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                backgroundColor: "rgba(1, 82, 140, 0.06)",
                borderRadius: "12px",
                p: 1.2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CategoryIcon sx={{ color: "#01528C", fontSize: 24 }} />
            </Box>
            <Typography
              variant='h6'
              sx={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 600,
                color: "#1E293B",
                lineHeight: 1.3,
              }}
            >
              {category.name}
            </Typography>
          </Box>

          {/* Badge de Estatus Optimizada */}
          <Chip
            label={category.isActive ? "Activa" : "Inactiva"}
            size='small'
            sx={{
              fontFamily: "'Jost', sans-serif",
              backgroundColor: category.isActive
                ? "rgba(163, 187, 19, 0.12)" // Tu verde lima con opacidad baja
                : "rgba(239, 68, 68, 0.08)",
              color: category.isActive ? "#7A8C0E" : "#DC2626",
              fontWeight: 700,
              fontSize: "12px",
              borderRadius: "8px",
              px: 0.5,
            }}
          />
        </Box>

        {/* Fecha de creación con layout limpio */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: 3,
            pt: 2,
            borderTop: "1px solid #F1F5F9",
          }}
        >
          <CalendarMonthIcon
            sx={{ color: "rgba(1, 82, 140, 0.3)", fontSize: 16 }}
          />
          <Typography
            variant='caption'
            sx={{
              fontFamily: "'Jost', sans-serif",
              color: "#64748B",
              fontWeight: 500,
            }}
          >
            Registrada el{" "}
            {new Date(category.createdAt).toLocaleDateString("es-MX", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </Typography>
        </Box>
      </CardContent>

      {/* Botones de acción planos */}
      <CardActions
        sx={{
          justifyContent: "flex-end",
          px: 2.5,
          pb: 2,
          pt: 0,
          gap: 0.5,
        }}
      >
        <Tooltip title='Editar Categoría'>
          <IconButton
            size='small'
            onClick={() => onEdit(category)}
            sx={{
              color: "#01528C",
              backgroundColor: "rgba(1, 82, 140, 0.04)",
              borderRadius: "8px",
              p: 1,
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor: "#01528C",
                color: "#ffffff",
              },
            }}
          >
            <EditIcon fontSize='small' />
          </IconButton>
        </Tooltip>

        <Tooltip title='Eliminar Categoría'>
          <IconButton
            size='small'
            onClick={() => onDelete(category)}
            sx={{
              color: "#EF4444",
              backgroundColor: "rgba(239, 68, 68, 0.04)",
              borderRadius: "8px",
              p: 1,
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor: "#EF4444",
                color: "#ffffff",
              },
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
      <Box
        sx={{
          textAlign: "center",
          py: 8,
          px: 2,
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          border: "1px dashed rgba(1, 82, 140, 0.2)",
          width: "100%",
          gridColumn: "1 / -1", // Asegura que ocupe todo el ancho si está dentro de un Grid contenedor
        }}
      >
        <CategoryIcon
          sx={{ fontSize: 48, color: "rgba(1, 82, 140, 0.25)", mb: 2 }}
        />
        <Typography
          variant='h6'
          sx={{
            fontFamily: "'Jost', sans-serif', sans-serif",
            color: "#475569",
            fontWeight: 600,
            mb: 0.5,
          }}
        >
          No hay categorías registradas
        </Typography>
        <Typography
          variant='body2'
          sx={{ fontFamily: "'Jost', sans-serif", color: "#94A3B8" }}
        >
          Agrega una nueva categoría para clasificar tus tipos de unidades.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      {categories.map((category) => (
        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }} key={category.id}>
          <CategoryCard
            category={category}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Grid>
      ))}
    </>
  );
};

export default UnitTypeCategoryList;
