import React from "react";
import { GeistProvider, CssBaseline, Page } from "@geist-ui/core";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Index from "./pages";
import useTheme from "./hooks/useTheme";
import Navbar from "./components/Navbar";
import New from "./pages/note";

const App = () => {
  const { theme } = useTheme();

  return (
    <Router>
      <GeistProvider themeType={theme}>
        <CssBaseline />

        <Page paddingTop={3} dotBackdrop>
          <Page.Header>
            <Navbar />
          </Page.Header>

          <Page.Content>
            <Routes>
              <Route path="/" element={<Index />} />

              <Route path="/note/:id" element={<New />} />
            </Routes>
          </Page.Content>
        </Page>
      </GeistProvider>
    </Router>
  );
};

export default App;
