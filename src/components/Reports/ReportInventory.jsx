// 📁 src/components/reports/ReportInventory.jsx
import React, { useContext, useState } from "react";
import { Box, Paper, Typography, Button, Stack } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import axios from "axios";

// 🔹 Importa tus selects reutilizables
import BranchesSelect from "../../containers/selectOptions/BranchesSelect";
import StatusSelect from "../../containers/selectOptions/StatusSelect";
import TypeProductSelect from "../../containers/selectOptions/TypeProductSelect";
import clienteAxios from "../../config/Axios";
import ReportsContext from "../../Context/Reports/ReportsContext";

const ReportInventory = () => {
  const { downloadReportInventory } = useContext(ReportsContext);
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
    setProductType(value.label);
  };

  const handleGenerateReport = async () => {
    if (!branch || !status || !productType) {
      alert("Por favor selecciona todos los campos requeridos.");
      return;
    }

    setLoading(true);

    const datos = {
      branch_id: branch,
      status_id: status,
      tipo: productType.toLocaleLowerCase(),
    };

    downloadReportInventory(datos);
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
