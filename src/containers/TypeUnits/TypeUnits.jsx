import React, { useContext, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UnitsContext from "../../Context/Units/UnitsContext";
import { Box, Button, Grid, Typography } from "@mui/material";
import UnitTypeCard from "../../components/Cards/UnitTypeCard";
const TypeUnits = () => {
  const { units, getAllUnits } = useContext(UnitsContext);

  useEffect(() => {
    getAllUnits();
  }, []);

  return (
    <Layout>
      <Grid container spacing={2} sx={{ mt: 10 }}>
        <Grid size={12}>
          <Box
            sx={{
              mb: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant='h5' fontWeight={600} color='#fff'>
              Mis Unidades
            </Typography>
            <Button variant='contained'>Nueva Unidad</Button>
          </Box>
        </Grid>
        {units.map((unit) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={unit.id}>
            <UnitTypeCard
              unitType={unit}
              onEdit={(u) => console.log("editar", u)}
              onDelete={(u) => console.log("eliminar", u)}
            />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default TypeUnits;
