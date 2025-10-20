import React, { useContext, useEffect } from "react";
import DashboardContext from "../../Context/Dashboard/DashboardContext";
import { PriceFormat } from "../../utils/PriceFormat";
import { Grid, Paper, Typography } from "@mui/material";
const SectionInfoPzas = () => {
  const {
    total_dinero_gramos,
    total_dinero_gramos_existentes,
    totalDineroGramos,
    totalDineroGramosExistente,
    total_gramos,
    total_gramos_existentes,
    totalGramos,
    totalGramosExistentes,
  } = useContext(DashboardContext);

  useEffect(() => {
    totalDineroGramos();
    totalDineroGramosExistente();
    totalGramos();
    totalGramosExistentes();
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
          <Typography sx={{ color: "white" }}>{0}</Typography>
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
          <Typography sx={{ color: "white" }}>{0}</Typography>
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
          <Typography sx={{ color: "white" }}>7.87 gr</Typography>
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
          <Typography sx={{ color: "white" }}>0 gr</Typography>
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
            Total De Piezas Devueltos
          </Typography>
          <Typography sx={{ color: "white" }}>601.69 gr</Typography>
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
            Total De Dinero Por Gramo
          </Typography>
          <Typography sx={{ color: "white" }}>
            ${PriceFormat(Number(12))}
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
            $ {PriceFormat(Number(12243))}
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
          <Typography sx={{ color: "white" }}>$ 12,734.09</Typography>
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
          <Typography sx={{ color: "white" }}>$ 0</Typography>
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
            Total en Productos Devueltos
          </Typography>
          <Typography sx={{ color: "white" }}>$ 579,216.64</Typography>
        </Paper>
      </Grid>
    </>
  );
};

export default SectionInfoPzas;
