import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

export default function useTheme() {
  return useContext(ThemeContext);
}
