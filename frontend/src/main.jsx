import { createRoot } from "react-dom/client";
import "./index.css";
import RouterShow from "./Routes/RouterShow";
import "tailwindcss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Provider } from "react-redux";
import store from "./utility/store.js";
// import { StrictMode } from "react";
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <RouterShow />
  </Provider>
  /* </StrictMode> */
);
