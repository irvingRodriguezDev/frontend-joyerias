import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import ProductContext from "../../Context/Products/ProductsContext";
import ProductsTable from "../../components/Tables/ProductsTable";
import LoadingSpinner from "../../components/Loading/Spinner";
import { usePermissions } from "../../hooks/usePermissions";
const Products = () => {
  const {
    products,
    getAllProducts,
    total,
    lastPage,
    currentPage,
    next_page_url,
    prev_page_url,
  } = useContext(ProductContext);
  const permisos = usePermissions("productos");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    getAllProducts(page, rowsPerPage);
  }, [page, rowsPerPage]);

  if (loading) return <LoadingSpinner message='Cargando Productos...' />;

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography fontSize='30px' fontWeight='bold' sx={{ color: "white" }}>
            Mis Productos
          </Typography>
        </Grid>
        {permisos.write && (
          <Grid size={12} sx={{ display: "flex", justifyContent: "end" }}>
            <Link to={"/crear-producto"}>
              <Button variant='contained' color='secondary'>
                Agregar
              </Button>
            </Link>
          </Grid>
        )}

        {/* 🧩 Aquí usamos el nuevo componente */}
        <Grid size={12} sx={{ padding: "12px", borderRadius: "12px" }}>
          {products && (
            <ProductsTable
              data={products}
              total={total}
              lastPage={lastPage}
              currentPage={currentPage}
              next_page_url={next_page_url}
              prev_page_url={prev_page_url}
              handleChangePage={handleChangePage}
            />
          )}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Products;
