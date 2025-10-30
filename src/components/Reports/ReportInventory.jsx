// 📁 src/components/reports/ReportInventory.jsx
import React, { useState } from "react";
import { Box, Paper, Typography, Button, Stack } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import axios from "axios";

// 🔹 Importa tus selects reutilizables
import BranchesSelect from "../../containers/selectOptions/BranchesSelect";
import StatusSelect from "../../containers/selectOptions/StatusSelect";
import TypeProductSelect from "../../containers/selectOptions/TypeProductSelect";

const ReportInventory = () => {
  const [branch, setBranch] = useState("");
  const [status, setStatus] = useState("");
  const [productType, setProductType] = useState("");
  const [loading, setLoading] = useState(false);

  const detectarCambiosBranch = (value) => {
    setBranch(value.value);
  };
  const detectarCambiosStatus = (value) => {
    setStatus(value.value);
  };

  const detectarCambiosTypeProduct = (value) => {
    setProductType(value.value);
  };

  const handleGenerateReport = async () => {
    if (!branch || !status || !productType) {
      alert("Por favor selecciona todos los campos requeridos.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "/api/reports/inventory",
        {
          branch_id: branch,
          status_id: status,
          type: productType,
        },
        { responseType: "blob" } // <-- importante para descargar el PDF
      );

      // 📄 Crear URL temporal para descargar el archivo
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `reporte_inventario_${productType}_${Date.now()}.pdf`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Ocurrió un error al generar el reporte."
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
          Reporte de Inventario
        </Typography>

        <Stack spacing={2} mt={2}>
          <BranchesSelect detectarCambiosBranch={detectarCambiosBranch} />
          <StatusSelect detectarCambiosStatus={detectarCambiosStatus} />
          <TypeProductSelect
            detectarCambiosTypeProduct={detectarCambiosTypeProduct}
          />

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

export default ReportInventory;
