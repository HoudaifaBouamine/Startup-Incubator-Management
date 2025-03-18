import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { FluentProvider, webLightTheme,webDarkTheme } from '@fluentui/react-components';
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
     <FluentProvider theme={webLightTheme}>
       <App />
     </FluentProvider>,
    </BrowserRouter>
  </React.StrictMode>
);
