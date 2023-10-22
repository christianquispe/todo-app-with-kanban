import "./styles.css";
import { createContext, useContext, useMemo, useState } from "react";
import { TasksProvider } from "../Tasks/context/TaskProvider";
import { TaskView } from "../Tasks/TaskView";
import { GlobalStyles, ThemeProvider } from "@mui/material";
import darkTheme from "../styles/dark-theme";
import lightTheme from "../styles/light-theme";

const ColorModeContext = createContext({
  toggleColorMode: () => {
    //
  },
});

export const useTheme = () => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default function TasksApp() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const currentTheme = useMemo(
    () => (mode === "light" ? lightTheme : darkTheme),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyles
          styles={() => ({
            ul: {
              listStyle: "none",
              margin: 0,
              padding: 0,
            },
          })}
        />
        <TasksProvider>
          <TaskView />
        </TasksProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
