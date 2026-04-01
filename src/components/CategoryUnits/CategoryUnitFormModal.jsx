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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import CategoryUnitsContext from "../../Context/CategoryUnits/CategoryUnitsContext";

const CategoryUnitFormModal = ({ open, onClose, categoryToEdit }) => {
  const { storeCategoryUnits, updateCategoryUnits } =
    useContext(CategoryUnitsContext);
  const isEditing = !!categoryToEdit;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      isActive: true,
    },
  });

  // Rellenar el form al editar
  useEffect(() => {
    if (categoryToEdit) {
      reset({
        name: categoryToEdit.name,
        isActive: categoryToEdit.isActive,
      });
    } else {
      reset({ name: "", isActive: true });
    }
  }, [categoryToEdit, open]);

  const onSubmit = (data) => {
    if (isEditing) {
      updateCategoryUnits(categoryToEdit.id, data, onClose);
    } else {
      storeCategoryUnits(data, onClose);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='xs'
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
            {isEditing ? "Editar categoría" : "Nueva categoría"}
          </Typography>
          <IconButton size='small' onClick={onClose}>
            <CloseIcon fontSize='small' />
          </IconButton>
        </Box>
      </DialogTitle>

      {/* Form */}
      <DialogContent sx={{ pt: 1 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label='Nombre de la categoría'
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
                label='Categoría activa'
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
          {isEditing ? "Guardar cambios" : "Crear categoría"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryUnitFormModal;
