import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#A47CB2", // Morado claro
    },
    background: {
      default: "#f5f5f5", // Gris claro como fondo
    },
    text: {
      primary: "#000000", // Texto principal en negro
      secondary: "#333333", // Texto secundario en gris oscuro
    },
  },
});

export default theme;
