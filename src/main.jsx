// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.jsx";
import Login from "../src/components/auth/Login.jsx";
import Register from "../src/components/auth/Register.jsx";
// ¡Ahora estas importaciones funcionarán!
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// Para una mejor práctica, también puedes agregar la normalización CSS
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./components/home/Home.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {/* CssBaseline se encarga de normalizar los estilos de forma consistente */}
        <CssBaseline />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
