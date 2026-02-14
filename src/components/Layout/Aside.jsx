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
import { Link } from "react-router-dom";
import AuthContext from "../../Context/Auth/AuthContext";
import TourIcon from "../icons/TourIcon";

const Aside = ({ open, onClose }) => {
  const { cerrarSesion } = useContext(AuthContext);

  const userData = JSON.parse(localStorage.getItem("type_user"));

  const userType = userData; // 1 = admin, 3 = vendedor

  const menuItems = [
    {
      text: "Inicio",
      icon: <HomeIcon />,
      link: "/dashboard",
      type_user: ["admin"],
    },
    {
      text: "Tours",
      icon: <TourIcon width={30} />,
      link: "/tours",
      type_user: ["admin"],
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
