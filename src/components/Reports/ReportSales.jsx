// 📁 src/components/reports/SalesReport.jsx
import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import axios from "axios";

// 🔹 Reutilizables
import BranchesSelect from "../../containers/selectOptions/BranchesSelect";

const SalesReport = () => {
  const [branch, setBranch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const detectarCambiosBranch = (value) => {
    setBranch(value.value);
  };

  const handleGenerateReport = async () => {
    if (!branch || !startDate || !endDate) {
      alert("Por favor selecciona la sucursal y el rango de fechas.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "/api/reports/sales",
        {
          branch_id: branch,
          startDate,
          endDate,
        },
        { responseType: "blob" } // PDF en blob
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `reporte_ventas_${branch}_${Date.now()}.pdf`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Ocurrió un error al generar el reporte de ventas."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <Typography
          variant='h6'
          gutterBottom
          sx={{ color: "#173757", fontWeight: "bold" }}
        >
          Reporte de Ventas
        </Typography>

        <Stack spacing={2} mt={2}>
          <BranchesSelect detectarCambiosBranch={detectarCambiosBranch} />

          <Stack direction='row' spacing={2}>
            <TextField
              label='Fecha Inicio'
              type='date'
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <TextField
              label='Fecha Fin'
              type='date'
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Stack>

          <Button
            variant='contained'
            sx={{
              backgroundColor: "#173757",
              "&:hover": { backgroundColor: "#1e4c7d" },
              textTransform: "none",
              fontWeight: "bold",
              mt: 2,
            }}
            startIcon={<PictureAsPdfIcon />}
            onClick={handleGenerateReport}
            disabled={loading}
          >
            {loading ? "Generando..." : "Generar reporte PDF"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default SalesReport;
