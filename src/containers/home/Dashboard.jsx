import React, { useContext, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import CardWelcome from "../../components/home/CardWelcome";
import AuthContext from "../../Context/Auth/AuthContext";
import SalesInfo from "./SalesInfo/SalesInfo";
import { Box, Chip, Divider, Grid, Paper, Typography } from "@mui/material";
import SectionInfoGrs from "../../components/home/SectionInfoGrs";
import SectionInfoPzas from "../../components/home/SectionInfoPzas";

const Dashboard = () => {
  const { usuario } = useContext(AuthContext);

  return (
    <>
      <Layout>
        <CardWelcome
          name={usuario ? usuario.name : ""}
          type_user={usuario ? usuario.type_user_id : ""}
        />
        <SalesInfo />
        <Grid container spacing={2} sx={{ mt: 5 }}>
          <Grid size={12}>
            <Divider sx={{ backgroundColor: "white", height: 2 }} />
            <Chip
              label='Info. Productos Gramos'
              sx={{
                color: "white",
                bgcolor: "#173757",
                fontSize: "23px",
                mt: -3.5,
              }}
            />
            <Divider />
          </Grid>
          <SectionInfoGrs />
          <Grid size={12} sx={{ mt: 3 }}>
            <Divider sx={{ backgroundColor: "white", height: 2 }} />
            <Chip
              label='Info. Productos Piezas '
              sx={{
                color: "white",
                bgcolor: "#173757",
                fontSize: "23px",
                mt: -3.5,
              }}
            />
            <Divider />
          </Grid>
          <SectionInfoPzas />
        </Grid>
      </Layout>
    </>
  );
};

export default Dashboard;
