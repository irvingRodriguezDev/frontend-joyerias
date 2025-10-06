import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import ClientsSelect from "../selectOptions/ClientsSelect";
import RadioSelect from "../../components/RadioSelect";
import SelectProducts from "../selectOptions/SelectProducts";
const AddSale = () => {
  const [client, setClient] = useState(null);
  const detectarCambiosClient = (value) => {
    setClient(value.value);
  };
  const [product, setProduct] = useState(null);
  const detectarCambiosProduct = (value) => {
    setProduct(value.value);
  };

  const [value, setValue] = useState("barcode");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography color='white' fontWeight='bold' fontSize='30px'>
            Registrar nueva venta
          </Typography>
        </Grid>
        <Grid size={12}>
          <Paper sx={{ padding: "20px", borderRadius: "10px" }}>
            <Grid container spacing={2}>
              <Grid size={4}>
                <ClientsSelect detectarCambiosClient={detectarCambiosClient} />
              </Grid>
              <Grid sie={2}>
                <Button
                  variant='contained'
                  color='primary'
                  size='large'
                  sx={{ mt: 2.5 }}
                >
                  Registrar cliente
                </Button>
              </Grid>
              <Grid size={3}>
                <RadioSelect
                  setValue={setValue}
                  handleChange={handleChange}
                  value={value}
                />
              </Grid>
              {value === "barcode" ? (
                <Grid
                  size={8}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <TextField fullWidth label='barcode' variant='outlined' />
                </Grid>
              ) : (
                <Grid
                  size={8}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <SelectProducts
                    detectarCambiosProduct={detectarCambiosProduct}
                  />
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default AddSale;
