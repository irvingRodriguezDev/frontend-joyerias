import React, { useContext, useEffect } from "react";
import DashboardContext from "../../Context/Dashboard/DashboardContext";
import { PriceFormat } from "../../utils/PriceFormat";
import { Grid, Paper, Typography } from "@mui/material";
const SectionInfoPzas = () => {
  const {
    total_piezas,
    total_dinero_piezas,
    total_piezas_existentes,
    total_dinero_piezas_existentes,
    total_piezas_traspasados,
    total_dinero_piezas_traspasadas,
    total_piezas_danadas,
    total_dinero_piezas_danadas,
    totalPiezas,
    totalDineroPiezas,
    totalPiezasExistentes,
    totalDineroPiezasExistentes,
    totalPiezasTraspasadas,
    totalDineroPiezasTraspasadas,
    totalPiezasDanados,
    totalDineroPiezasDanados,
  } = useContext(DashboardContext);

  useEffect(() => {
    totalPiezas();
    totalDineroPiezas();
    totalPiezasExistentes();
    totalDineroPiezasExistentes();
    totalPiezasTraspasadas();
    totalDineroPiezasTraspasadas();
    totalPiezasDanados();
    totalDineroPiezasDanados();
  }, []);

  return (
    <>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper
          sx={{
            backgroundColor: "#173757",
            borderRadius: "20px",
            padding: 2,
          }}
        >
          <Typography sx={{ color: "white" }}>Total De Piezas</Typography>
          <Typography sx={{ color: "white" }}>
            {total_piezas ? total_piezas.total_piezas : 0}
          </Typography>
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper
          sx={{
            backgroundColor: "#173757",
            borderRadius: "20px",
            padding: 2,
          }}
        >
          <Typography sx={{ color: "white" }}>
            Total De Piezas Existentes
          </Typography>
          <Typography sx={{ color: "white" }}>
            {total_piezas_existentes
              ? total_piezas_existentes.total_piezas_existentes
              : 0}
          </Typography>
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper
          sx={{
            backgroundColor: "#173757",
            borderRadius: "20px",
            padding: 2,
          }}
        >
          <Typography sx={{ color: "white" }}>
            Total De Piezas Traspasados
          </Typography>
          <Typography sx={{ color: "white" }}>
            {total_piezas_traspasados
              ? total_piezas_traspasados.total_piezas_traspasados
              : 0}
          </Typography>
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper
          sx={{
            backgroundColor: "#173757",
            borderRadius: "20px",
            padding: 2,
          }}
        >
          <Typography sx={{ color: "white" }}>
            Total De Piezas Dañados
          </Typography>
          <Typography sx={{ color: "white" }}>
            {total_piezas_danadas
              ? total_piezas_danadas.total_piezas_danados
              : 0}
          </Typography>
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper
          sx={{
            backgroundColor: "#173757",
            borderRadius: "20px",
            padding: 2,
          }}
        >
          <Typography sx={{ color: "white" }}>
            Total en Productos Existentes
          </Typography>
          <Typography sx={{ color: "white" }}>
            ${" "}
            {PriceFormat(
              Number(
                total_dinero_piezas_existentes
                  ? total_dinero_piezas_existentes.total_dinero_piezas_existentes
                  : 0
              )
            )}
          </Typography>
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper
          sx={{
            backgroundColor: "#173757",
            borderRadius: "20px",
            padding: 2,
          }}
        >
          <Typography sx={{ color: "white" }}>
            Total en Productos Traspasados
          </Typography>
          <Typography sx={{ color: "white" }}>
            $
            {PriceFormat(
              Number(
                total_dinero_piezas_traspasadas
                  ? total_dinero_piezas_traspasadas.total_dinero_piezas_traspasados
                  : 0
              )
            )}
          </Typography>
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper
          sx={{
            backgroundColor: "#173757",
            borderRadius: "20px",
            padding: 2,
          }}
        >
          <Typography sx={{ color: "white" }}>
            Total en Productos Dañados
          </Typography>
          <Typography sx={{ color: "white" }}>
            ${" "}
            {PriceFormat(
              Number(
                total_dinero_piezas_danadas
                  ? total_dinero_piezas_danadas.total_dinero_piezas_danados
                  : 0
              )
            )}
          </Typography>
        </Paper>
      </Grid>
      {/* <Grid size={{ xs: 12, md: 4 }}>
        <Paper
          sx={{
            backgroundColor: "#173757",
            borderRadius: "20px",
            padding: 2,
          }}
        >
          <Typography sx={{ color: "white" }}>
            Total en Productos Devueltos
          </Typography>
          <Typography sx={{ color: "white" }}>$ 579,216.64</Typography>
        </Paper>
      </Grid> */}
    </>
  );
};

export default SectionInfoPzas;
