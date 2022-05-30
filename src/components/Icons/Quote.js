import React from "react";
import useTheme from "../../hooks/useTheme";

const Quote = () => {
  const { theme } = useTheme();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: "1.5em",
        height: "1.5em",
      }}
      fill="none"
      viewBox="0 0 64 46"
    >
      <path
        fill={theme === "light" ? "#020202" : "#fff"}
        d="M4.571 45.714h13.715l9.143-18.285V0H0v27.429h13.714L4.571 45.714zm36.572 0h13.714L64 27.43V0H36.571v27.429h13.715l-9.143 18.285z"
      ></path>
    </svg>
  );
};

export default Quote;
