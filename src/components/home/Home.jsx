import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import StateSelect from "../../containers/selectOptions/StateSelect";
import MunicipalitySelect from "../../containers/selectOptions/MunicipalitySelect";
const Home = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{ display: "flex", justifyContent: "center", justifyItems: "center" }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          border: "2px solid #3979CB",
          padding: 2,
          borderRadius: 4,
        }}
      >
        <Paper sx={{ padding: 2, borderRadius: 4, backgroundColor: "" }}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <Typography
                sx={{ color: "#06121E", fontWeight: "bold" }}
                variant='h2'
              >
                Crear Cuenta
              </Typography>
            </Grid>
            <Grid item size={12}>
              <TextField
                label='nombre completo'
                type='text'
                placeholder='Irving Rodriguez'
                variant='outlined'
                fullWidth
                className='custom-textfield'
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label='Correo electronico'
                type='email'
                placeholder='alguien@algo.com.mx'
                variant='outlined'
                fullWidth
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label='Contraseña'
                type='password'
                placeholder='************'
                variant='outlined'
                fullWidth
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label='Confirmar Contraseña'
                type='password'
                placeholder='************'
                variant='outlined'
                fullWidth
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label='Nombre de la tienda'
                type='text'
                placeholder='Joyas Montiel'
                variant='outlined'
                fullWidth
              />
            </Grid>
            <Grid size={12}>
              <StateSelect />
            </Grid>
            <Grid size={12}>
              <MunicipalitySelect />
            </Grid>
            <Grid size={12}>
              <Button variant='contained' size='large' color='primary'>
                Registrarme
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Grid>
  );
};

export default Home;
