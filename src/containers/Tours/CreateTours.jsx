import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Box,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import Layout from "../../components/Layout/Layout";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import ToursContext from "../../Context/Tours/ToursContext";
import { useContext } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

const STATUS_OPTIONS = [
  { value: "Borrador", label: "Borrador" },
  { value: "Publicado", label: "Publicado" },
];

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
];

// Estilo consistente para Inputs
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

// Estilo Premium para inyectar en los editores de ReactQuill
const quillCustomStyles = {
  "& .ql-toolbar": {
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    borderColor: "rgba(1, 82, 140, 0.12) !important",
    background: "#F8FAFC",
  },
  "& .ql-container": {
    borderBottomLeftRadius: "12px",
    borderBottomRightRadius: "12px",
    borderColor: "rgba(1, 82, 140, 0.12) !important",
    fontFamily: "'Jost', sans-serif",
    fontSize: "14px",
  },
};

export default function CreateTour() {
  const { storeTours } = useContext(ToursContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      short_description: "",
      description: "",
      price: "",
      duration: "",
      location: "",
      category: "",
      tags: "",
      whatsapp_link: "",
      status: "Publicado",
      date: "",
    },
  });

  const onSubmit = (data) => {
    const payload = {
      ...data,
      price: Number(data.price),
      date: new Date(data.date),
      tags: data.tags.split(",").map((tag) => tag.trim()),
    };
    storeTours(payload);
  };

  return (
    <Layout>
      <Box
        sx={{
          backgroundColor: "transparent",
          minHeight: "100vh",
          p: { xs: 2, md: 4 },
          borderRadius: "24px",
          mt: 2,
          border: "1px solid rgba(1, 82, 140, 0.04)",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            {/* Header con botón de regreso */}
            <Grid size={{ xs: 12, md: 10 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}
              >
                <Link to='/tours' style={{ textDecoration: "none" }}>
                  <Button
                    startIcon={<ArrowBackIcon />}
                    sx={{
                      fontFamily: "'Jost', sans-serif",
                      textTransform: "none",
                      color: "#fff",
                      fontWeight: 600,
                      "&:hover": { backgroundColor: "rgba(1, 82, 140, 0.05)" },
                    }}
                  >
                    Volver a catálogo
                  </Button>
                </Link>
              </Box>
              <Typography
                sx={{
                  fontFamily: "'Jost', sans-serif",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "30px",
                }}
              >
                Registrar nuevo tour
              </Typography>
            </Grid>

            {/* Formulario Principal */}
            <Grid size={{ xs: 12, md: 10 }}>
              <Paper
                elevation={0}
                sx={{
                  padding: { xs: 3, md: 4 },
                  borderRadius: "20px",
                  border: "1px solid rgba(1, 82, 140, 0.08)",
                  boxShadow: "0 4px 20px rgba(1, 82, 140, 0.01)",
                }}
              >
                <Grid container spacing={3}>
                  {/* Título */}
                  <Grid size={12}>
                    <Controller
                      name='title'
                      control={control}
                      rules={{ required: "El título del tour es obligatorio" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label='Título del tour'
                          placeholder='Ej. Escapada Mágica a Huatulco'
                          fullWidth
                          error={!!errors.title}
                          helperText={errors.title?.message}
                          sx={inputSx}
                        />
                      )}
                    />
                  </Grid>

                  {/* Descripción corta */}
                  <Grid size={12}>
                    <Controller
                      name='short_description'
                      control={control}
                      rules={{
                        required: "La descripción corta es obligatoria",
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label='Descripción corta'
                          placeholder='Explora uno de los lugares más impresionantes de México en un viaje exclusivo...'
                          fullWidth
                          autoComplete='off'
                          error={!!errors.short_description}
                          helperText={errors.short_description?.message}
                          sx={inputSx}
                        />
                      )}
                    />
                  </Grid>

                  {/* Descripción larga estilizada */}
                  <Grid size={12}>
                    <Controller
                      name='description'
                      control={control}
                      rules={{ required: "La descripción es obligatoria" }}
                      render={({ field }) => (
                        <Box sx={quillCustomStyles}>
                          <Typography
                            sx={{
                              fontFamily: "'Jost', sans-serif",
                              mb: 1,
                              fontWeight: 600,
                              color: "#334155",
                              fontSize: "14px",
                            }}
                          >
                            Itinerario y descripción completa del viaje
                          </Typography>

                          <ReactQuill
                            theme='snow'
                            value={field.value}
                            onChange={field.onChange}
                            modules={quillModules}
                            formats={quillFormats}
                            style={{
                              height: "200px",
                              marginBottom: "46px",
                            }}
                          />

                          {errors.description && (
                            <Typography
                              color='error'
                              variant='caption'
                              sx={{
                                fontFamily: "'Jost', sans-serif",
                                mt: 0.5,
                                display: "block",
                              }}
                            >
                              {errors.description.message}
                            </Typography>
                          )}
                        </Box>
                      )}
                    />
                  </Grid>

                  {/* Fecha */}
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                      name='date'
                      control={control}
                      rules={{ required: "La fecha es obligatoria" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label='Fecha de salida'
                          type='date'
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          error={!!errors.date}
                          helperText={errors.date?.message}
                          sx={inputSx}
                        />
                      )}
                    />
                  </Grid>

                  {/* Precio */}
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                      name='price'
                      control={control}
                      rules={{ required: "El precio es obligatorio" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label='Precio por persona (MXN)'
                          placeholder='1200'
                          type='number'
                          fullWidth
                          error={!!errors.price}
                          helperText={errors.price?.message}
                          sx={inputSx}
                        />
                      )}
                    />
                  </Grid>

                  {/* Duración */}
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                      name='duration'
                      control={control}
                      rules={{ required: "La duración es obligatoria" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label='Duración estimada'
                          placeholder='Ej. 3 Días y 2 Noches'
                          fullWidth
                          autoComplete='off'
                          error={!!errors.duration}
                          helperText={errors.duration?.message}
                          sx={inputSx}
                        />
                      )}
                    />
                  </Grid>

                  {/* Ubicación / Puntos de Abordar */}
                  <Grid size={12}>
                    <Controller
                      name='location'
                      control={control}
                      rules={{ required: "La ubicación es obligatoria" }}
                      render={({ field }) => (
                        <Box sx={quillCustomStyles}>
                          <Typography
                            sx={{
                              fontFamily: "'Jost', sans-serif",
                              mb: 1,
                              fontWeight: 600,
                              color: "#334155",
                              fontSize: "14px",
                            }}
                          >
                            Puntos de abordaje y horarios de reunión
                          </Typography>

                          <ReactQuill
                            theme='snow'
                            value={field.value || ""}
                            onChange={field.onChange}
                            modules={quillModules}
                            formats={quillFormats}
                            style={{
                              height: "120px",
                              marginBottom: "46px",
                            }}
                          />

                          {errors.location && (
                            <Typography
                              color='error'
                              variant='caption'
                              sx={{
                                fontFamily: "'Jost', sans-serif",
                                mt: 0.5,
                                display: "block",
                              }}
                            >
                              {errors.location.message}
                            </Typography>
                          )}
                        </Box>
                      )}
                    />
                  </Grid>

                  {/* Categoría */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Controller
                      name='category'
                      control={control}
                      rules={{ required: "La categoría es obligatoria" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label='Categoría del viaje'
                          placeholder='Ej. Playa, Aventura, Cultural'
                          fullWidth
                          autoComplete='off'
                          error={!!errors.category}
                          helperText={errors.category?.message}
                          sx={inputSx}
                        />
                      )}
                    />
                  </Grid>

                  {/* Tags */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Controller
                      name='tags'
                      control={control}
                      rules={{ required: "Los tags son obligatorios" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label='Tags / Etiquetas clave (separados por coma)'
                          placeholder='naturaleza, fotografía, familiar'
                          fullWidth
                          autoComplete='off'
                          error={!!errors.tags}
                          helperText={errors.tags?.message}
                          sx={inputSx}
                        />
                      )}
                    />
                  </Grid>

                  {/* WhatsApp */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Controller
                      name='whatsapp_link'
                      control={control}
                      rules={{
                        required: "El enlace de WhatsApp es obligatorio",
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label='Telefono de atención (WhatsApp)'
                          placeholder='734XXXXXXX'
                          fullWidth
                          error={!!errors.whatsapp_link}
                          helperText={errors.whatsapp_link?.message}
                          sx={inputSx}
                        />
                      )}
                    />
                  </Grid>

                  {/* Status */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Controller
                      name='status'
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          select
                          label='Estado de publicación'
                          fullWidth
                          sx={inputSx}
                          SelectProps={{
                            MenuProps: {
                              PaperProps: {
                                sx: {
                                  borderRadius: "12px",
                                  boxShadow:
                                    "0 4px 20px rgba(1, 82, 140, 0.08)",
                                },
                              },
                            },
                          }}
                        >
                          {STATUS_OPTIONS.map((option) => (
                            <MenuItem
                              key={option.value}
                              value={option.value}
                              sx={{
                                fontFamily: "'Jost', sans-serif",
                                fontSize: "14px",
                              }}
                            >
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  </Grid>

                  {/* Botón de envío plano */}
                  <Grid
                    size={12}
                    sx={{ display: "flex", justifyContent: "center", mt: 1 }}
                  >
                    <Button
                      type='submit'
                      variant='contained'
                      disableElevation
                      size='large'
                      sx={{
                        fontFamily: "'Jost', sans-serif",
                        textTransform: "none",
                        fontWeight: 600,
                        backgroundColor: "#01528C",
                        borderRadius: "12px",
                        py: 1.5,
                        fontSize: "16px",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: "#014270",
                          transform: "translateY(-1px)",
                        },
                      }}
                    >
                      Guardar y Publicar Tour
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Layout>
  );
}
