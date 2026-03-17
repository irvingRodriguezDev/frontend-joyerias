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
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import CategoryIcon from "@mui/icons-material/Category";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../../Context/Auth/AuthContext";
import TourIcon from "../icons/TourIcon";
import Logo from "../../assets/img/LOGO EXPERIENCIAS MEXICO VECTOR.png";

const menuItems = [
  {
    text: "Inicio",
    icon: <HomeIcon />,
    link: "/dashboard",
    type_user: ["admin"],
  },
  {
    text: "Tours",
    icon: <TourIcon width={24} />,
    link: "/tours",
    type_user: ["admin"],
  },
  {
    text: "Cotizaciones",
    icon: <RequestQuoteIcon />,
    link: "/cotizaciones",
    type_user: ["admin"],
  },
  {
    text: "Tipos de unidad",
    icon: <DirectionsBusIcon />,
    link: "/unidades",
    type_user: ["admin"],
  },
  {
    text: "Categorías de unidad",
    icon: <CategoryIcon />,
    link: "/categorias-unidades",
    type_user: ["admin"],
  },
];

const Aside = ({ open, onClose }) => {
  const { cerrarSesion } = useContext(AuthContext);
  const location = useLocation();
  const userType = JSON.parse(localStorage.getItem("type_user"));

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
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "rgba(38, 89, 139, 0.52)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(8.9px)",
          border: "1px solid rgba(38, 89, 139, 0.31)",
        },
      }}
    >
      {/* parte superior — logo + menu */}
      <Box>
        <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
          <img src={Logo} width={120} height={80} alt='Logo' />
        </Box>

        <List>
          {filteredMenu.map((item, index) => {
            const isActive = location.pathname === item.link;

            return (
              <Link
                to={item.link}
                style={{ textDecoration: "none" }}
                key={index}
                onClick={onClose}
              >
                <ListItemButton
                  sx={{
                    color: "white",
                    borderRadius: "12px",
                    mx: 1,
                    mb: 0.5,
                    backgroundColor: isActive
                      ? "rgba(255,255,255,0.2)"
                      : "transparent",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.15)",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "white", minWidth: 36 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{ fontSize: 14 }}
                  />
                </ListItemButton>
              </Link>
            );
          })}
        </List>
      </Box>

      {/* parte inferior — cerrar sesión */}
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant='contained'
          color='primary'
          onClick={cerrarSesion}
        >
          Cerrar Sesión
        </Button>
      </Box>
    </Drawer>
  );
};

export default Aside;
