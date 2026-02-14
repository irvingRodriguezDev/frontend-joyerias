import React, { useContext, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ToursContext from "../../Context/Tours/ToursContext";
import TourAdminCard from "../../components/Tours/TourAdminCard";

const Tours = () => {
  const { getAllTours, tours } = useContext(ToursContext);

  useEffect(() => {
    getAllTours();
  }, []);

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography
            sx={{ color: "white", fontWeight: "bold", fontSize: "30px" }}
          >
            Tours
          </Typography>
        </Grid>
        <Grid size={12} sx={{ display: "flex", justifyContent: "end" }}>
          <Link to='/registrar-tour'>
            <Button variant='contained' color='primary' size='large'>
              Agregar
            </Button>
          </Link>
        </Grid>
        {tours.map((t, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
            <TourAdminCard tour={t} onEdit={false} onView={true} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Tours;
