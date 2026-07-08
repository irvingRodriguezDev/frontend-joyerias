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

// Estilo unificado para inputs planos y corporativos
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

// Estilo limpio para los items del menú select
const menuItemSx = {
  fontFamily: "'Jost', sans-serif",
  fontSize: "14px",
  color: "#1E293B",
  "&.Mui-selected": {
    backgroundColor: "rgba(1, 82, 140, 0.08)",
    "&:hover": { backgroundColor: "rgba(1, 82, 140, 0.12)" },
  },
};

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
            {isEditing ? "🚌 Editar Tipo de Unidad" : "✨ Nuevo Tipo de Unidad"}
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 1 }}>
          {/* Nombre */}
          <TextField
            label='Nombre del tipo de unidad'
            placeholder='Ej. Sprinter VIP'
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

          {/* Categoría */}
          <Controller
            name='categoryId'
            control={control}
            render={({ field }) => (
              <TextField
                select
                label='Categoría'
                fullWidth
                {...field}
                sx={inputSx}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        borderRadius: "12px",
                        boxShadow: "0 4px 20px rgba(1, 82, 140, 0.08)",
                      },
                    },
                  },
                }}
              >
                <MenuItem
                  value=''
                  sx={{
                    ...menuItemSx,
                    fontStyle: "italic",
                    color: "text.secondary",
                  }}
                >
                  Sin categoría / Clasificación libre
                </MenuItem>
                {categories_units.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id} sx={menuItemSx}>
                    {cat.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          {/* Capacidad */}
          <TextField
            label='Capacidad máxima de pasajeros'
            placeholder='0'
            fullWidth
            type='number'
            {...register("capacity", {
              min: {
                value: 1,
                message: "La capacidad mínima es de 1 pasajero.",
              },
            })}
            error={!!errors.capacity}
            helperText={errors.capacity?.message}
            sx={inputSx}
          />

          {/* Descripción */}
          <TextField
            label='Descripción corta o especificaciones'
            placeholder='Añade detalles sobre el equipamiento, aire acondicionado, maletero, etc...'
            fullWidth
            multiline
            rows={3}
            {...register("description", {
              maxLength: { value: 255, message: "Máximo 255 caracteres." },
            })}
            error={!!errors.description}
            helperText={errors.description?.message}
            sx={inputSx}
          />

          {/* Estado Activo */}
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
                      Habilitar tipo de unidad para asignación de viajes
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
          {isEditing ? "Guardar cambios" : "Crear unidad"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UnitFormModal;
