// 📁 src/components/reports/CashCutReport.jsx
import React, { useContext, useState } from "react";
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
import ReportsContext from "../../Context/Reports/ReportsContext";

// 🔹 Tus componentes reutilizables
import BranchesSelect from "../../containers/selectOptions/BranchesSelect";
const CashCutReport = () => {
  const { downloadReportBoxCutDayli, downloadReportBoxCutRange } =
    useContext(ReportsContext);
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

    let data = { branch_id: branch };

    if (reportType === "daily") {
      downloadReportBoxCutDayli(data);
    } else {
      const datos = {
        branch_id: branch,
        startDate: startDate,
        endDate: endDate,
      };
      downloadReportBoxCutRange(datos);
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
