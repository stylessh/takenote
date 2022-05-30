import React from "react";
import useTheme from "../../hooks/useTheme";

const H1 = () => {
  const { theme } = useTheme();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: "1.5em",
        height: "1.5em",
      }}
      fill="none"
      viewBox="0 0 68 47"
    >
      <path
        fill={theme === "light" ? "#020202" : "#fff"}
        d="M0 46.545V0h9.84v19.204h19.978V0h9.818v46.545h-9.818V27.318H9.841v19.227H0zM67.727 0v46.545h-9.84V9.341h-.273l-10.66 6.682V7.295L58.478 0h9.25z"
      ></path>
    </svg>
  );
};

export default H1;
