import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import BranchesSelect from "../selectOptions/BranchesSelect";
import { Controller, useForm } from "react-hook-form";
import { Grid, TextField } from "@mui/material";
import { useState } from "react";
import ClientsContext from "../../Context/Clients/ClientsContext";
import { useContext } from "react";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function ModalAddClients({ open, handleClose }) {
  const { storeClientModal } = useContext(ClientsContext);
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

  const onSubmit = async (data) => {
    try {
      // Validar que haya una sucursal seleccionada
      if (!branch) {
        alert("Debes seleccionar una sucursal antes de guardar.");
        return;
      }
      // Armar payload para enviar al backend
      const payload = {
        name: data.name,
        lastname: data.lastname,
        phone: data.phone || null,
        branch_id: branch,
      };

      await storeClientModal(payload);

      reset();
      setBranch(null);
      handleClose();
    } catch (error) {
      console.error("Error al guardar cliente:", error);
    }
  };
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, bgcolor: "#173757", color: "white" }}
          id='customized-dialog-title'
        >
          Crear nuevo cliente
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers sx={{ padding: "20px" }}>
            <Grid container spacing={2}>
              {/* Nombre */}
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
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
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
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
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
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
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                <BranchesSelect detectarCambiosBranch={detectarCambiosBranch} />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type='submit' autoFocus variant='contained' color='primary'>
              Guardar cliente
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </React.Fragment>
  );
}
