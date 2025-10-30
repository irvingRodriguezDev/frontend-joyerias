import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Paper,
  Divider,
  Fade,
} from "@mui/material";
import { BarChart, Inventory2, PointOfSale, Group } from "@mui/icons-material";
import ReportInventory from "./ReportInventory";
import ReportSales from "./ReportSales";
import ReportCashCut from "./ReportCashcut";
// 🔹 Componentes individuales de cada reporte
const InventoryReport = () => (
  <Box>
    <Typography variant='h6' fontWeight='bold' gutterBottom>
      📦 Reporte de Inventario
    </Typography>
    <Typography variant='body2' color='text.secondary'>
      Aquí podrás ver las piezas existentes, vendidas y en reparación.
    </Typography>
    <ReportInventory />
  </Box>
);

const SalesReport = () => (
  <Box>
    <Typography variant='h6' fontWeight='bold' gutterBottom>
      💰 Reporte de Ventas
    </Typography>
    <Typography variant='body2' color='text.secondary'>
      Muestra ventas totales, por fecha o por sucursal.
    </Typography>
    <ReportSales />
  </Box>
);

const CashCutReport = () => (
  <Box>
    <Typography variant='h6' fontWeight='bold' gutterBottom>
      💵 Corte de Caja
    </Typography>
    <Typography variant='body2' color='text.secondary'>
      Resumen de ingresos, egresos y saldo final del día.
    </Typography>
    <ReportCashCut />
  </Box>
);

const ClientsReport = () => (
  <Box>
    <Typography variant='h6' fontWeight='bold' gutterBottom>
      👥 Clientes Frecuentes
    </Typography>
    <Typography variant='body2' color='text.secondary'>
      Ranking de los clientes con más compras.
    </Typography>
  </Box>
);

// 🔹 TabPanel reutilizable
const TabPanel = ({ children, value, index }) => (
  <Fade in={value === index} timeout={400} unmountOnExit>
    <Box sx={{ p: 3, mt: 1 }}>{value === index && children}</Box>
  </Fade>
);

// 🔹 Componente principal
const ReportsTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper
      elevation={4}
      sx={{
        borderRadius: 3,
        p: 3,
        backgroundColor: "#f9fafb",
        minHeight: "80vh",
      }}
    >
      <Typography variant='h5' fontWeight='bold' sx={{ mb: 2 }}>
        📊 Panel de Reportes
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Tabs
        value={value}
        onChange={handleChange}
        variant='scrollable'
        scrollButtons='auto'
        textColor='primary'
        indicatorColor='primary'
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          "& .MuiTab-root": { textTransform: "none", fontWeight: 600 },
        }}
      >
        <Tab icon={<Inventory2 />} iconPosition='start' label='Inventario' />
        <Tab icon={<BarChart />} iconPosition='start' label='Ventas' />
        <Tab
          icon={<PointOfSale />}
          iconPosition='start'
          label='Corte de Caja'
        />
        <Tab icon={<Group />} iconPosition='start' label='Clientes' />
      </Tabs>

      {/* Contenido de cada Tab */}
      <TabPanel value={value} index={0}>
        <InventoryReport />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SalesReport />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CashCutReport />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ClientsReport />
      </TabPanel>
    </Paper>
  );
};

export default ReportsTabs;
