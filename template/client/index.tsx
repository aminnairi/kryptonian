import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { App } from "./app";

const rootElement = document.getElementById("root");

if (!(rootElement instanceof HTMLDivElement)) {
  throw new Error("Root is not a div#root");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);