// src/theme.jsx
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#06121e", // tono principal
      contrastText: "#ffffff", // texto sobre botones primary
    },
    secondary: {
      main: "#f50057", // puedes cambiar el secundario si quieres
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#06121e",
            },
            "&:hover fieldset": {
              borderColor: "#06121e",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#06121e",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#06121e",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#06121e",
          },
          "& .MuiInputBase-input": {
            color: "black", // texto escrito
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px", // opcional
          textTransform: "none", // quitar mayúsculas automáticas
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#06121e",
          "&.Mui-checked": {
            color: "#06121e",
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: "#06121e",
          "&.Mui-checked": {
            color: "#06121e",
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: "#06121e",
          "&.Mui-checked": {
            color: "#06121e",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#06121e",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#06121e",
          "&:hover": {
            textDecoration: "underline",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#06121e",
          },
        },
      },
    },
  },
});

export default theme;
