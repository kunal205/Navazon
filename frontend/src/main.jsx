import "./index.css";
import { createRoot } from "react-dom/client";
import RouterShow from "./Routes/RouterShow";
import { Provider } from "react-redux";
import store from "./utility/store.js";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterShow />
  </Provider>,
);
