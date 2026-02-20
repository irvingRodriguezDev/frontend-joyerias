import { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import MethodGet, { MethodPut } from "../../config/Service";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Swal from "sweetalert2";

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};

const STATUS_OPTIONS = [
  { value: "Borrador", label: "Borrador" },
  { value: "Publicado", label: "Publicado" },
];

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
      date: "", // 👈 NUEVO CAMPO
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
      date: formData.date, // 👈 se envía como YYYY-MM-DD
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };

    Swal.fire({
      title: "Actualizando tour...",
      text: "Por favor espera",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await MethodPut(`/tours/${id}`, payload);

      Swal.fire({
        icon: "success",
        title: "Tour actualizado",
        text: "Los cambios se guardaron correctamente",
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
        title: "Error",
        text: "No se pudo actualizar el tour",
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        <Typography color='white'>Cargando tour...</Typography>
      </Layout>
    );
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} sx={{ justifyContent: "center" }}>
          <Grid size={12}>
            <Typography color='white' fontWeight='bold' fontSize='30px'>
              Editar Tour
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 10 }}>
            <Paper sx={{ padding: "20px", borderRadius: "12px" }}>
              <Grid container spacing={2}>
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
                      />
                    )}
                  />
                </Grid>

                {/* Descripción corta */}
                <Grid size={12}>
                  <Controller
                    name='short_description'
                    control={control}
                    rules={{ required: "La descripción corta es obligatoria" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Descripción corta'
                        fullWidth
                        error={!!errors.short_description}
                        helperText={errors.short_description?.message}
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
                      <>
                        <Typography variant='subtitle2' mb={1}>
                          Descripción larga
                        </Typography>

                        <ReactQuill
                          theme='snow'
                          value={field.value || ""}
                          onChange={field.onChange}
                          style={{ minHeight: 180 }}
                        />

                        {errors.description && (
                          <Typography color='error' variant='caption'>
                            {errors.description.message}
                          </Typography>
                        )}
                      </>
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
                        label='Precio'
                        type='number'
                        fullWidth
                        error={!!errors.price}
                        helperText={errors.price?.message}
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
                        label='Duración'
                        fullWidth
                        error={!!errors.duration}
                        helperText={errors.duration?.message}
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
                      <>
                        <Typography variant='subtitle2' mb={1}>
                          Ubicación
                        </Typography>

                        <ReactQuill
                          theme='snow'
                          value={field.value || ""}
                          onChange={field.onChange}
                        />

                        {errors.location && (
                          <Typography color='error' variant='caption'>
                            {errors.location.message}
                          </Typography>
                        )}
                      </>
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
                        label='WhatsApp'
                        fullWidth
                        error={!!errors.whatsapp_link}
                        helperText={errors.whatsapp_link?.message}
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
                      <TextField {...field} select label='Estado' fullWidth>
                        {STATUS_OPTIONS.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>

                {/* Botón */}
                <Grid size={12}>
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    size='large'
                    fullWidth
                  >
                    Guardar cambios
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Layout>
  );
}
