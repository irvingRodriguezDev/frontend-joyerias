import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header = ({ onMenuClick }) => {
  return (
    <AppBar
      position='fixed'
      sx={{
        background: "rgba(38, 89, 139, 0.52)",
        borderBottomLeftRadius: "16px",
        borderBottomRightRadius: "16px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(8.9px)",
        border: "1px solid rgba(38, 89, 139, 0.31)",
      }}
    >
      <Toolbar>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='menu'
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' noWrap component='div'>
          Mi Sistema
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {/* Aquí podrías poner avatar de usuario, notificaciones, etc */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
