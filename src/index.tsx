import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "./index.css";
import { ThemeProvider } from "styled-components";
import { THEME } from "@constants/theme";
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";

ReactDOM.render(
  <ThemeProvider theme={THEME}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
