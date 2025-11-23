import React, { useEffect } from "react";
import NavBar from "./Components/NavBar";
import Notification from "./Components/Notification";
import { Outlet } from "react-router-dom";
import ProductsContainer from "./Components/ProductsContainer";

const App = () => {
  return (
    <div>
      <Notification />
      <NavBar />
      <Outlet />
    </div>
  );
};
export default App;
