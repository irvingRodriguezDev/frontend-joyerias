import React, { useContext, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import BranchesSelect from "../selectOptions/BranchesSelect";
import ClientsContext from "../../Context/Clients/ClientsContext";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";
import AuthContext from "../../Context/Auth/AuthContext";
const AddClients = () => {
  const { usuario } = useContext(AuthContext);
  const { storeClient } = useContext(ClientsContext);
  const [branch, setBranch] = useState(null);

  const detectarCambiosBranch = (value) => {
    setBranch(value.value);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      lastname: "",
      phone: "",
    },
  });

  // --- Envío del formulario ---
  const onSubmit = async (data) => {
    try {
      // Si es admin, debe seleccionar una sucursal
      if (usuario.type_user_id === 1 && !branch) {
        Swal.fire({
          title: "Cuidado",
          icon: "warning",
          timer: 2500,
          showConfirmButton: false,
          text: "Debes seleccionar una sucursal para continuar",
        });
        return; // 🔥 Importante: detener ejecución aquí
      }

      const payload = {
        name: data.name.trim(),
        lastname: data.lastname.trim(),
        phone: data.phone?.trim() || null,
        branch_id: usuario.type_user_id === 1 ? branch : usuario.branch_id, // ✅ correcto
      };

      await storeClient(payload);

      Swal.fire({
        title: "Éxito",
        text: "Cliente registrado correctamente",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      reset();
      setBranch(null);
    } catch (error) {
      console.error("Error al guardar cliente:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al guardar el cliente",
        icon: "error",
        showConfirmButton: true,
      });
    }
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
              Registrar nuevo cliente
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 10 }}>
            <Paper sx={{ padding: "20px", borderRadius: "12px" }}>
              <Grid container spacing={2}>
                {/* Nombre */}
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <Controller
                    name='name'
                    control={control}
                    rules={{ required: "El nombre es obligatorio" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Nombre'
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Apellido */}
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <Controller
                    name='lastname'
                    control={control}
                    rules={{ required: "El apellido es obligatorio" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Apellido'
                        fullWidth
                        error={!!errors.lastname}
                        helperText={errors.lastname?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Teléfono */}
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <Controller
                    name='phone'
                    control={control}
                    rules={{
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "El teléfono debe tener 10 dígitos",
                      },
                      required: {
                        value: true,
                        message: "El telefono es requerido",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Teléfono'
                        fullWidth
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Sucursal */}
                {usuario.type_user_id === 1 && (
                  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <BranchesSelect
                      detectarCambiosBranch={detectarCambiosBranch}
                    />
                  </Grid>
                )}

                {/* Botón Guardar */}
                <Grid
                  size={12}
                  sx={{ display: "flex", justifyContent: "end", mt: 2 }}
                >
                  <Button
                    variant='contained'
                    color='primary'
                    fullWidth
                    size='large'
                    type='submit'
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

export default AddClients;
