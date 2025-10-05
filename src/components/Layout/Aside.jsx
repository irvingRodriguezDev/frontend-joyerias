import React, { useContext } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Button,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import GroupIcon from "@mui/icons-material/Group";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { Link } from "react-router-dom";
import AuthContext from "../../Context/Auth/AuthContext";
import CategoryIcon from "@mui/icons-material/Category";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DiscountIcon from "@mui/icons-material/Discount";
const Aside = ({ open, onClose }) => {
  const menuItems = [
    { text: "Inicio", icon: <HomeIcon />, link: "/dashboard" },
    { text: "Sucursales", icon: <MapsHomeWorkIcon />, link: "/sucursales" },
    {
      text: "Reglas de negocio",
      icon: <DiscountIcon />,
      link: "/reglas-negocio",
    },
    { text: "Categorías", icon: <CategoryIcon />, link: "/categorias" },
    { text: "Líneas", icon: <ListAltIcon />, link: "/lineas" },
    { text: "Productos", icon: <Inventory2Icon />, link: "/productos" },
    { text: "Clientes", icon: <GroupIcon />, link: "/clientes" },
    { text: "Ventas", icon: <MonetizationOnIcon />, link: "/ventas" },
    { text: "Usuarios", icon: <SupervisedUserCircleIcon />, link: "/usuarios" },
    { text: "Reportes", icon: <PictureAsPdfIcon />, link: "/reportes" },
    { text: "Acerca de", icon: <InfoIcon /> },
  ];
  const { cerrarSesion } = useContext(AuthContext);
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
          <Link to={item.link} style={{ textDecoration: "none" }} key={index}>
            <ListItemButton key={index} sx={{ color: "white" }}>
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </Link>
        ))}
      </List>
      <Button
        sx={{ mb: 0, mt: "100%" }}
        variant='contained'
        color='primary'
        size='large'
        onClick={() => cerrarSesion()}
      >
        Cerrar Sesión
      </Button>
    </Drawer>
  );
};

export default Aside;
