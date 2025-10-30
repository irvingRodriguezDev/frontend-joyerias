// 📁 src/components/reports/CashCutReport.jsx
import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import axios from "axios";

// 🔹 Tus componentes reutilizables
import BranchesSelect from "../../containers/selectOptions/BranchesSelect";
const CashCutReport = () => {
  const [branch, setBranch] = useState("");
  const [reportType, setReportType] = useState("daily"); // daily | range
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const detectarCambiosBranch = (value) => {
    setBranch(value.value);
  };

  const handleGenerateReport = async () => {
    if (!branch) {
      alert("Por favor selecciona la sucursal.");
      return;
    }

    if (reportType === "range" && (!startDate || !endDate)) {
      alert("Selecciona el rango de fechas para generar el corte.");
      return;
    }

    setLoading(true);
    try {
      let url = "";
      let data = { branch_id: branch };

      if (reportType === "daily") {
        url = "/api/reports/cash-cut/daily"; // corte diario
      } else {
        url = "/api/reports/cash-cut/range"; // corte por rango
        data.startDate = startDate;
        data.endDate = endDate;
      }

      const response = await axios.post(url, data, { responseType: "blob" });

      const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = urlBlob;
      link.setAttribute(
        "download",
        reportType === "daily"
          ? `ticket_corte_diario_${branch}_${Date.now()}.pdf`
          : `reporte_corte_rango_${branch}_${Date.now()}.pdf`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Ocurrió un error al generar el corte de caja."
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
          Reporte de Corte de Caja
        </Typography>

        <Stack spacing={2} mt={2}>
          <BranchesSelect detectarCambiosBranch={detectarCambiosBranch} />

          <FormControl fullWidth>
            <InputLabel>Tipo de corte</InputLabel>
            <Select
              value={reportType}
              label='Tipo de corte'
              onChange={(e) => setReportType(e.target.value)}
            >
              <MenuItem value='daily'>Corte Diario</MenuItem>
              <MenuItem value='range'>Corte por Rango de Fechas</MenuItem>
            </Select>
          </FormControl>

          {reportType === "range" && (
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
          )}

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
            {loading ? "Generando..." : "Generar Corte"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default CashCutReport;
