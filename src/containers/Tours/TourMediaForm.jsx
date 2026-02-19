import { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  IconButton,
  Checkbox,
  FormControlLabel,
  LinearProgress,
  Card,
  CardMedia,
  Chip,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Layout from "../../components/Layout/Layout";
import clienteAxios from "../../config/Axios";

const MAX_FILES = 4;

export default function TourMediaForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [coverIndex, setCoverIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // ✅ Permite subir 1 a 1 o varias (acumulativo)
  const handleSelectFiles = (e) => {
    const selected = Array.from(e.target.files);
    if (!selected.length) return;

    // Unir existentes + nuevas
    const combined = [...files, ...selected];

    // Evitar duplicados (name + size)
    const uniqueFiles = combined.filter(
      (file, index, self) =>
        index ===
        self.findIndex((f) => f.name === file.name && f.size === file.size)
    );

    if (uniqueFiles.length > MAX_FILES) {
      alert(`Máximo ${MAX_FILES} imágenes`);
      e.target.value = "";
      return;
    }

    setFiles(uniqueFiles);

    // Si no hay portada definida, usar la primera
    if (files.length === 0) {
      setCoverIndex(0);
    }

    // Reset input para permitir subir el mismo archivo otra vez
    e.target.value = "";
  };

  const removeFile = (index) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);

    if (coverIndex === index) setCoverIndex(0);
    else if (coverIndex > index) setCoverIndex(coverIndex - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files.length) return;

    setLoading(true);

    try {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("files", file);
      });

      formData.append("cover_index", coverIndex);

      await clienteAxios.post(`/tours/media/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Imágenes subidas correctamente");
      setFiles([]);
      setCoverIndex(0);
    } catch (error) {
      console.error(error);
      alert("Error al subir imágenes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} justifyContent='center'>
          {/* Header */}
          <Grid
            size={12}
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/admin/tours")}
            >
              Volver
            </Button>

            <Typography fontSize='30px' fontWeight='bold' color='white'>
              Media del Tour
            </Typography>
          </Grid>

          {/* Content */}
          <Grid size={{ xs: 12, md: 9 }}>
            <Paper sx={{ p: 4, borderRadius: 4 }}>
              {/* Upload */}
              <Box mb={3}>
                <Button
                  component='label'
                  variant='outlined'
                  startIcon={<CloudUploadIcon />}
                  disabled={files.length >= MAX_FILES}
                >
                  Seleccionar imágenes
                  <input
                    hidden
                    type='file'
                    multiple
                    accept='image/*'
                    onChange={handleSelectFiles}
                  />
                </Button>

                <Typography variant='caption' display='block' mt={1}>
                  Mínimo 1 · Máximo {MAX_FILES} imágenes
                </Typography>
              </Box>

              {/* Preview */}
              <Grid container spacing={3}>
                {files.map((file, index) => {
                  const preview = URL.createObjectURL(file);

                  return (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <Card
                        sx={{
                          position: "relative",
                          borderRadius: 3,
                          overflow: "hidden",
                          boxShadow: coverIndex === index ? 6 : 2,
                          transition: "0.3s",
                          "&:hover": {
                            boxShadow: 8,
                            transform: "translateY(-4px)",
                          },
                        }}
                      >
                        <CardMedia
                          component='img'
                          height='180'
                          image={preview}
                          alt={file.name}
                        />

                        {/* Portada */}
                        {coverIndex === index && (
                          <Chip
                            label='Portada'
                            color='primary'
                            size='small'
                            sx={{
                              position: "absolute",
                              top: 10,
                              left: 10,
                              fontWeight: "bold",
                            }}
                          />
                        )}

                        {/* Actions */}
                        <Box
                          sx={{
                            p: 1.5,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={coverIndex === index}
                                onChange={() => setCoverIndex(index)}
                              />
                            }
                            label='Portada'
                          />

                          <IconButton
                            color='error'
                            onClick={() => removeFile(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>

              {loading && <LinearProgress sx={{ mt: 3 }} />}

              <Button
                type='submit'
                variant='contained'
                size='large'
                fullWidth
                sx={{ mt: 4, py: 1.5, borderRadius: 3 }}
                disabled={!files.length || loading}
              >
                Subir imágenes
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Layout>
  );
}
