import React, { useContext, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import BranchContext from "../../Context/Branches/BranchesContext";
import BranchCard from "../../components/Cards/BranchCard";
const Branches = () => {
  const { branches, getAllBranches } = useContext(BranchContext);
  useEffect(() => {
    getAllBranches();
  }, []);
  console.log(branches);

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography
            sx={{ color: "white", fontWeight: "bold", fontSize: "30px" }}
          >
            Mis sucursales
          </Typography>
        </Grid>
        <Grid size={12} sx={{ display: "flex", justifyContent: "end" }}>
          <Link to='/crear-sucursal'>
            <Button variant='contained' sx={{ bgcolor: "#173757" }}>
              Agregar
            </Button>
          </Link>
        </Grid>
        {branches.map((b, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
            <BranchCard branch={b} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Branches;
