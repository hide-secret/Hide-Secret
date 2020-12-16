import React from "react";
import { render } from "react-dom";
import App from "./App";
import Ranking from "./components/Ranking";
import MenuProvider from "react-flexible-sliding-menu";

render(
  <MenuProvider MenuComponent={Ranking} direction="left" animation="push">
    <App />
  </MenuProvider>,
  document.getElementById("root")
);
