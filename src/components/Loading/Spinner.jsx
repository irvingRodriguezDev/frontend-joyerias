import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { motion } from "framer-motion";

const LoadingSpinner = ({ message = "Cargando..." }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#06121E",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
      }}
    >
      {/* Spinner animado con framer-motion */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 1.2,
        }}
        style={{
          border: "6px solid rgba(255, 255, 255, 0.2)",
          borderTop: "6px solid #173757",
          borderRadius: "50%",
          width: "70px",
          height: "70px",
          marginBottom: "20px",
        }}
      />

      {/* Texto opcional */}
      <Typography
        variant='h6'
        sx={{
          color: "white",
          fontWeight: 500,
          letterSpacing: 0.5,
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;
