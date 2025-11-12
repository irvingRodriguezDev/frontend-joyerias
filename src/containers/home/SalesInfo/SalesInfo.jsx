import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import DayIcon from "../../../components/icons/DayIcon";
import WeekIcon from "../../../components/icons/WeekIcon";
import ChartIcon from "../../../components/icons/ChartIcon";
import DashboardContext from "../../../Context/Dashboard/DashboardContext";
import { formatPriceMX } from "../../../utils/PriceFormat";
import MethodGet from "../../../config/Service";
const SalesInfo = () => {
  const [ventas_dia, setVentasDia] = useState(0);
  const [ventas_semana, setVentasSemana] = useState(0);
  const [ventas_mes, setVentasMes] = useState(0);
  useEffect(() => {
    let url = "/ventas/hoy";
    MethodGet(url)
      .then((res) => {
        setVentasDia(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    let url = "/ventas/semana";
    MethodGet(url)
      .then((res) => {
        setVentasSemana(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    let url = "/ventas/mes";
    MethodGet(url)
      .then((res) => {
        setVentasMes(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper
          elevation={4}
          sx={{
            bgcolor: "#173757",
            color: "white",
            borderRadius: "20px",
            p: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          {/* Título */}
          <Typography
            variant='subtitle2'
            sx={{ opacity: 0.8, fontSize: { xs: "0.9rem", md: "1rem" } }}
          >
            Total de ingresos del Día
          </Typography>

          {/* Valor + Icono */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            <Typography
              variant='h4'
              fontWeight='bold'
              sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}
            >
              {formatPriceMX(Number(ventas_dia.total_vendido_hoy))}
            </Typography>

            {/* Icono SVG */}
            <Box
              component='span'
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "rgba(255,255,255,0.1)",
                borderRadius: "50%",
                p: 1.5,
              }}
            >
              <DayIcon width={60} />
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper
          elevation={4}
          sx={{
            bgcolor: "#173757",
            color: "white",
            borderRadius: "20px",
            p: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          {/* Título */}
          <Typography
            variant='subtitle2'
            sx={{ opacity: 0.8, fontSize: { xs: "0.9rem", md: "1rem" } }}
          >
            Total de ingresos de la Semana
          </Typography>

          {/* Valor + Icono */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            <Typography
              variant='h4'
              fontWeight='bold'
              sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}
            >
              {formatPriceMX(Number(ventas_semana.total_vendido_semana))}
            </Typography>

            {/* Icono SVG */}
            <Box
              component='span'
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "rgba(255,255,255,0.1)",
                borderRadius: "50%",
                p: 1.5,
              }}
            >
              <WeekIcon width={60} />
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper
          elevation={4}
          sx={{
            bgcolor: "#173757",
            color: "white",
            borderRadius: "20px",
            p: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          {/* Título */}
          <Typography
            variant='subtitle2'
            sx={{ opacity: 0.8, fontSize: { xs: "0.9rem", md: "1rem" } }}
          >
            Total de ingresos del Mes
          </Typography>

          {/* Valor + Icono */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            <Typography
              variant='h4'
              fontWeight='bold'
              sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}
            >
              {formatPriceMX(Number(ventas_mes.total_vendido_mes))}
            </Typography>

            {/* Icono SVG */}
            <Box
              component='span'
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "rgba(255,255,255,0.1)",
                borderRadius: "50%",
                p: 1.5,
              }}
            >
              <ChartIcon width={60} />
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SalesInfo;
