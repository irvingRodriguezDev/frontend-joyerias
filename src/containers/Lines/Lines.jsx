import React, { useContext, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LinesContext from "../../Context/Lines/LinesContext";
import LinesCard from "../../components/Cards/LinesCard";
const Lines = () => {
  const { lines, getAllLines } = useContext(LinesContext);
  useEffect(() => {
    getAllLines();
  }, []);
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography
            sx={{ color: "white", fontWeight: "bold", fontSize: "30px" }}
          >
            Lineas
          </Typography>
        </Grid>
        <Grid size={12} sx={{ display: "flex", justifyContent: "end" }}>
          <Link to='/crear-linea'>
            <Button variant='contained' color='secondary' size='large'>
              Agregar
            </Button>
          </Link>
        </Grid>
        {lines.map((l, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
            <LinesCard line={l} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Lines;
