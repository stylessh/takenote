import React from "react";

import { Button } from "@geist-ui/core";
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
    <nav className="nav">
      <RouterLink to="/">
        <h1 className="logo" font="1em">
          Take Note
        </h1>
      </RouterLink>

      {/* Change theme button */}
      <Button
        onClick={handleChangeTheme}
        iconRight={theme === "light" ? <Sun /> : <Moon />}
        auto
      />
    </nav>
  );
};

export default Navbar;
