import React from "react";

import { Button, Grid, Page, Text } from "@geist-ui/core";
import { Sun, Moon } from "@geist-ui/icons";

// Theme
import { saveTheme } from "../utils/theme";
import useTheme from "../hooks/useTheme";

const Index = () => {
  const { theme, setTheme } = useTheme();

  const handleChangeTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    saveTheme(newTheme);
  };

  return (
    <Page dotBackdrop>
      <Page.Header>
        <Grid.Container gap={2} alignItems="center" justify="space-between">
          <Text h1 font="2em">
            Take Note
          </Text>

          {/* Change theme button */}
          <Button
            onClick={handleChangeTheme}
            icon={theme === "light" ? <Sun /> : <Moon />}
            auto
          >
            {theme === "light" ? "Light" : "Dark"}
          </Button>
        </Grid.Container>
      </Page.Header>
    </Page>
  );
};

export default Index;
