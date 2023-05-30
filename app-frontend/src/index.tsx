import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import AppProvider from "./AppProvider";
import "./css/index.css";
import "./css/reset.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
