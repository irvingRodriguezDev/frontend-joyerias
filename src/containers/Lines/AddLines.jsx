import React, { useContext } from "react";
import Layout from "../../components/Layout/Layout";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import LinesContext from "../../Context/Lines/LinesContext";
const AddLines = () => {
  const { storeLine } = useContext(LinesContext);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    storeLine(data);
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid size={12}>
            <Typography color='white' fontWeight='bold' fontSize='30px'>
              Registrar nueva linea
            </Typography>
          </Grid>
          <Grid size={8}>
            <Paper sx={{ padding: "20px" }}>
              <Grid container spacing={2}>
                <Grid item size={12}>
                  <Controller
                    name='name'
                    control={control}
                    rules={{
                      required: "El nombre de la linea es obligatorio",
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Nombre de la linea'
                        variant='outlined'
                        placeholder='10k nacional'
                        type='Text'
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
                  <Controller
                    name='price_purchase'
                    control={control}
                    rules={{
                      required: "El precio compra de la linea es obligatorio",
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='precio compra'
                        variant='outlined'
                        placeholder='1600'
                        type='Text'
                        fullWidth
                        error={!!errors.price_purchase}
                        helperText={errors.price_purchase?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
                  <Controller
                    name='price'
                    control={control}
                    rules={{
                      required: "El precio de la linea es obligatorio",
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Precio venta de la linea'
                        variant='outlined'
                        placeholder='2360'
                        type='Text'
                        fullWidth
                        error={!!errors.price}
                        helperText={errors.price?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
                  <Controller
                    name='percent_discount'
                    control={control}
                    rules={{
                      required: "El porcentaje de descuento obligatorio",
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Porcentaje de descuento'
                        variant='outlined'
                        placeholder='20'
                        type='Text'
                        fullWidth
                        error={!!errors.percent_discount}
                        helperText={errors.percent_discount?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  size={12}
                  sx={{ display: "flex", justifyContent: "end" }}
                >
                  <Button
                    size='large'
                    type='submit'
                    variant='contained'
                    color='primary'
                  >
                    Guardar
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Layout>
  );
};

export default AddLines;
