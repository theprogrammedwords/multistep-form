import React, { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

interface ThemeInterface {
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    quaternary: string;
    error : string
  };
  fonts: string[];
  fontSizes: {
    small: string;
    medium: string;
    large: string;
    extra : string;
    extrasmall : string
  };
}


interface ThemeProps {
  children: ReactNode;
}

const theme: ThemeInterface = {
  colors: {
    primary: "#5C9D8C",
    secondary: "#6DFFDD",
    tertiary: "#EDFDF8",
    quaternary: "#E8F3F1",
    error : "#ff0000"
  },
  fonts: ["Poppins"],
  fontSizes: {
    small: "14px",
    extrasmall : '10px',
    medium: "18px",
    large: "22px",
    extra : "26px"
  },
};


const Theme: React.FC<ThemeProps> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default Theme;
