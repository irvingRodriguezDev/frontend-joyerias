import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import MethodGet from "../../config/Service";
import Layout from "../../components/Layout/Layout";
import { PriceFormat } from "../../utils/PriceFormat";
import clienteAxios from "../../config/Axios";
const DepartureDetail = () => {
  const { id } = useParams();
  const [departure, setDeparture] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDeparture = async () => {
    try {
      const res = await MethodGet(`/departures/${id}`);
      setDeparture(res.data);
    } catch (error) {
      console.error("Error cargando salida", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const res = await clienteAxios.get(`/departures/${id}/pdf`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Salida-${departure.id}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log("Error descargando PDF", error);
    }
  };

  useEffect(() => {
    fetchDeparture();
  }, [id]);

  if (loading) return <CircularProgress />;

  if (!departure) return <Typography>No se encontró la información</Typography>;

  return (
    <Layout>
      <Box sx={{ p: 2 }}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <Typography fontSize={28} fontWeight='bold'>
                Detalle de Salida #{departure.id}
              </Typography>
            </Grid>

            <Grid size={12}>
              <Typography>
                <strong>Autoriza:</strong> {departure.auth}
              </Typography>
            </Grid>
            <Grid size={12}>
              <Typography>
                <strong>Recibe:</strong> {departure.recibe}
              </Typography>
            </Grid>
            <Grid size={12}>
              <Typography>
                <strong>Sucursal:</strong> {departure.branch?.name}
              </Typography>
            </Grid>
            <Grid size={12}>
              <Typography>
                <strong>Fecha:</strong>{" "}
                {new Date(departure.created_at).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid size={12}>
              <Typography>
                <strong>Motivo:</strong> {departure.description}
              </Typography>
            </Grid>

            <Grid size={12}>
              <Typography mt={2} mb={1} fontWeight='bold'>
                Productos
              </Typography>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Producto</TableCell>
                    <TableCell>Descripcion</TableCell>
                    <TableCell>Linea</TableCell>
                    <TableCell>Categoria</TableCell>
                    <TableCell>Peso</TableCell>
                    <TableCell>Precio</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {departure.details.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.product.clave}</TableCell>
                      <TableCell>{item.product.description}</TableCell>
                      <TableCell>{item.product.line.name}</TableCell>
                      <TableCell>{item.product.category.name}</TableCell>
                      <TableCell>{item.product.weight ?? "N/A"}</TableCell>
                      <TableCell>
                        $ {PriceFormat(Number(item.product.price))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>

            <Grid size={12} sx={{ textAlign: "right", mt: 2 }}>
              <Button
                variant='contained'
                color='primary'
                onClick={handleDownloadPDF}
              >
                Descargar PDF
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Layout>
  );
};

export default DepartureDetail;
