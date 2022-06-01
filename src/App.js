import React from "react";
import "./styles/globals.css";
import { GeistProvider, CssBaseline } from "@geist-ui/core";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import useTheme from "./hooks/useTheme";

import New from "./pages/note";
import Index from "./pages";

import Navbar from "./components/Navbar";

const App = () => {
  const { theme } = useTheme();

  return (
    <Router>
      <GeistProvider themeType={theme}>
        <CssBaseline />

        <header className="header">
          <Navbar />
        </header>

        <main className="wrapper">
          <Routes>
            <Route path="/" element={<Index />} />

            <Route path="/note/:id" element={<New />} />
          </Routes>
        </main>
      </GeistProvider>
    </Router>
  );
};

export default App;
