import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import Layout from "../../components/Layout/Layout";

const STATUS_OPTIONS = [
  { value: "draft", label: "Borrador" },
  { value: "published", label: "Publicado" },
  { value: "archived", label: "Archivado" },
];
import ToursContext from "../../Context/Tours/ToursContext";
import { useContext } from "react";
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
      status: "draft",
    },
  });

  const onSubmit = (data) => {
    const payload = {
      ...data,
      price: Number(data.price),
      tags: data.tags.split(",").map((tag) => tag.trim()),
    };
    storeTours(payload);
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} sx={{ justifyContent: "center" }}>
          <Grid size={12}>
            <Typography color='white' fontWeight='bold' fontSize='30px'>
              Registrar nuevo tour
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
                    rules={{ required: "El título del tour es obligatorio" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Título del tour'
                        placeholder='Tour Malilla'
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
                        placeholder='Explora uno de los lugares más impresionantes...'
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
                        placeholder='1200'
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
                        placeholder='4 horas'
                        fullWidth
                        error={!!errors.duration}
                        helperText={errors.duration?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Ubicación */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <Controller
                    name='location'
                    control={control}
                    rules={{ required: "La ubicación es obligatoria" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Ubicación'
                        placeholder='Trosten'
                        fullWidth
                        error={!!errors.location}
                        helperText={errors.location?.message}
                      />
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
                        placeholder='aventura'
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
                        placeholder='naturaleza, fotografía, familia'
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
                    rules={{ required: "El enlace de WhatsApp es obligatorio" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Link de WhatsApp'
                        placeholder='https://wa.me/521XXXXXXXXXX'
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
                <Grid
                  size={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    size='large'
                    fullWidth
                  >
                    Guardar Tour
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
