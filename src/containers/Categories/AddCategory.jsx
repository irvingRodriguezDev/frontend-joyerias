import React, { useContext, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import TypeProductSelect from "../selectOptions/TypeProductSelect";
import CategoriesContext from "../../Context/Categories/CategoriesContext";
import { Controller, useForm } from "react-hook-form";
import BusinessSelect from "../selectOptions/BusinessSelect";
const AddCategory = () => {
  const { storeCategory } = useContext(CategoriesContext);
  const [typeProduct, setTypeProduct] = useState(null);
  const [business, setBusiness] = useState(null);

  // React Hook Form
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const detectarCambiosTypeProduct = (value) => {
    setTypeProduct(value.value);
    setValue("type_product_id", value.value);
  };
  const detectarCambiosBusiness = (value) => {
    setBusiness(value.value);
    setValue("business_id", value.value);
  };

  const onSubmit = (data) => {
    // return;
    storeCategory(data); // enviamos toda la data
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid item size={12}>
            <Typography color='white' fontWeight='bold' fontSize='30px'>
              Registrar nueva categoria
            </Typography>
          </Grid>
          <Grid size={8}>
            <Paper sx={{ padding: 3, borderRadius: "12px" }}>
              <Grid container spacing={2}>
                <Grid size={12}>
                  <Controller
                    name='name'
                    control={control}
                    rules={{
                      required: "El nombre de la categoria es obligatorio",
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant='outlined'
                        fullWidth
                        label='Nombre de la categoria'
                        placeholder='Anillo'
                        error={!!errors.name}
                        helperText={errors.name?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={12}>
                  <TypeProductSelect
                    detectarCambiosTypeProduct={detectarCambiosTypeProduct}
                  />
                  {errors.type_product_id && (
                    <Typography color='error' variant='caption'>
                      {errors.type_product_id.message}
                    </Typography>
                  )}
                </Grid>
                {typeProduct === "1" && (
                  <Grid size={12}>
                    <BusinessSelect
                      detectarCambiosBusiness={detectarCambiosBusiness}
                    />
                    {errors.business_id && (
                      <Typography color='error' variant='caption'>
                        {errors.business_id.message}
                      </Typography>
                    )}
                  </Grid>
                )}
                <Grid size={12} sx={{ display: "flex", justifyContent: "end" }}>
                  <Button type='submit' variant='contained' size='large'>
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

export default AddCategory;
