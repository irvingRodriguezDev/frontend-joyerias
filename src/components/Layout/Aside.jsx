import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";

const Aside = ({ open, onClose }) => {
  const menuItems = [
    { text: "Inicio", icon: <HomeIcon /> },
    { text: "Configuración", icon: <SettingsIcon /> },
    { text: "Acerca de", icon: <InfoIcon /> },
  ];

  return (
    <Drawer
      anchor='left'
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: 240,
          borderTopRightRadius: "20px",
          borderBottomRightRadius: "20px",
          background: "rgba(38, 89, 139, 0.52)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(8.9px)",
          border: "1px solid rgba(38, 89, 139, 0.31)",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant='h6' gutterBottom sx={{ color: "white" }}>
          Menú
        </Typography>
      </Box>
      <List>
        {menuItems.map((item, index) => (
          <ListItemButton key={index} sx={{ color: "white" }}>
            <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Aside;
