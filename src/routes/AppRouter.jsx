import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/auth/Login";
import Dashboard from "../containers/home/Dashboard";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import AuthContext from "../Context/Auth/AuthContext";
import { useContext, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Tours from "../containers/Tours/Tours";
import ResetPassword from "../components/auth/ResetPassword";
import LoadingSpinner from "../components/Loading/Spinner";
import CreateTour from "../containers/Tours/CreateTours";
import EditTour from "../containers/Tours/EditTour";
import TourMediaForm from "../containers/Tours/TourMediaForm";
import CategoryUnits from "../containers/CategoryUnits/CategoryUnits";
import TypeUnits from "../containers/TypeUnits/TypeUnits";
import Quotations from "../containers/Quotation/Quotations";

function AppRouter({ isAuthenticated }) {
  const { autenticado, usuarioAutenticado, cargando } = useContext(AuthContext);

  useEffect(() => {
    usuarioAutenticado();
  }, []);
  if (cargando) {
    return (
      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
        <LoadingSpinner />
      </Grid>
    );
  }
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route element={<PublicRoute isAuthenticated={autenticado} />}>
        <Route path='/iniciar-sesion' element={<Login />} />
        <Route path='/recuperar-contraseña' element={<ResetPassword />} />
      </Route>

      {/* Rutas privadas */}
      <Route element={<PrivateRoute isAuthenticated={autenticado} />}>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/tours' element={<Tours />} />
        <Route path='/registrar-tour' element={<CreateTour />} />
        <Route path='/tour/:id/edit' element={<EditTour />} />
        <Route path='/tour/:id/media' element={<TourMediaForm />} />
        <Route path='/categorias-unidades' element={<CategoryUnits />} />
        <Route path='/unidades' element={<TypeUnits />} />
        <Route path='/cotizaciones' element={<Quotations />} />
      </Route>

      {/* Ruta por defecto */}
      <Route path='*' element={<Navigate to='/dashboard' replace />} />
    </Routes>
  );
}

export default AppRouter;
