import React, { useContext, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import OperatorSelect from "../selectOptions/OperatorSelect";
import BusinessRuleContext from "../../Context/BusinessRule/BusinessRuleContext";
import { Controller, useForm } from "react-hook-form";
const AddBusinessRule = () => {
  const { storeBusiness } = useContext(BusinessRuleContext);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const [operator, setOperator] = useState(null);
  const detectarCambiosOperator = (value) => {
    setOperator(value.value);
    setValue("operator", value.value);
  };
  const onSubmit = (data) => {
    storeBusiness(data);
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
            <Typography fontWeight='bold' fontSize='30px' color='white'>
              Crear nueva regla de negocio
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 8, lg: 8 }}>
            <Paper sx={{ padding: "20px", borderRadius: "12px" }}>
              <Grid container spacing={2}>
                <Grid size={12}>
                  <OperatorSelect
                    detectarCambiosOperator={detectarCambiosOperator}
                  />
                </Grid>
                <Grid size={12}>
                  <Controller
                    name='multiplicator'
                    control={control}
                    rules={{
                      required: "El valor del multiplicador es requerido",
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant='outlined'
                        fullWidth
                        label='Multiplicador'
                        placeholder='4'
                        error={!!errors.multiplicator}
                        helperText={errors.multiplicator?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={12}>
                  <Controller
                    name='percent_discount'
                    control={control}
                    rules={{
                      required: "El valor del descuento es requerido",
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant='outlined'
                        fullWidth
                        label='Porcentaje de descuento'
                        placeholder='10'
                        error={!!errors.percent_discount}
                        helperText={errors.percent_discount?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid
                  size={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    size='large'
                    variant='contained'
                    color='primary'
                    type='submit'
                    fullWidth
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

export default AddBusinessRule;
