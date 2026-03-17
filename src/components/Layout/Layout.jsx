import React, { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import Header from "./Header";
import Aside from "./Aside";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);

  const handleMenuClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Header onMenuClick={handleMenuClick} />
      <Aside open={open} onClose={handleClose} />

      {/* El contenido principal */}
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />{" "}
        {/* Para que no se esconda el contenido debajo del header */}
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
