import React, { useEffect, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  Switch,
  FormControlLabel,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import UnitsContext from "../../Context/Units/UnitsContext";
import CategoryUnitsContext from "../../Context/CategoryUnits/CategoryUnitsContext";

const UnitFormModal = ({ open, onClose, unitToEdit }) => {
  const { storeUnits, updateUnits } = useContext(UnitsContext);
  const { categories_units, getAllCategoriesUnits } =
    useContext(CategoryUnitsContext);

  const isEditing = !!unitToEdit;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      capacity: "",
      categoryId: "",
      isActive: true,
    },
  });

  // Cargar categorías al abrir
  useEffect(() => {
    if (open) getAllCategoriesUnits();
  }, [open]);

  // Rellenar form al editar
  useEffect(() => {
    if (unitToEdit) {
      reset({
        name: unitToEdit.name,
        description: unitToEdit.description ?? "",
        capacity: unitToEdit.capacity ?? "",
        categoryId: unitToEdit.categoryId ?? "",
        isActive: unitToEdit.isActive,
      });
    } else {
      reset({
        name: "",
        description: "",
        capacity: "",
        categoryId: "",
        isActive: true,
      });
    }
  }, [unitToEdit, open]);

  const onSubmit = (data) => {
    const payload = {
      ...data,
      capacity: data.capacity ? parseInt(data.capacity) : null,
      categoryId: data.categoryId ? data.categoryId : null,
    };

    if (isEditing) {
      updateUnits(unitToEdit.id, payload, onClose);
    } else {
      storeUnits(payload, onClose);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='sm'
      fullWidth
      PaperProps={{
        sx: { borderRadius: "20px", p: 1 },
      }}
    >
      {/* Header */}
      <DialogTitle sx={{ pb: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant='h6' fontWeight={700}>
            {isEditing ? "Editar unidad" : "Nueva unidad"}
          </Typography>
          <IconButton size='small' onClick={onClose}>
            <CloseIcon fontSize='small' />
          </IconButton>
        </Box>
      </DialogTitle>

      {/* Form */}
      <DialogContent sx={{ pt: 1 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          {/* Nombre */}
          <TextField
            label='Nombre de la unidad'
            fullWidth
            size='small'
            {...register("name", {
              required: "El nombre es obligatorio.",
              minLength: { value: 3, message: "Mínimo 3 caracteres." },
              maxLength: { value: 100, message: "Máximo 100 caracteres." },
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          {/* Descripción */}
          <TextField
            label='Descripción'
            fullWidth
            size='small'
            multiline
            rows={3}
            {...register("description", {
              maxLength: { value: 255, message: "Máximo 255 caracteres." },
            })}
            error={!!errors.description}
            helperText={errors.description?.message}
          />

          {/* Capacidad */}
          <TextField
            label='Capacidad de pasajeros'
            fullWidth
            size='small'
            type='number'
            {...register("capacity", {
              min: { value: 1, message: "La capacidad mínima es 1." },
            })}
            error={!!errors.capacity}
            helperText={errors.capacity?.message}
          />

          {/* Categoría */}
          <Controller
            name='categoryId'
            control={control}
            render={({ field }) => (
              <TextField
                select
                label='Categoría'
                fullWidth
                size='small'
                {...field}
              >
                <MenuItem value=''>
                  <em>Sin categoría</em>
                </MenuItem>
                {categories_units.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          {/* Activa */}
          <Controller
            name='isActive'
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    color='primary'
                  />
                }
                label='Unidad activa'
              />
            )}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button
          onClick={onClose}
          variant='outlined'
          sx={{ borderRadius: "10px" }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant='contained'
          sx={{
            borderRadius: "10px",
            backgroundColor: "rgba(38,89,139,0.9)",
            "&:hover": { backgroundColor: "rgba(38,89,139,1)" },
          }}
        >
          {isEditing ? "Guardar cambios" : "Crear unidad"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UnitFormModal;
