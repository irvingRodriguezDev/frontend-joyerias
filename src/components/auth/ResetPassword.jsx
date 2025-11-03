import React, { useContext } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
  FormControl,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import AuthContext from "../../Context/Auth/AuthContext";

// Esquema de validación
const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Correo inválido")
    .required("El correo es obligatorio"),
  password: Yup.string().required("La contraseña es obligatoria"),
  password_confirmation: Yup.string().required(
    "El campo confirmar contraseña es obligatoria"
  ),
});

const ResetPassword = () => {
  const { resetPassword } = useContext(AuthContext);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          border: "2px solid #3979CB",
          padding: 2,
          borderRadius: 4,
        }}
      >
        <Paper sx={{ padding: 2, borderRadius: 4 }}>
          <Typography
            sx={{ color: "#06121E", fontWeight: "bold" }}
            variant='h2'
          >
            Restablecer contraseña
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={ResetPasswordSchema}
            onSubmit={(values) => resetPassword(values)}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                {/* Correo */}
                <FormControl fullWidth margin='normal'>
                  <TextField
                    id='email'
                    name='email'
                    label='Correo electrónico'
                    variant='outlined'
                    type='email'
                    placeholder='alguien@algo.com.mx'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </FormControl>

                {/* Contraseña */}
                <FormControl fullWidth margin='normal'>
                  <TextField
                    id='password'
                    name='password'
                    label='Contraseña'
                    variant='outlined'
                    type='password'
                    placeholder='************'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </FormControl>
                {/* Contraseña */}
                <FormControl fullWidth margin='normal'>
                  <TextField
                    id='password_confirmation'
                    name='password_confirmation'
                    label='Confirmar contraseña'
                    variant='outlined'
                    type='password'
                    placeholder='************'
                    value={values.password_confirmation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.password_confirmation &&
                      Boolean(errors.password_confirmation)
                    }
                    helperText={
                      touched.password_confirmation &&
                      errors.password_confirmation
                    }
                  />
                </FormControl>

                {/* Botón Iniciar Sesión */}
                <FormControl fullWidth margin='normal'>
                  <Button
                    type='submit'
                    variant='contained'
                    size='large'
                    color='primary'
                  >
                    Restablecer Contraseña
                  </Button>
                </FormControl>

                <Divider sx={{ my: 2 }}>Recordaste la contraseña?</Divider>

                <FormControl fullWidth margin='normal'>
                  <Link to='/iniciar-sesion' style={{ textDecoration: "none" }}>
                    <Button variant='contained' color='primary'>
                      Iniciar sesion
                    </Button>
                  </Link>
                </FormControl>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Grid>
  );
};

export default ResetPassword;
