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

// Estilo de inputs planos, robustos y corporativos
const inputSx = {
  "& .MuiOutlinedInput-root": {
    fontFamily: "'Jost', sans-serif",
    borderRadius: "12px",
    background: "#F8FAFC",
    "& fieldset": { borderColor: "rgba(1, 82, 140, 0.12)" },
    "&:hover fieldset": { borderColor: "rgba(1, 82, 140, 0.3)" },
    "&.Mui-focused fieldset": {
      borderColor: "#01528C",
      borderWidth: "2px",
    },
  },
  "& .MuiInputLabel-root": {
    fontFamily: "'Jost', sans-serif",
    color: "rgba(1, 82, 140, 0.6)",
    "&.Mui-focused": { color: "#01528C" },
  },
  "& .MuiFormHelperText-root": {
    fontFamily: "'Jost', sans-serif",
    mx: 0.5,
  },
};

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
      elevation={0}
      PaperProps={{
        sx: {
          borderRadius: "20px",
          p: 1.5,
          boxShadow: "0 12px 40px rgba(1, 82, 140, 0.12)",
          border: "1px solid rgba(1, 82, 140, 0.05)",
        },
      }}
    >
      {/* Header */}
      <DialogTitle sx={{ pb: 1, pt: 1.5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant='h6'
            sx={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 700,
              color: "#1E293B",
            }}
          >
            {isEditing ? "📝 Editar Categoría" : "✨ Nueva Categoría"}
          </Typography>
          <IconButton
            size='small'
            onClick={onClose}
            sx={{
              color: "text.secondary",
              "&:hover": { backgroundColor: "rgba(1, 82, 140, 0.05)" },
            }}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        </Box>
      </DialogTitle>

      {/* Form */}
      <DialogContent sx={{ pt: 1.5, pb: 1 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 1 }}>
          <TextField
            label='Nombre de la categoría'
            placeholder='Ej. Autobuses Ejecutivos'
            fullWidth
            {...register("name", {
              required: "El nombre es obligatorio.",
              minLength: { value: 3, message: "Mínimo 3 caracteres." },
              maxLength: { value: 100, message: "Máximo 100 caracteres." },
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={inputSx}
          />

          <Controller
            name='isActive'
            control={control}
            render={({ field }) => (
              <Box
                sx={{
                  p: 2,
                  borderRadius: "12px",
                  background: field.value
                    ? "rgba(163, 187, 19, 0.04)"
                    : "#F8FAFC",
                  border: field.value
                    ? "1px solid rgba(163, 187, 19, 0.2)"
                    : "1px solid rgba(1, 82, 140, 0.08)",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "#A3BB13",
                          "& + .MuiSwitch-track": {
                            backgroundColor: "#A3BB13",
                            opacity: 0.3,
                          },
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        fontFamily: "'Jost', sans-serif",
                        fontWeight: 600,
                        color: field.value ? "#7A8C0E" : "#64748B",
                        fontSize: "14px",
                      }}
                    >
                      Permitir asignación de unidades (Activa)
                    </Typography>
                  }
                  sx={{
                    width: "100%",
                    m: 0,
                    justifyContent: "space-between",
                    flexDirection: "row-reverse",
                  }}
                />
              </Box>
            )}
          />
        </Box>
      </DialogContent>

      {/* Acciones */}
      <DialogActions sx={{ px: 3, pb: 2, pt: 1.5, gap: 1 }}>
        <Button
          onClick={onClose}
          variant='outlined'
          disableElevation
          sx={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 600,
            textTransform: "none",
            borderRadius: "12px",
            borderColor: "rgba(1, 82, 140, 0.25)",
            color: "#64748B",
            px: 3,
            "&:hover": {
              borderColor: "rgba(1, 82, 140, 0.4)",
              backgroundColor: "#F8FAFC",
            },
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant='contained'
          disableElevation
          sx={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 600,
            textTransform: "none",
            borderRadius: "12px",
            backgroundColor: "#01528C",
            px: 3,
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "#014270",
              transform: "translateY(-1px)",
            },
          }}
        >
          {isEditing ? "Guardar cambios" : "Crear categoría"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryUnitFormModal;
