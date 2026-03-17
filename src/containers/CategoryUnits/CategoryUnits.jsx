import React, { useContext, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import CategoryUnitsContext from "../../Context/CategoryUnits/CategoryUnitsContext";
import { Box, Button, Grid, Typography } from "@mui/material";
import UnitTypeCategoryList from "../../components/Cards/CategoryCard";
const CategoryUnits = () => {
  const { categories_units, getAllCategoriesUnits } =
    useContext(CategoryUnitsContext);

  useEffect(() => {
    getAllCategoriesUnits();
  }, []);
  const handleEdit = (category) => {
    console.log("editar", category);
    // abrir modal de edición
  };

  const handleDelete = (category) => {
    console.log("eliminar", category);
    // abrir confirmación
  };
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
              Categorías de unidad
            </Typography>
            <Button variant='contained'>Nueva categoría</Button>
          </Box>
        </Grid>

        <UnitTypeCategoryList
          categories={categories_units}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Grid>
    </Layout>
  );
};

export default CategoryUnits;
