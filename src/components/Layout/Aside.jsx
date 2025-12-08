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
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import GroupIcon from "@mui/icons-material/Group";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CategoryIcon from "@mui/icons-material/Category";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DiscountIcon from "@mui/icons-material/Discount";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import SendAndArchiveIcon from "@mui/icons-material/SendAndArchive";
import { Link } from "react-router-dom";
import AuthContext from "../../Context/Auth/AuthContext";

const Aside = ({ open, onClose }) => {
  const { cerrarSesion } = useContext(AuthContext);

  const userData = JSON.parse(localStorage.getItem("type_user_id")) || {};
  const userType = userData; // 1 = admin, 3 = vendedor

  const menuItems = [
    {
      text: "Inicio",
      icon: <HomeIcon />,
      link: "/dashboard",
      type_user: [1, 3],
    },
    {
      text: "Sucursales",
      icon: <MapsHomeWorkIcon />,
      link: "/sucursales",
      type_user: [1],
    },
    {
      text: "Reglas de negocio",
      icon: <DiscountIcon />,
      link: "/reglas-negocio",
      type_user: [1],
    },
    {
      text: "Categorías",
      icon: <CategoryIcon />,
      link: "/categorias",
      type_user: [1],
    },
    { text: "Líneas", icon: <ListAltIcon />, link: "/lineas", type_user: [1] },
    {
      text: "Clientes",
      icon: <GroupIcon />,
      link: "/clientes",
      type_user: [1, 3],
    },
    {
      text: "Productos",
      icon: <Inventory2Icon />,
      link: "/productos",
      type_user: [1, 3],
      permissions: {
        read: true,
        write: userType === 1,
        update: userType === 1,
        delete: userType === 1,
      },
    },
    {
      text: "Salida de Productos",
      icon: <SendAndArchiveIcon />,
      link: "/salidas",
      type_user: [1],
    },
    {
      text: "Ventas",
      icon: <MonetizationOnIcon />,
      getLink: (type_user) =>
        type_user === 1 ? "/ventas/seleccionar-sucursal" : "/ventas",
      type_user: [1, 3],
    },
    {
      text: "Traspasos",
      icon: <CallSplitIcon />,
      getLink: (type_user) =>
        type_user === 1 ? "/traspasos/seleccionar-sucursal" : "/traspasos",
      type_user: [1, 3],
    },
    {
      text: "Usuarios",
      icon: <SupervisedUserCircleIcon />,
      link: "/usuarios",
      type_user: [1],
    },
    {
      text: "Reportes",
      icon: <PictureAsPdfIcon />,
      link: "/reportes",
      type_user: [1, 3],
    },
  ];

  const filteredMenu = menuItems.filter((item) =>
    item.type_user.includes(userType)
  );

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
        {filteredMenu.map((item, index) => {
          const destination = item.getLink ? item.getLink(userType) : item.link;

          return (
            <Link
              to={destination}
              style={{ textDecoration: "none" }}
              key={index}
              state={item.permissions}
            >
              <ListItemButton sx={{ color: "white" }}>
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Link>
          );
        })}
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
