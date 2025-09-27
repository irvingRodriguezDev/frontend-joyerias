import React from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import moon from "../../assets/gift/moon.gif";
import morning from "../../assets/gift/morning.gif";
import sunset from "../../assets/gift/sunset.gif";
const CardWelcome = ({ name }) => {
  // Obtenemos la hora actual
  const hour = new Date().getHours();
  let greeting = "Hola";
  let gifUrl = "";

  if (hour >= 5 && hour < 12) {
    greeting = "¡Buenos días!";
    gifUrl = morning;
  } else if (hour >= 12 && hour < 19) {
    greeting = "¡Buenas tardes!";
    gifUrl = sunset;
  } else {
    greeting = "¡Buenas noches!";
    gifUrl = moon;
  }

  return (
    <Card
      sx={{
        maxWidth: "100%",
        borderRadius: "20px",
        boxShadow: 4,
        textAlign: "center",
        overflow: "hidden",
        bgcolor: "#173757",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" }, // columna en móvil, fila en desktop
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: { xs: "center", sm: "left" },
            gap: 2, // espacio entre texto e imagen
          }}
        >
          {/* Texto */}
          <Typography
            variant='h3'
            fontWeight='bold'
            gutterBottom
            sx={{
              mt: { xs: 1, sm: 0 },
              fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" }, // responsivo
              flexGrow: 1,
              color: "white",
            }}
          >
            {greeting} {name && `, ${name}`}
          </Typography>

          {/* Imagen */}
          <Box
            component='img'
            src={gifUrl}
            alt='greeting gif'
            sx={{
              width: { xs: "80px", sm: "100px", md: "120px" },
              height: "auto",
              borderRadius: 2,
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardWelcome;
