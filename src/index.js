import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
import { ThemeProvider } from "styled-components";
import { theme } from "./constants/theme";
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
