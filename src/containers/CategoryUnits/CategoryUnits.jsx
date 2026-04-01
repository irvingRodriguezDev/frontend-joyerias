import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import CategoryUnitsContext from "../../Context/CategoryUnits/CategoryUnitsContext";
import { Box, Button, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UnitTypeCategoryList from "../../components/Cards/CategoryCard";
import CategoryUnitFormModal from "../../components/CategoryUnits/CategoryUnitFormModal";

const CategoryUnits = () => {
  const { categories_units, getAllCategoriesUnits, deleteCategoryUnits } =
    useContext(CategoryUnitsContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  useEffect(() => {
    getAllCategoriesUnits();
  }, []);

  const handleCreate = () => {
    setCategoryToEdit(null);
    setModalOpen(true);
  };

  const handleEdit = (category) => {
    setCategoryToEdit(category);
    setModalOpen(true);
  };

  const handleClose = () => {
    setCategoryToEdit(null);
    setModalOpen(false);
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
            <Button
              variant='contained'
              startIcon={<AddIcon />}
              onClick={handleCreate}
              sx={{ borderRadius: "10px" }}
            >
              Nueva categoría
            </Button>
          </Box>
        </Grid>

        <UnitTypeCategoryList
          categories={categories_units}
          onEdit={handleEdit}
          onDelete={(category) => deleteCategoryUnits(category.id)}
        />
      </Grid>

      <CategoryUnitFormModal
        open={modalOpen}
        onClose={handleClose}
        categoryToEdit={categoryToEdit}
      />
    </Layout>
  );
};

export default CategoryUnits;
