import React from "react";
import ReactDOM from "react-dom/client";
import WarnHeader from "./component/WarnHeader";

const root = document.createElement("div");
document.body.append(root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <WarnHeader />
  </React.StrictMode>
);
