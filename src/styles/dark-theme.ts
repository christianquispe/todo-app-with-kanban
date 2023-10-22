import { createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6B1E4A", // Morado oscuro
    },
    background: {
      default: "#333333", // Gris oscuro como fondo
    },
    text: {
      primary: "#ffffff", // Texto principal en blanco
      secondary: "#f5f5f5", // Texto secundario en gris claro
    },
  },
});

export default darkTheme;
