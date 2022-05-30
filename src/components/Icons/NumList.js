import React from "react";
import useTheme from "../../hooks/useTheme";

const NumList = () => {
  const { theme } = useTheme();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: "1.5em",
        height: "1.5em",
      }}
      fill="none"
      viewBox="0 0 64 54"
    >
      <path
        fill={theme === "light" ? "#020202" : "#fff"}
        d="M0 43.79h6.737v1.684H3.368v3.368h3.369v1.684H0v3.369h10.105V40.42H0v3.368zm3.368-30.316h3.369V0H0v3.368h3.368v10.106zM0 23.579h6.063L0 30.653v3.031h10.105v-3.368H4.042l6.063-7.074V20.21H0v3.369zm16.842-20.21v6.736H64V3.368H16.842zm0 47.157H64V43.79H16.842v6.737zm0-20.21H64v-6.737H16.842v6.737z"
      ></path>
    </svg>
  );
};

export default NumList;
