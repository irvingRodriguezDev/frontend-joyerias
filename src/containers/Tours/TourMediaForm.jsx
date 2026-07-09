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
import { useParams, useNavigate, Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Layout from "../../components/Layout/Layout";
import clienteAxios from "../../config/Axios";
import Swal from "sweetalert2";

const MAX_FILES = 4;

export default function TourMediaForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [coverIndex, setCoverIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSelectFiles = (e) => {
    const selected = Array.from(e.target.files);
    if (!selected.length) return;

    const combined = [...files, ...selected];

    // Evitar duplicados (name + size)
    const uniqueFiles = combined.filter(
      (file, index, self) =>
        index ===
        self.findIndex((f) => f.name === file.name && f.size === file.size)
    );

    if (uniqueFiles.length > MAX_FILES) {
      Swal.fire({
        icon: "warning",
        title: "Límite excedido",
        text: `El sistema solo permite un máximo de ${MAX_FILES} imágenes por tour.`,
        confirmButtonColor: "#01528C",
      });
      e.target.value = "";
      return;
    }

    setFiles(uniqueFiles);

    if (files.length === 0) {
      setCoverIndex(0);
    }
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

    Swal.fire({
      title: "Subiendo imágenes...",
      text: "Optimizando y cargando archivos al servidor",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("files", file);
      });

      formData.append("cover_index", coverIndex);

      await clienteAxios.post(`/tours/media/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        icon: "success",
        title: "¡Multimedia Guardada!",
        text: "Las imágenes del tour se actualizaron correctamente.",
        timer: 1800,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/");
      }, 1800);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Fallo de carga",
        text:
          error?.response?.data?.msg ||
          "Ocurrió un error al procesar las imágenes.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          backgroundColor: "#F8FAFC",
          minHeight: "80vh",
          p: { xs: 2, md: 4 },
          borderRadius: "24px",
          mt: 2,
          border: "1px solid rgba(1, 82, 140, 0.04)",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} justifyContent='center'>
            {/* Cabecera / Header */}
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
                    Volver al panel
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
                📸 Galería multimedia del Tour
              </Typography>
            </Grid>

            {/* Contenido Operativo */}
            <Grid size={{ xs: 12, md: 10 }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: "20px",
                  border: "1px solid rgba(1, 82, 140, 0.08)",
                  boxShadow: "0 4px 20px rgba(1, 82, 140, 0.01)",
                }}
              >
                {/* Zona Drop / Subida */}
                <Box
                  sx={{
                    mb: 4,
                    p: 4,
                    border: "2px dashed rgba(1, 82, 140, 0.15)",
                    borderRadius: "14px",
                    backgroundColor: "#F8FAFC",
                    textAlign: "center",
                  }}
                >
                  <Button
                    component='label'
                    variant='outlined'
                    disableElevation
                    startIcon={<CloudUploadIcon />}
                    disabled={files.length >= MAX_FILES}
                    sx={{
                      fontFamily: "'Jost', sans-serif",
                      textTransform: "none",
                      fontWeight: 600,
                      borderRadius: "10px",
                      px: 3,
                      borderColor: "#01528C",
                      color: "#01528C",
                      "&:hover": {
                        borderColor: "#014270",
                        backgroundColor: "rgba(1, 82, 140, 0.04)",
                      },
                    }}
                  >
                    Seleccionar archivos
                    <input
                      hidden
                      type='file'
                      multiple
                      accept='image/*'
                      onChange={handleSelectFiles}
                    />
                  </Button>

                  <Typography
                    variant='caption'
                    sx={{
                      fontFamily: "'Jost', sans-serif",
                      display: "block",
                      mt: 1.5,
                      color: "#64748B",
                      fontWeight: 500,
                    }}
                  >
                    Formatos permitidos: JPG, PNG. Mínimo 1 · Máximo {MAX_FILES}{" "}
                    imágenes.
                  </Typography>
                </Box>

                {/* Previsualización en Cuadrícula Flex */}
                <Grid container spacing={3}>
                  {files.map((file, index) => {
                    const preview = URL.createObjectURL(file);
                    const isCover = coverIndex === index;

                    return (
                      <Grid size={{ xs: 12, md: 6, lg: 3 }} key={index}>
                        <Card
                          elevation={0}
                          sx={{
                            position: "relative",
                            borderRadius: "14px",
                            overflow: "hidden",
                            backgroundColor: "#ffffff",
                            border: "2px solid",
                            borderColor: isCover
                              ? "#A3BB13"
                              : "rgba(1, 82, 140, 0.08)", // Tu verde lima si es portada
                            transition: "all 0.2s ease-in-out",
                            "&:hover": {
                              transform: "translateY(-2px)",
                              borderColor: isCover
                                ? "#A3BB13"
                                : "rgba(1, 82, 140, 0.2)",
                            },
                          }}
                        >
                          <CardMedia
                            component='img'
                            height='160'
                            image={preview}
                            alt={file.name}
                            sx={{ objectFit: "cover" }}
                          />

                          {/* Badge de Portada Plano */}
                          {isCover && (
                            <Chip
                              label='Principal / Portada'
                              size='small'
                              sx={{
                                position: "absolute",
                                top: 10,
                                left: 10,
                                fontFamily: "'Jost', sans-serif",
                                fontWeight: 700,
                                fontSize: "11px",
                                backgroundColor: "#A3BB13",
                                color: "#ffffff",
                                borderRadius: "6px",
                              }}
                            />
                          )}

                          {/* Controles de la Tarjeta */}
                          <Box
                            sx={{
                              p: 1.5,
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              backgroundColor: "#ffffff",
                            }}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={isCover}
                                  onChange={() => setCoverIndex(index)}
                                  sx={{
                                    color: "rgba(1, 82, 140, 0.2)",
                                    "&.Mui-checked": { color: "#A3BB13" },
                                  }}
                                />
                              }
                              label={
                                <Typography
                                  sx={{
                                    fontFamily: "'Jost', sans-serif",
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    color: isCover ? "#A3BB13" : "#475569",
                                  }}
                                >
                                  Portada
                                </Typography>
                              }
                            />

                            <IconButton
                              size='small'
                              onClick={() => removeFile(index)}
                              sx={{
                                color: "#EF4444",
                                backgroundColor: "rgba(239, 68, 68, 0.05)",
                                borderRadius: "8px",
                                p: 0.8,
                                "&:hover": {
                                  backgroundColor: "rgba(239, 68, 68, 0.12)",
                                },
                              }}
                            >
                              <DeleteIcon fontSize='small' />
                            </IconButton>
                          </Box>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>

                {loading && (
                  <LinearProgress
                    sx={{
                      mt: 4,
                      borderRadius: "4px",
                      backgroundColor: "rgba(1, 82, 140, 0.1)",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#01528C",
                      },
                    }}
                  />
                )}

                {/* Botón de envío principal */}
                <Button
                  type='submit'
                  variant='contained'
                  disableElevation
                  size='large'
                  fullWidth
                  disabled={!files.length || loading}
                  sx={{
                    mt: 4,
                    py: 1.5,
                    fontFamily: "'Jost', sans-serif",
                    textTransform: "none",
                    fontWeight: 600,
                    backgroundColor: "#01528C",
                    borderRadius: "12px",
                    fontSize: "16px",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "#014270",
                      transform: "translateY(-1px)",
                    },
                    "&:disabled": {
                      backgroundColor: "#E2E8F0",
                      color: "#94A3B8",
                    },
                  }}
                >
                  Subir y actualizar galería
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Layout>
  );
}
