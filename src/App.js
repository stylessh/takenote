import React from "react";
import { GeistProvider, CssBaseline } from "@geist-ui/core";

import Index from "./pages";

import useTheme from "./hooks/useTheme";

const App = () => {
  const { theme } = useTheme();

  return (
    <GeistProvider themeType={theme}>
      <CssBaseline />

      <Index />
    </GeistProvider>
  );
};

export default App;
