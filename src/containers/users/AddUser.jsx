import React, { useContext, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import BranchesSelect from "../selectOptions/BranchesSelect";
import UsersContext from "../../Context/Users/UsersContext";
import { useForm, Controller } from "react-hook-form";

const AddUser = () => {
  const { storeUser } = useContext(UsersContext);
  const [branch, setBranch] = useState(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      branch_id: null,
    },
  });

  const detectarCambiosBranch = (value) => {
    setBranch(value.value);
    setValue("branch_id", value.value, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    // Enviar la data a la función del context
    storeUser(data);
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2} display='flex' justifyContent='center'>
          <Grid size={12}>
            <Typography
              sx={{ color: "white", fontWeight: "bold", fontSize: "30px" }}
            >
              Registrar nuevo usuario
            </Typography>
          </Grid>
          <Grid
            size={{ xs: 12, md: 10 }}
            display='flex'
            justifyContent='center'
            sx={{ padding: "20px", borderRadius: "12px" }}
          >
            <Paper
              sx={{
                width: "100%",
                padding: 3,
                borderRadius: "10px",
              }}
            >
              <Grid container spacing={2}>
                {/* Nombre */}
                <Grid size={12}>
                  <Controller
                    name='name'
                    control={control}
                    rules={{
                      required: "El nombre es obligatorio",
                      minLength: {
                        value: 3,
                        message: "El nombre debe tener al menos 3 caracteres",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Nombre completo'
                        placeholder='Josue Lopez Lopez'
                        type='text'
                        variant='outlined'
                        error={!!errors.name}
                        helperText={errors.name?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Correo */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name='email'
                    control={control}
                    rules={{
                      required: "El correo es obligatorio",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Ingresa un correo válido",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Correo electrónico'
                        placeholder='algo@alguien.com.mx'
                        type='email'
                        variant='outlined'
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Contraseña */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name='password'
                    control={control}
                    rules={{
                      required: "La contraseña es obligatoria",
                      minLength: {
                        value: 6,
                        message:
                          "La contraseña debe tener al menos 6 caracteres",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Contraseña'
                        placeholder='***********'
                        type='password'
                        variant='outlined'
                        error={!!errors.password}
                        helperText={errors.password?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Sucursal */}
                <Grid size={{ xs: 12, md: 12 }}>
                  <BranchesSelect
                    detectarCambiosBranch={detectarCambiosBranch}
                  />
                  {errors.branch_id && (
                    <Typography color='error' variant='body2'>
                      {errors.branch_id?.message}
                    </Typography>
                  )}
                </Grid>

                {/* Botón */}
                <Grid size={12} display='flex' justifyContent='end'>
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    fullWidth
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

export default AddUser;
