import React, { useContext, useEffect, useState } from "react";
import BranchesContext from "../../Context/Branches/BranchesContext";
import Layout from "../../components/Layout/Layout";
import { Box, Button, Grid, Typography } from "@mui/material";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { Link } from "react-router-dom";
const SelectBranches = () => {
  const { getAllBranches, branches } = useContext(BranchesContext);
  useEffect(() => {
    getAllBranches();
  }, []);

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography fontWeight='bold' fontSize='40px' color='white'>
            Seleccionar tu sucursal
          </Typography>
        </Grid>
        {branches &&
          branches.map((b) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }} key={b.id}>
              <Box
                sx={{ bgcolor: "white", borderRadius: "12px", padding: "16px" }}
              >
                <Typography variant='h4'>{b.branch_name}</Typography>
                <Grid container spacing={2} sx={{ mt: 5 }}>
                  <Grid size={6}>
                    <Link to={`/ventas-sucursal/${b.id}`}>
                      <Button variant='contained'>
                        {" "}
                        <PointOfSaleIcon /> Mis ventas
                      </Button>
                    </Link>
                  </Grid>
                  <Grid size={6}>
                    <Link to={`/nueva-venta-sucursal/${b.id}`}>
                      <Button variant='contained'>
                        {" "}
                        <LibraryAddIcon /> Nueva venta
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          ))}
        <Grid></Grid>
      </Grid>
    </Layout>
  );
};

export default SelectBranches;
