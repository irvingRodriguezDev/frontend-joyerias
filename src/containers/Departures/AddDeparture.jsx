import React, { useState } from "react";
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

const AddDeparture = () => {
  //radio
  const [value, setValue] = useState("barcode");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const productsDepartureLocal = localStorage.getItem("productsDeparture");
  const [productsDeparture, setProductsDeparture] = useState(
    productsDepartureLocal ? JSON.parse(productsDepartureLocal) : []
  );
  const [product, saveProduct] = useState("");
  const [productId, guardarProductoID] = useState("");

  return (
    <Layout>
      <Paper sx={{ padding: "20px", borderRadius: "12px" }}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Typography fontWeight='bold' fontSize='30px'>
              Crear nueva salida de productos
            </Typography>
          </Grid>
          <Grid size={12} sx={{ display: "flex", justifyContent: "end" }}>
            {productsDeparture.length >= 1 && (
              <Button variant='contained' color='primary'>
                Terminar salida
              </Button>
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label='Autoriza'
              type='text'
              placeholder='Cecilia'
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label='Recibe'
              type='text'
              placeholder='Cecilia'
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label='Motivo de la salida'
              type='text'
              placeholder='Prestamo a cliente'
              fullWidth
            />
          </Grid>
          <Grid size={12} sx={{ display: "flex", justifyContent: "center   " }}>
            <FormControl>
              <FormLabel id='demo-controlled-radio-buttons-group'>
                Selecciona una opción
              </FormLabel>
              <RadioGroup
                aria-labelledby='demo-controlled-radio-buttons-group'
                name='controlled-radio-buttons-group'
                value={value}
                row
                onChange={handleChange}
              >
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
                guardarProductId={guardarProductoID}
              />
            </Grid>
          ) : (
            <Grid size={12}>
              <ProductsSelect
                productsList={productsDeparture}
                saveProductsList={setProductsDeparture}
                guardarProductId={guardarProductoID}
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
      </Paper>
    </Layout>
  );
};

export default AddDeparture;
