import React, { useContext, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import BusinessRuleContext from "../../Context/BusinessRule/BusinessRuleContext";
import BusinessCard from "../../components/Cards/BusinessCard";
const BusinessRules = () => {
  const { business_rules, getAllBusiness } = useContext(BusinessRuleContext);
  useEffect(() => {
    getAllBusiness();
  }, []);

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography color='white' fontWeight='bold' fontSize='30px'>
            Reglas de negocio
          </Typography>
        </Grid>
        <Grid size={12} display='flex' justifyContent='end'>
          <Link to='/agregar-regla'>
            <Button variant='contained' size='large' color='secondary'>
              Agregar
            </Button>
          </Link>
        </Grid>
        {business_rules.map((b, index) => (
          <Grid size={{ sx: 12, md: 6, lg: 4, xl: 3 }} key={index}>
            <BusinessCard business={b} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default BusinessRules;
