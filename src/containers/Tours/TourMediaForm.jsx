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
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import { MethodPost } from "../../config/Service";
import clienteAxios from "../../config/Axios";
const MAX_FILES = 4;

export default function TourMediaForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [coverIndex, setCoverIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSelectFiles = (e) => {
    const selected = Array.from(e.target.files);

    if (selected.length < 1) {
      alert("Debe seleccionar al menos una imagen");
      return;
    }

    if (selected.length > MAX_FILES) {
      alert(`Máximo ${MAX_FILES} imágenes`);
      return;
    }

    setFiles(selected);
    setCoverIndex(0);
  };

  const removeFile = (index) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);

    if (coverIndex === index) {
      setCoverIndex(0);
    } else if (coverIndex > index) {
      setCoverIndex(coverIndex - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!files.length) {
      alert("Debe subir al menos una imagen");
      return;
    }

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
        <Grid container spacing={2} justifyContent='center'>
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

            <Typography color='white' fontWeight='bold' fontSize='30px'>
              Cargar imágenes del tour
            </Typography>
          </Grid>

          {/* Form */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper sx={{ p: 3, borderRadius: "12px" }}>
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

              {/* Lista */}
              <Grid container spacing={2} mt={2}>
                {files.map((file, index) => (
                  <Grid size={12} key={index}>
                    <Box
                      sx={{
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        p: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography variant='body2'>{file.name}</Typography>

                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={coverIndex === index}
                              onChange={() => setCoverIndex(index)}
                            />
                          }
                          label='Portada'
                        />
                      </Box>

                      <IconButton
                        color='error'
                        onClick={() => removeFile(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              {loading && <LinearProgress sx={{ mt: 2 }} />}

              <Button
                type='submit'
                variant='contained'
                fullWidth
                size='large'
                sx={{ mt: 3 }}
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
