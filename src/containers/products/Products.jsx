import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import ProductContext from "../../Context/Products/ProductsContext";
import ProductsTable from "../../components/Tables/ProductsTable";

const Products = () => {
  const { products, getAllProducts } = useContext(ProductContext);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  useEffect(() => {
    getAllProducts(page, rowsPerPage);
  }, [page, rowsPerPage]);

  if (!products) return <p style={{ color: "white" }}>Cargando productos...</p>;

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography fontSize='30px' fontWeight='bold' sx={{ color: "white" }}>
            Mis Productos
          </Typography>
        </Grid>
        <Grid size={12} sx={{ display: "flex", justifyContent: "end" }}>
          <Link to={"/crear-producto"}>
            <Button variant='contained' color='secondary'>
              Agregar
            </Button>
          </Link>
        </Grid>

        {/* 🧩 Aquí usamos el nuevo componente */}
        <Grid size={12}>
          {products && (
            <ProductsTable
              data={products}
              onPageChange={(page) => getAllProducts(page)}
            />
          )}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Products;
