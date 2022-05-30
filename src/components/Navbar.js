import React from "react";

import { Button, Grid, Text, Link } from "@geist-ui/core";
import { Sun, Moon } from "@geist-ui/icons";

// Theme
import { saveTheme } from "../utils/theme";
import useTheme from "../hooks/useTheme";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const handleChangeTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    saveTheme(newTheme);
  };

  return (
    <Grid.Container gap={2} alignItems="center" justify="space-between">
      <RouterLink to="/">
        <h1 font="1em">Take Note</h1>
      </RouterLink>

      {/* Change theme button */}
      <Button
        onClick={handleChangeTheme}
        icon={theme === "light" ? <Sun /> : <Moon />}
        auto
      >
        {theme === "light" ? "Light" : "Dark"}
      </Button>
    </Grid.Container>
  );
};

export default Navbar;
