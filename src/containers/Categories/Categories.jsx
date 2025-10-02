import React, { useContext, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CategoriesContext from "../../Context/Categories/CategoriesContext";
import CategoryCard from "../../components/Cards/CategoryCard";
const Categories = () => {
  const { categories, getAllCategories } = useContext(CategoriesContext);
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography
            sx={{ color: "white", fontWeight: "bold", fontSize: "30px" }}
          >
            Mis Categorias
          </Typography>
        </Grid>
        <Grid size={12} sx={{ display: "flex", justifyContent: "end" }}>
          <Link to='/crear-categoria'>
            <Button variant='contained' sx={{ bgcolor: "#173757" }}>
              Agregar
            </Button>
          </Link>
        </Grid>
        {categories.map((c, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
            <CategoryCard category={c} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Categories;
