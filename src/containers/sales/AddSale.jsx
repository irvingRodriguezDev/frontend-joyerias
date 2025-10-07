import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Button, Grid, Paper, Typography } from "@mui/material";
import ClientsSelect from "../selectOptions/ClientsSelect";
import RadioSelect from "../../components/RadioSelect";
import ProductsOfSale from "./ProductsOfSale";
import Totals from "./Totals";
import Barcode from "./Barcode";
import ProductsSelect from "./SelectProducts";
import ModalAddClients from "../clients/ModalAddClients";
const AddSale = () => {
  const ProductsSaleOnLocal = localStorage.getItem("productsSale");
  const [productsList, saveProductsList] = useState(
    ProductsSaleOnLocal ? JSON.parse(ProductsSaleOnLocal) : []
  );
  const [product, saveProduct] = useState("");
  const [productoID, guardarProductoID] = useState("");
  const [value, setValue] = useState("barcode");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  //modal addclient
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [client, setClient] = useState(null);
  const detectarCambiosClient = (value) => {
    setClient(value.value);
  };

  //carrito
  const [subtotal, saveSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography color='white' fontWeight='bold' fontSize='30px'>
            Registrar nueva venta
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid size={8}>
          <Paper sx={{ padding: "20px", borderRadius: "10px" }}>
            <Grid container spacing={2}>
              <Grid size={8}>
                <ClientsSelect detectarCambiosClient={detectarCambiosClient} />
              </Grid>
              <Grid sie={4}>
                <Button
                  variant='contained'
                  color='primary'
                  size='large'
                  sx={{ mt: 2.5 }}
                  onClick={handleClickOpen}
                >
                  Registrar cliente
                </Button>
              </Grid>
              <Grid size={12}>
                <RadioSelect
                  setValue={setValue}
                  handleChange={handleChange}
                  value={value}
                />
              </Grid>
              {value === "barcode" ? (
                <Grid size={12}>
                  <Barcode
                    productsList={productsList}
                    saveProductsList={saveProductsList}
                    product={product}
                    saveProduct={saveProduct}
                    guardarProductId={guardarProductoID}
                  />
                </Grid>
              ) : (
                <Grid size={12}>
                  <ProductsSelect
                    productsList={productsList}
                    saveProductsList={saveProductsList}
                    guardarProductId={guardarProductoID}
                  />
                </Grid>
              )}
              <Grid size={12}>
                <ProductsOfSale productsList={productsList} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid size={4}>
          <Totals subtotal={subtotal} total={total} />
        </Grid>
      </Grid>
      <ModalAddClients open={open} handleClose={handleClose} />
    </Layout>
  );
};

export default AddSale;
