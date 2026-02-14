import { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import MethodGet, { MethodPut } from "../../config/Service";
const STATUS_OPTIONS = [
  { value: "draft", label: "Borrador" },
  { value: "published", label: "Publicado" },
  { value: "archived", label: "Archivado" },
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
      status: "draft",
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
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };

    try {
      await MethodPut(`/tours/${id}`, payload);
      navigate("/tours");
    } catch (error) {
      console.error("Error al actualizar el tour", error);
    }
  };

  if (loading) {
    return (
      <Grid container justifyContent='center' mt={5}>
        <CircularProgress />
      </Grid>
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

                <Grid size={12}>
                  <Controller
                    name='description'
                    control={control}
                    rules={{ required: "La descripción es obligatoria" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Descripción completa'
                        multiline
                        rows={4}
                        fullWidth
                        error={!!errors.description}
                        helperText={errors.description?.message}
                      />
                    )}
                  />
                </Grid>

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

                <Grid size={{ xs: 12, md: 4 }}>
                  <Controller
                    name='location'
                    control={control}
                    rules={{ required: "La ubicación es obligatoria" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Ubicación'
                        fullWidth
                        error={!!errors.location}
                        helperText={errors.location?.message}
                      />
                    )}
                  />
                </Grid>

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
