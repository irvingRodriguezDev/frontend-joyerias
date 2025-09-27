import React, { useContext } from "react";
import Layout from "../../components/Layout/Layout";
import CardWelcome from "../../components/home/CardWelcome";
import AuthContext from "../../Context/Auth/AuthContext";
import SalesInfo from "./SalesInfo/SalesInfo";
import { Box, Chip, Divider, Grid, Paper, Typography } from "@mui/material";

const Dashboard = () => {
  const { usuario } = useContext(AuthContext);

  return (
    <>
      <Layout>
        <CardWelcome name={usuario ? usuario.name : ""} />
        <SalesInfo />
        <Grid container spacing={2} sx={{ mt: 5 }}>
          <Grid size={12}>
            <Divider sx={{ backgroundColor: "white", height: 2 }} />
            <Chip
              label='Informacion Deodas Las '
              sx={{
                color: "white",
                bgcolor: "#173757",
                fontSize: "23px",
                mt: -3.5,
              }}
            />
            <Divider />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              sx={{
                backgroundColor: "#173757",
                borderRadius: "20px",
                padding: 2,
              }}
            >
              <Typography sx={{ color: "white" }}>Total De Gramos</Typography>
              <Typography sx={{ color: "white" }}>12,601.17 gr</Typography>
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
                Total De Gramos Existentes
              </Typography>
              <Typography sx={{ color: "white" }}>11,991.61 gr</Typography>
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
                Total De Gramos Traspasados
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
                Total De Gramos Dañados
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
                Total De Gramos Devueltos
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
              <Typography sx={{ color: "white" }}>$ 18,388,815.86</Typography>
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
              <Typography sx={{ color: "white" }}>$ 17,796,865.13</Typography>
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
          <Grid size={12} sx={{ mt: 3 }}>
            <Divider sx={{ backgroundColor: "white", height: 2 }} />
            <Chip
              label='Informacion '
              sx={{
                color: "white",
                bgcolor: "#173757",
                fontSize: "23px",
                mt: -3.5,
              }}
            />
            <Divider />
          </Grid>
          <Grid size={12} sx={{ mt: 3 }}>
            <Divider sx={{ backgroundColor: "white", height: 2 }} />
            <Chip
              label='Sucursales Disponibles'
              sx={{
                color: "white",
                bgcolor: "#173757",
                fontSize: "23px",
                mt: -3.5,
              }}
            />
            <Divider />
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default Dashboard;
