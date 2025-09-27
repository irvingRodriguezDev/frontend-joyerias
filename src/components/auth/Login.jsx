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
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Correo inválido")
    .required("El correo es obligatorio"),
  password: Yup.string().required("La contraseña es obligatoria"),
});

const Login = () => {
  const { iniciarSesion } = useContext(AuthContext);

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
            Iniciar Sesión
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={(values) => iniciarSesion(values)}
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

                {/* Olvidaste contraseña */}
                <Grid item xs={12} sx={{ mt: 1, mb: 2 }}>
                  <Typography>
                    Olvidaste tu contraseña{" "}
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "#06121E",
                        fontWeight: "bold",
                      }}
                    >
                      Recuperala aquí
                    </Link>
                  </Typography>
                </Grid>

                {/* Botón Iniciar Sesión */}
                <FormControl fullWidth margin='normal'>
                  <Button
                    type='submit'
                    variant='contained'
                    size='large'
                    color='primary'
                  >
                    Iniciar Sesión
                  </Button>
                </FormControl>

                <Divider sx={{ my: 2 }}>Aún no tienes cuenta?</Divider>

                <FormControl fullWidth margin='normal'>
                  <Link to='/registro' style={{ textDecoration: "none" }}>
                    <Button variant='contained' color='primary'>
                      Regístrate aquí
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

export default Login;
