import React, { useContext, useState } from "react";
import Layout from "../../components/Layout/Layout";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import Barcode from "./Barcode";
import ProductsOfDeparture from "./ProductsOfDeparture";
import ProductsSelect from "./SelectProducts";
import DeparturesContext from "../../Context/Departures/DeparturesContext";

const AddDeparture = () => {
  const { storeDeparture } = useContext(DeparturesContext);

  const [value, setValue] = useState("barcode");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const productsDepartureLocal = localStorage.getItem("productsDeparture");
  const [productsDeparture, setProductsDeparture] = useState(
    productsDepartureLocal ? JSON.parse(productsDepartureLocal) : []
  );

  const [product, saveProduct] = useState("");

  const handleSubmit = () => {
    const form = document.querySelector("#formDeparture");
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name") || "salida",
      auth: formData.get("auth"),
      recibe: formData.get("recibe"),
      description: formData.get("description"),
      branch_id: 2,
      details: productsDeparture.map((item) => ({
        product_id: item.product_id,
      })),
    };
    storeDeparture(payload);
  };

  return (
    <Layout>
      <Paper sx={{ padding: "20px", borderRadius: "12px" }}>
        <form id='formDeparture'>
          <Grid container spacing={2}>
            <Grid size={12}>
              <Typography fontWeight='bold' fontSize='30px'>
                Crear nueva salida de productos
              </Typography>
            </Grid>

            <Grid size={12} sx={{ display: "flex", justifyContent: "end" }}>
              {productsDeparture.length >= 1 && (
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleSubmit}
                >
                  Terminar salida
                </Button>
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 4 }} sx={{ display: "none" }}>
              <TextField
                label='Nombre'
                type='text'
                placeholder='salida'
                fullWidth
                name='name'
                defaultValue='salida'
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label='Autoriza'
                type='text'
                placeholder='Cecilia'
                fullWidth
                name='auth'
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label='Recibe'
                type='text'
                placeholder='Cecilia'
                fullWidth
                name='recibe'
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label='Motivo de la salida'
                type='text'
                placeholder='Prestamo a cliente'
                fullWidth
                name='description'
              />
            </Grid>

            <Grid size={12} sx={{ display: "flex", justifyContent: "center" }}>
              <FormControl>
                <FormLabel>Selecciona una opción</FormLabel>
                <RadioGroup value={value} row onChange={handleChange}>
                  <FormControlLabel
                    value='barcode'
                    control={<Radio />}
                    label='Codigo de Barras'
                  />
                  <FormControlLabel
                    value='select'
                    control={<Radio />}
                    label='Seleccionar producto'
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            {value === "barcode" ? (
              <Grid size={12}>
                <Barcode
                  productsList={productsDeparture}
                  saveProductsList={setProductsDeparture}
                  product={product}
                  saveProduct={saveProduct}
                />
              </Grid>
            ) : (
              <Grid size={12}>
                <ProductsSelect
                  productsList={productsDeparture}
                  saveProductsList={setProductsDeparture}
                />
              </Grid>
            )}

            <Grid size={12}>
              <ProductsOfDeparture
                productsList={productsDeparture}
                saveProductsList={setProductsDeparture}
              />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Layout>
  );
};

export default AddDeparture;
