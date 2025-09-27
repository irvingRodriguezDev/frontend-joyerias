import React, { useContext, useState } from "react";
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
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import StateSelect from "../../containers/selectOptions/StateSelect";
import MunicipalitySelect from "../../containers/selectOptions/MunicipalitySelect";
import AuthContext from "../../Context/Auth/AuthContext";
import { Link } from "react-router-dom";

// Schema de validación
const RegisterSchema = Yup.object().shape({
  name_user: Yup.string().required("El nombre completo es obligatorio"),
  email: Yup.string()
    .email("Correo inválido")
    .required("El correo es obligatorio"),
  password: Yup.string()
    .min(6, "Mínimo 6 caracteres")
    .required("La contraseña es obligatoria"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir")
    .required("Confirma la contraseña"),
  name_shop: Yup.string().required("Nombre de la tienda obligatorio"),
  state: Yup.string().required("Selecciona un estado"),
  municipality: Yup.string().required("Selecciona un municipio"),
});

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const [selectedState, setSelectedState] = useState(null);

  return (
    <Grid
      container
      spacing={2}
      sx={{ display: "flex", justifyContent: "center" }}
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
            Crear Cuenta
          </Typography>

          <Formik
            initialValues={{
              name_user: "",
              email: "",
              password: "",
              password_confirmation: "",
              name_shop: "",
              state: "",
              municipality: "",
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values) => {
              registerUser(values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              setFieldValue,
            }) => (
              <Form>
                {/* Nombre completo */}
                <FormControl fullWidth margin='normal'>
                  <TextField
                    id='name_user'
                    name='name_user'
                    label='Nombre completo'
                    variant='outlined'
                    value={values.name_user}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name_user && Boolean(errors.name_user)}
                    helperText={touched.name_user && errors.name_user}
                  />
                </FormControl>

                {/* Correo */}
                <FormControl fullWidth margin='normal'>
                  <TextField
                    id='email'
                    name='email'
                    label='Correo electrónico'
                    variant='outlined'
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
                    type='password'
                    variant='outlined'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </FormControl>

                {/* Confirmar contraseña */}
                <FormControl fullWidth margin='normal'>
                  <TextField
                    id='password_confirmation'
                    name='password_confirmation'
                    label='Confirmar contraseña'
                    type='password'
                    variant='outlined'
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

                {/* Nombre de la tienda */}
                <FormControl fullWidth margin='normal'>
                  <TextField
                    id='name_shop'
                    name='name_shop'
                    label='Nombre de la tienda'
                    variant='outlined'
                    value={values.name_shop}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name_shop && Boolean(errors.name_shop)}
                    helperText={touched.name_shop && errors.name_shop}
                  />
                </FormControl>

                {/* Estado */}
                <FormControl fullWidth margin='normal'>
                  <StateSelect
                    value={
                      selectedState
                        ? { value: selectedState, label: selectedState }
                        : null
                    }
                    detectarCambiosState={(value) => {
                      setSelectedState(value.value);
                      setFieldValue("state", value.value);
                      setFieldValue("municipality", ""); // limpiar municipio si cambia estado
                    }}
                  />
                  {touched.state && errors.state && (
                    <Typography color='error'>{errors.state}</Typography>
                  )}
                </FormControl>

                {/* Municipio */}
                {values.state && (
                  <FormControl fullWidth margin='normal'>
                    <MunicipalitySelect
                      state_id={values.state}
                      value={
                        values.municipality
                          ? {
                              value: values.municipality,
                              label: values.municipality,
                            }
                          : null
                      }
                      detectarCambiosMunicipality={(value) =>
                        setFieldValue("municipality", value.value)
                      }
                    />
                    {touched.municipality && errors.municipality && (
                      <Typography color='error'>
                        {errors.municipality}
                      </Typography>
                    )}
                  </FormControl>
                )}

                {/* Botón */}
                <FormControl fullWidth margin='normal'>
                  <Button
                    type='submit'
                    variant='contained'
                    size='large'
                    color='primary'
                  >
                    Registrarme
                  </Button>
                </FormControl>

                <Divider sx={{ my: 2 }}>¿Ya tienes cuenta?</Divider>
                <Link to={"/iniciar-sesion"}>
                  <Button variant='contained' color='primary' size='large'>
                    Inicia Sesión
                  </Button>
                </Link>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Grid>
  );
};

export default Register;
