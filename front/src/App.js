import { useState } from "react";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import App_Shell from "./constructure/app_shell";
import { Routes, Route, BrowserRouter } from "react-router-dom";

export default function App() {
  const [colorScheme, setColorScheme] = useState("light");
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <BrowserRouter>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Routes>
            <Route path="/*" element={<App_Shell />} />
          </Routes>
        </MantineProvider>
      </ColorSchemeProvider>
    </BrowserRouter>
  );
}
