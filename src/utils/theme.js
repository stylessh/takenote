// get theme from localStorage
export const getTheme = () => {
  const theme = localStorage.getItem("theme");
  if (theme) return theme;

  return "light";
};

// set theme to localStorage
export const saveTheme = (theme) => {
  localStorage.setItem("theme", theme);
};
