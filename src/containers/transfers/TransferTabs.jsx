import { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";

// 👉 Componente interno para mostrar contenido de cada tab
const TabPanel = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
};

export default function TransferTabs({ incomingContent, outgoingContent }) {
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        textColor='primary'
        indicatorColor='primary'
        sx={{
          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: 600,
            fontSize: "16px",
            paddingX: 3,
          },
          "& .MuiTabs-flexContainer": {
            gap: 2,
          },
        }}
      >
        <Tab label='Entrantes' />
        <Tab label='Salientes' />
      </Tabs>

      {/* Contenido de Entrantes */}
      <TabPanel value={value} index={0}>
        {incomingContent || (
          <Typography color='text.secondary'>
            No hay traspasos entrantes aún.
          </Typography>
        )}
      </TabPanel>

      {/* Contenido de Salientes */}
      <TabPanel value={value} index={1}>
        {outgoingContent || (
          <Typography color='text.secondary'>
            No hay traspasos salientes aún.
          </Typography>
        )}
      </TabPanel>
    </Box>
  );
}
