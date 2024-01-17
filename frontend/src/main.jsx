import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

/* IMPORTAR ESTILOS GENERALES DE LA PAGINA */
import "./css/general/dmsans.css";
import "./css/general/reset.css";
import "./css/general/styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
