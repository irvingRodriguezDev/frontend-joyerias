import React, { useContext, useEffect } from "react";
import { Button, Grid, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import ToursContext from "../../Context/Tours/ToursContext";
import TourAdminCard from "../../components/Tours/TourAdminCard";
import Layout from "../../components/Layout/Layout";
import AddIcon from "@mui/icons-material/Add";
import MapIcon from "@mui/icons-material/Map";

const Tours = () => {
  const { getAllTours, tours } = useContext(ToursContext);

  useEffect(() => {
    getAllTours();
  }, []);

  return (
    <Layout>
      {/* Contenedor Principal con fondo claro para hacer resaltar las cards blancas */}
      <Box
        sx={{
          backgroundColor: "transparent",
          minHeight: "100vh",
          p: { xs: 2, md: 4 },
          borderRadius: "24px",
          mt: 2,
          border: "1px solid rgba(1, 82, 140, 0.04)",
        }}
      >
        {/* Encabezado: Título + Botón de Acción en una sola línea fluida */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 4,
            pb: 2,
            borderBottom: "1px solid #E2E8F0",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                backgroundColor: "rgba(1, 82, 140, 0.06)",
                p: 1,
                borderRadius: "10px",
                display: "flex",
              }}
            >
              <MapIcon sx={{ color: "#fff", fontSize: 24 }} />
            </Box>
            <Typography
              sx={{
                fontFamily: "'Jost', sans-serif",
                color: "#fff",
                fontWeight: 700,
                fontSize: "28px",
              }}
            >
              Catálogo de Tours
            </Typography>
          </Box>

          <Link to='/registrar-tour' style={{ textDecoration: "none" }}>
            <Button
              variant='contained'
              disableElevation
              startIcon={<AddIcon />}
              sx={{
                fontFamily: "'Jost', sans-serif",
                textTransform: "none",
                fontWeight: 600,
                backgroundColor: "#01528C",
                borderRadius: "12px",
                px: 3,
                py: 1.2,
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "#014270",
                  transform: "translateY(-1px)",
                },
              }}
            >
              Agregar Tour
            </Button>
          </Link>
        </Box>

        {/* Listado de Cards en Grid */}
        <Grid container spacing={3}>
          {tours.length === 0 ? (
            <Grid size={12}>
              <Box
                sx={{
                  textAlign: "center",
                  py: 8,
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  border: "1px dashed rgba(1, 82, 140, 0.2)",
                }}
              >
                <MapIcon
                  sx={{ fontSize: 48, color: "rgba(1, 82, 140, 0.25)", mb: 2 }}
                />
                <Typography
                  variant='h6'
                  sx={{
                    fontFamily: "'Jost', sans-serif",
                    color: "#475569",
                    fontWeight: 600,
                  }}
                >
                  No hay tours registrados
                </Typography>
                <Typography
                  variant='body2'
                  sx={{
                    fontFamily: "'Jost', sans-serif",
                    color: "#94A3B8",
                    mt: 0.5,
                  }}
                >
                  Crea tu primer tour para habilitar su venta en la plataforma.
                </Typography>
              </Box>
            </Grid>
          ) : (
            tours.map((t, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={t.id || index}>
                <TourAdminCard tour={t} onEdit={false} onView={true} />
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Layout>
  );
};

export default Tours;
