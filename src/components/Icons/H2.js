import React from "react";
import useTheme from "../../hooks/useTheme";

const H2 = () => {
  const { theme } = useTheme();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: "1.8em",
        height: "1.8em",
      }}
      fill="none"
      viewBox="0 0 81 48"
    >
      <path
        fill={theme === "light" ? "#020202" : "#fff"}
        d="M.045 47.182V.636h9.841v19.205h19.978V.636h9.818v46.546h-9.818V27.954H9.886v19.228H.046zM47.523 47.182V40.09L64.09 24.75c1.409-1.364 2.59-2.59 3.545-3.682.97-1.09 1.705-2.159 2.205-3.204.5-1.061.75-2.205.75-3.432 0-1.364-.31-2.538-.932-3.523a6.118 6.118 0 00-2.545-2.295c-1.076-.546-2.296-.819-3.66-.819-1.424 0-2.666.288-3.727.864a5.953 5.953 0 00-2.454 2.477c-.576 1.076-.864 2.356-.864 3.841h-9.34c0-3.045.689-5.69 2.067-7.932 1.38-2.242 3.311-3.977 5.796-5.204C57.417.614 60.28 0 63.522 0c3.334 0 6.236.59 8.705 1.773 2.485 1.166 4.417 2.788 5.796 4.863 1.379 2.076 2.068 4.455 2.068 7.137 0 1.757-.349 3.492-1.045 5.204-.682 1.712-1.902 3.614-3.66 5.705-1.757 2.076-4.234 4.568-7.431 7.477l-6.796 6.66v.317h19.546v8.046H47.523z"
      ></path>
    </svg>
  );
};

export default H2;
