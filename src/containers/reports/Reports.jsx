import React from "react";
import Layout from "../../components/Layout/Layout";
import { Button, Grid, Typography } from "@mui/material";
import ReportsTabs from "../../components/Reports/ReportsTabs";

const Reports = () => {
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid size={12}>
          <ReportsTabs />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Reports;
