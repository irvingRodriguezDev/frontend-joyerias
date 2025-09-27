import { Routes, Route } from "react-router-dom";
import Dashboard from "../containers/home/Dashboard";

export const SystemRoutes = () => {
  return (
    <Routes>
      {/** Rutas Admin */}
      {/** Rutas Usuario */}
      <Route path='/' element={<Dashboard />} />
    </Routes>
  );
};
