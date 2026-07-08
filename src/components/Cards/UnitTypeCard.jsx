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
      elevation={0}
      sx={{
        borderRadius: "16px",
        backgroundColor: "#ffffff",
        border: "1px solid rgba(1, 82, 140, 0.08)",
        boxShadow: "0 4px 20px rgba(1, 82, 140, 0.02)",
        transition: "all 0.2s ease-in-out",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: "rgba(1, 82, 140, 0.15)",
          boxShadow: "0 10px 25px rgba(1, 82, 140, 0.06)",
        },
      }}
    >
      <CardContent sx={{ p: 3, pb: "12px !important" }}>
        {/* Encabezado: Ícono + Nombre e Info de Categoría */}
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 2 }}>
          <Box
            sx={{
              backgroundColor: "rgba(1, 82, 140, 0.06)",
              borderRadius: "12px",
              p: 1.2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <DirectionsBusIcon sx={{ color: "#01528C", fontSize: 24 }} />
          </Box>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography
              variant='subtitle1'
              sx={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 700,
                color: "#1E293B",
                lineHeight: 1.3,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
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
                <CategoryIcon
                  sx={{ fontSize: 13, color: "rgba(1, 82, 140, 0.4)" }}
                />
                <Typography
                  variant='caption'
                  sx={{
                    fontFamily: "'Jost', sans-serif",
                    color: "#64748B",
                    fontWeight: 500,
                  }}
                >
                  {unitType.category.name}
                </Typography>
              </Box>
            ) : (
              <Typography
                variant='caption'
                sx={{
                  fontFamily: "'Jost', sans-serif",
                  color: "#94A3B8",
                  fontStyle: "italic",
                }}
              >
                Sin categoría
              </Typography>
            )}
          </Box>
        </Box>

        {/* Descripción Estilizada */}
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
          {unitType.description ?? "Sin descripción asignada."}
        </Typography>

        <Divider sx={{ borderColor: "#F1F5F9", mb: 2 }} />

        {/* Información Técnica Inferior: Capacidad y Estado */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PeopleAltIcon
              sx={{ fontSize: 18, color: "rgba(1, 82, 140, 0.4)" }}
            />
            <Typography
              variant='body2'
              sx={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 600,
                color: "#1E293B",
              }}
            >
              {unitType.capacity ?? "—"}{" "}
              <Typography
                component='span'
                variant='body2'
                sx={{ color: "#64748B", fontWeight: 400 }}
              >
                pasajeros
              </Typography>
            </Typography>
          </Box>

          <Chip
            label={unitType.isActive ? "Activa" : "Inactiva"}
            size='small'
            sx={{
              fontFamily: "'Jost', sans-serif",
              backgroundColor: unitType.isActive
                ? "rgba(163, 187, 19, 0.12)" // Tu verde lima institucional
                : "rgba(239, 68, 68, 0.08)",
              color: unitType.isActive ? "#7A8C0E" : "#DC2626",
              fontWeight: 700,
              fontSize: "11px",
              borderRadius: "8px",
              px: 0.5,
            }}
          />
        </Box>
      </CardContent>

      {/* Botones de acción planos unificados */}
      <CardActions
        sx={{
          justifyContent: "flex-end",
          px: 2.5,
          pb: 2.5,
          pt: 0,
          gap: 0.5,
        }}
      >
        <Tooltip title='Editar Tipo de Unidad'>
          <IconButton
            size='small'
            onClick={() => onEdit(unitType)}
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

        <Tooltip title='Eliminar Tipo de Unidad'>
          <IconButton
            size='small'
            onClick={() => onDelete(unitType)}
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

export default UnitTypeCard;
