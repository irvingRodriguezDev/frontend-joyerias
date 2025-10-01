import React, { useContext, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import StateSelect from "../selectOptions/StateSelect";
import MunicipalitySelect from "../selectOptions/MunicipalitySelect";
import BranchesContext from "../../Context/Branches/BranchesContext";
import { useForm, Controller } from "react-hook-form";

const AddBranch = () => {
  const { storeBranch } = useContext(BranchesContext);
  const [state, setState] = useState(null);

  // React Hook Form
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  // Handlers para selects
  const detectarCambiosState = (value) => {
    setState(value.value);
    setValue("state_id", value.value); // Guardamos en RHF
  };

  const detectarCambiosMunicipality = (value) => {
    setValue("municipality_id", value.value); // Guardamos en RHF
  };

  const onSubmit = (data) => {
    // return;
    storeBranch(data); // enviamos toda la data
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
              Registrar nueva sucursal
            </Typography>
          </Grid>
          <Grid item size={8}>
            <Paper sx={{ padding: 2 }}>
              <Grid container spacing={2}>
                {/* Nombre */}
                <Grid item size={6}>
                  <Controller
                    name='branch_name'
                    control={control}
                    rules={{ required: "El nombre es obligatorio" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant='outlined'
                        fullWidth
                        label='Nombre de la sucursal'
                        placeholder='Sucursal A'
                        error={!!errors.branch_name}
                        helperText={errors.branch_name?.message}
                      />
                    )}
                  />
                </Grid>
                {/* Nombre */}
                <Grid item size={6}>
                  <Controller
                    name='legal_representative'
                    control={control}
                    rules={{
                      required: "El representante es obligatorio",
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant='outlined'
                        fullWidth
                        label='Representante '
                        placeholder='Josue Perez'
                        error={!!errors.legal_representative}
                        helperText={errors.legal_representative?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Email */}
                <Grid item size={6}>
                  <Controller
                    name='email'
                    control={control}
                    rules={{
                      required: "El correo es obligatorio",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Correo inválido",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant='outlined'
                        fullWidth
                        label='Correo electrónico'
                        placeholder='algo@algo.com.mx'
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    )}
                  />
                </Grid>

                {/* RFC */}
                <Grid item size={6}>
                  <Controller
                    name='rfc'
                    control={control}
                    rules={{
                      required: "El RFC es obligatorio",
                      minLength: {
                        value: 12,
                        message: "El RFC debe tener mínimo 12 caracteres",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant='outlined'
                        fullWidth
                        label='RFC'
                        placeholder='ASDD000337DW3'
                        error={!!errors.rfc}
                        helperText={errors.rfc?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Teléfono */}
                <Grid item size={6}>
                  <Controller
                    name='phone'
                    control={control}
                    rules={{
                      required: "El teléfono es obligatorio",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Debe ser un número de 10 dígitos",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant='outlined'
                        fullWidth
                        label='Teléfono'
                        placeholder='1234567890'
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Dirección */}
                <Grid item size={12}>
                  <Controller
                    name='address'
                    control={control}
                    rules={{ required: "La dirección es obligatoria" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant='outlined'
                        fullWidth
                        label='Dirección de la sucursal'
                        placeholder='Av. Principal 123'
                        error={!!errors.address}
                        helperText={errors.address?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Estado */}
                <Grid item size={6}>
                  <StateSelect detectarCambiosState={detectarCambiosState} />
                  {errors.state_id && (
                    <Typography color='error' variant='caption'>
                      {errors.state_id.message}
                    </Typography>
                  )}
                </Grid>

                {/* Municipio */}
                {state && (
                  <Grid item size={6}>
                    <MunicipalitySelect
                      detectarCambiosMunicipality={detectarCambiosMunicipality}
                      state_id={state}
                    />
                    {errors.municipality_id && (
                      <Typography color='error' variant='caption'>
                        {errors.municipality_id.message}
                      </Typography>
                    )}
                  </Grid>
                )}

                <Grid
                  item
                  size={12}
                  sx={{ display: "flex", justifyContent: "end" }}
                >
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    size='large'
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

export default AddBranch;
