import React, { useContext, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { Chip, Divider, Grid, Paper, Typography } from "@mui/material";
import SalesContext from "../../Context/Sales/SalesContext";
import { useParams } from "react-router-dom";
import { PriceFormat } from "../../utils/PriceFormat";
const SaleDetails = (props) => {
  let params = useParams();

  const { id } = params;
  const { sale, getOneSale } = useContext(SalesContext);
  useEffect(() => {
    getOneSale(id);
  }, [id]);

  const { branch, client, details } = sale;

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography color='white' fontWeight='bold' fontSize='30px'>
            Detalle de venta - Suc:{branch ? branch.branch_name : ""} - F:
            {sale.folio}
          </Typography>
        </Grid>
        <Grid size={12}>
          <Paper sx={{ padding: "20px", borderRadius: "12px" }}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <Divider sx={{}}>
                  <Chip
                    label='Datos del cliente'
                    sx={{ backgroundColor: "#06121E", color: "white" }}
                  />
                </Divider>
                <Grid
                  container
                  spacing={2}
                  sx={{ padding: 2, fontWeight: "bold" }}
                >
                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    Nombre: {client ? client.name : ""}
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    Apellido: {client ? client.lastname : ""}
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    Telefono: {client ? client.phone : ""}
                  </Grid>
                </Grid>
              </Grid>
              <Grid size={12}>
                <Divider sx={{}}>
                  <Chip
                    label='Datos de la venta'
                    sx={{ backgroundColor: "#06121E", color: "white" }}
                  />
                </Divider>
                <Grid
                  container
                  spacing={2}
                  sx={{ padding: "20", fontWeight: "bold" }}
                >
                  <Grid size={{ xs: 12, sm: 6, md: 4, xl: 3 }}>
                    Fecha venta: {sale ? sale.created_at : ""}
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 4, xl: 3 }}>
                    Total: {"$"} {sale ? PriceFormat(Number(sale.total)) : ""}
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 4, xl: 3 }}>
                    Total pagado:{" $"}
                    {sale ? PriceFormat(Number(sale.paid_out)) : ""}
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 4, xl: 3 }}>
                    Resta por pagar:{" $ "}
                    {sale
                      ? PriceFormat(Number(sale.total - sale.paid_out))
                      : ""}
                  </Grid>
                </Grid>
              </Grid>
              <Grid size={12}>
                <Divider sx={{}}>
                  <Chip
                    label='Lista de productos'
                    sx={{ backgroundColor: "#06121E", color: "white" }}
                  />
                </Divider>
                <Grid
                  container
                  spacing={2}
                  sx={{ padding: "20", fontWeight: "bold" }}
                >
                  <Grid size={{ xs: 12, sm: 6, md: 4, xl: 3 }}>
                    Fecha venta: {sale ? sale.created_at : ""}
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 4, xl: 3 }}>
                    Total: {"$"} {sale ? PriceFormat(Number(sale.total)) : ""}
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 4, xl: 3 }}>
                    Total pagado:{" $"}
                    {sale ? PriceFormat(Number(sale.paid_out)) : ""}
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 4, xl: 3 }}>
                    Resta por pagar:{" $ "}
                    {sale
                      ? PriceFormat(Number(sale.total - sale.paid_out))
                      : ""}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default SaleDetails;
