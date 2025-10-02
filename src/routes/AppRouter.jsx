import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Dashboard from "../containers/home/Dashboard";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import AuthContext from "../Context/Auth/AuthContext";
import { useContext, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Branches from "../containers/branches/Branches";
import Products from "../containers/products/Products";
import Users from "../containers/users/Users";
import Clients from "../containers/clients/Clients";
import Sales from "../containers/sales/Sales";
import Reports from "../containers/reports/Reports";
import AddUser from "../containers/users/AddUser";
import AddBranch from "../containers/branches/AddBranch";
import Categories from "../containers/Categories/Categories";
import Lines from "../containers/Lines/Lines";
import AddCategory from "../containers/Categories/AddCategory";
function AppRouter({ isAuthenticated }) {
  const { autenticado, usuarioAutenticado, cargando } = useContext(AuthContext);

  useEffect(() => {
    usuarioAutenticado();
  }, []);
  if (cargando) {
    return (
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Box
          sx={{
            width: "105%",
            height: "177%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          cargando
        </Box>
      </Grid>
    );
  }
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route element={<PublicRoute isAuthenticated={autenticado} />}>
        <Route path='/iniciar-sesion' element={<Login />} />
        <Route path='/registro' element={<Register />} />
      </Route>

      {/* Rutas privadas */}
      <Route element={<PrivateRoute isAuthenticated={autenticado} />}>
        <Route path='/dashboard' element={<Dashboard />} />
        {/***Sucursales */}
        <Route path='/sucursales' element={<Branches />} />
        <Route path='/crear-sucursal' element={<AddBranch />} />

        {/**Categorias */}
        <Route path='/categorias' element={<Categories />} />
        <Route path='/crear-categoria' element={<AddCategory />} />

        {/**Lineas */}
        <Route path='/lineas' element={<Lines />} />

        <Route path='/productos' element={<Products />} />
        {/**Usuarios */}
        <Route path='/usuarios' element={<Users />} />
        <Route path='/crear-usuario' element={<AddUser />} />

        <Route path='/clientes' element={<Clients />} />
        <Route path='/ventas' element={<Sales />} />
        <Route path='/reportes' element={<Reports />} />
      </Route>

      {/* Ruta por defecto */}
      <Route path='*' element={<Navigate to='/dashboard' replace />} />
    </Routes>
  );
}

export default AppRouter;
