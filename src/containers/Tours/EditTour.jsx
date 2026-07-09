import { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Box,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import MethodGet, { MethodPut } from "../../config/Service";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Swal from "sweetalert2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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

const STATUS_OPTIONS = [
  { value: "Borrador", label: "Borrador" },
  { value: "Publicado", label: "Publicado" },
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

export default function EditTour() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const {
    control,
    handleSubmit,
    reset,
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
      status: "Borrador",
      date: "",
    },
  });

  // 🔹 GET /tours/:id
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const { data } = await MethodGet(`/tours/${id}`);

        reset({
          ...data,
          tags: data.tags?.join(", "),
          date: data.date
            ? new Date(data.date).toISOString().split("T")[0]
            : "",
        });
      } catch (error) {
        console.error("Error al cargar el tour", error);
        Swal.fire({
          icon: "error",
          title: "Error de carga",
          text: "No pudimos encontrar la información de este tour.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id, reset]);

  // 🔹 PUT /tours/:id
  const onSubmit = async (formData) => {
    const payload = {
      ...formData,
      price: Number(formData.price),
      date: formData.date,
      tags: formData.tags
        ? formData.tags.split(",").map((tag) => tag.trim())
        : [],
    };

    Swal.fire({
      title: "Guardando cambios...",
      text: "Por favor espera un momento",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await MethodPut(`/tours/${id}`, payload);

      Swal.fire({
        icon: "success",
        title: "¡Tour Actualizado!",
        text: "Los cambios se guardaron correctamente en la plataforma.",
        timer: 1800,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/");
      }, 1800);
    } catch (error) {
      console.error("Error al actualizar el tour", error);
      Swal.fire({
        icon: "error",
        title: "Error al actualizar",
        text: "Hubo un fallo en el servidor, inténtalo de nuevo.",
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh",
            gap: 2,
          }}
        >
          <CircularProgress sx={{ color: "#01528C" }} />
          <Typography
            sx={{
              fontFamily: "'Jost', sans-serif",
              color: "white",
              fontWeight: 500,
            }}
          >
            Obteniendo especificaciones del tour...
          </Typography>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box
        sx={{
          backgroundColor: "#F8FAFC",
          minHeight: "100vh",
          p: { xs: 2, md: 4 },
          borderRadius: "24px",
          mt: 2,
          border: "1px solid rgba(1, 82, 140, 0.04)",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            {/* Cabecera */}
            <Grid size={{ xs: 12, md: 10 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}
              >
                <Link to='/' style={{ textDecoration: "none" }}>
                  <Button
                    startIcon={<ArrowBackIcon />}
                    sx={{
                      fontFamily: "'Jost', sans-serif",
                      textTransform: "none",
                      color: "#64748B",
                      fontWeight: 600,
                      "&:hover": { backgroundColor: "rgba(1, 82, 140, 0.05)" },
                    }}
                  >
                    Regresar al panel
                  </Button>
                </Link>
              </Box>
              <Typography
                sx={{
                  fontFamily: "'Jost', sans-serif",
                  color: "#1E293B",
                  fontWeight: 700,
                  fontSize: "30px",
                }}
              >
                📝 Editar especificaciones del tour
              </Typography>
            </Grid>

            {/* Formulario */}
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
                      rules={{ required: "El título es obligatorio" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label='Título'
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
                          fullWidth
                          error={!!errors.short_description}
                          helperText={errors.short_description?.message}
                          sx={inputSx}
                        />
                      )}
                    />
                  </Grid>

                  {/* Descripción larga */}
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
                            value={field.value || ""}
                            onChange={field.onChange}
                            modules={quillModules}
                            formats={quillFormats}
                            style={{ minHeight: "180px", marginBottom: "46px" }}
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

                  {/* Precio */}
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                      name='price'
                      control={control}
                      rules={{ required: "El precio es obligatorio" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label='Precio (MXN)'
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
                          fullWidth
                          error={!!errors.duration}
                          helperText={errors.duration?.message}
                          sx={inputSx}
                        />
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
                          label='Fecha del tour'
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

                  {/* Ubicación */}
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
                            style={{ minHeight: "120px", marginBottom: "46px" }}
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
                          label='Categoría'
                          fullWidth
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
                          label='Tags (separados por coma)'
                          fullWidth
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
                      rules={{ required: "El link de WhatsApp es obligatorio" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label='Link de atención de WhatsApp'
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
                          label='Estado del Tour'
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

                  {/* Botón */}
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
                      Guardar cambios del Tour
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
