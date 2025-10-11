import React, { useContext, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import {
  Grid,
  Paper,
  Typography,
  Divider,
  Box,
  Chip,
  Button,
} from "@mui/material";
import ProductsContext from "../../Context/Products/ProductsContext";
import { Link, useParams } from "react-router-dom";
import { PriceFormat } from "../../utils/PriceFormat";
import FormatDate from "../../utils/FormatDate";
const ShowProducts = () => {
  const params = useParams();
  const { product, getOneProduct } = useContext(ProductsContext);

  useEffect(() => {
    getOneProduct(params.id);
  }, [params.id]);

  const { branch, line, category, status } = product;

  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Typography
            variant='h4'
            fontWeight='bold'
            color='white'
            sx={{ mb: 2 }}
          >
            Detalle de Producto
          </Typography>
        </Grid>

        <Grid size={12}>
          <Paper
            elevation={4}
            sx={{
              p: 4,
              borderRadius: 3,
              backgroundColor: "#f9fafb",
            }}
          >
            {/* Encabezado con nombre y estado */}
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              flexWrap='wrap'
              mb={2}
            >
              <Typography variant='h5' fontWeight='600'>
                {product.description || "Producto sin descripción"}
              </Typography>

              {status && (
                <Chip
                  label={status.name}
                  color={
                    status.name.toLowerCase().includes("existente")
                      ? "success"
                      : "secondary"
                  }
                  sx={{ fontWeight: "bold", fontSize: "0.9rem" }}
                />
              )}
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Datos principales */}
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <InfoItem label='Clave' value={product.clave} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <InfoItem label='Categoría' value={category?.name} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <InfoItem label='Línea' value={line?.name} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <InfoItem label='Sucursal' value={branch?.branch_name} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <InfoItem label='Peso' value={product.weight ?? "N/A"} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <InfoItem
                  label='Precio Compra'
                  value={`$${PriceFormat(Number(product.price_purchase) || 0)}`}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <InfoItem
                  label='Precio Venta'
                  value={`$${PriceFormat(Number(product.price) || 0)}`}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <InfoItem
                  label='Precio Descuento'
                  value={`$${PriceFormat(
                    Number(product.price_with_discount) || 0
                  )}`}
                />
              </Grid>
            </Grid>

            {/* Observaciones */}
            {product.observations && (
              <>
                <Divider sx={{ my: 3 }} />
                <Typography variant='subtitle1' fontWeight='600' gutterBottom>
                  Observaciones
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ color: "text.secondary", whiteSpace: "pre-wrap" }}
                >
                  {product.observations}
                </Typography>
              </>
            )}

            {product.sale_details && (
              <>
                <Divider sx={{ my: 3 }} />
                <Typography variant='subtitle1' fontWeight='600' gutterBottom>
                  Venta Asociada
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <InfoItem
                      label='Folio venta'
                      value={
                        product.sale_details
                          ? product.sale_details[0].sale?.folio
                          : ""
                      }
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <InfoItem
                      label='Fecha Venta'
                      value={
                        product.sale_details
                          ? FormatDate(product.sale_details[0].sale?.created_at)
                          : ""
                      }
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <InfoItem
                      label='Total Venta'
                      value={`$${
                        product.sale_details
                          ? PriceFormat(
                              Number(product.sale_details[0].sale?.total)
                            )
                          : ""
                      }`}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <InfoItem
                      label='Total Pagado'
                      value={`$${
                        product.sale_details
                          ? PriceFormat(
                              Number(product.sale_details[0].sale?.paid_out)
                            )
                          : ""
                      }`}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <InfoItem
                      label='Cliente'
                      value={
                        product.sale_details
                          ? product.sale_details[0].sale?.client.name +
                            " " +
                            product.sale_details[0].sale?.client.lastname
                          : ""
                      }
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <InfoItem
                      label='Telefono'
                      value={
                        product.sale_details
                          ? product.sale_details[0].sale?.client.phone
                          : ""
                      }
                    />
                  </Grid>
                  <Grid size={12}>
                    <Link
                      to={`/detalle-venta/${product.sale_details[0].sale?.id}`}
                    >
                      <Button variant='contained' color='primary'>
                        Ver venta
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

// Componente auxiliar para mostrar etiquetas y valores
const InfoItem = ({ label, value }) => (
  <Box sx={{ mb: 1.5 }}>
    <Typography
      variant='subtitle2'
      sx={{ color: "text.secondary", fontWeight: 500 }}
    >
      {label}
    </Typography>
    <Typography variant='body1' sx={{ fontWeight: 600 }}>
      {value || "N/A"}
    </Typography>
  </Box>
);

export default ShowProducts;
