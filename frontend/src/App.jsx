import React, { useEffect } from "react";
import NavBar from "./Components/NavBar";
import Notification from "./Components/Notification";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isCurrentUser } from "./utility/UserSLice";
import { getAllProducts } from "./utility/ProductSlice";
  
const App = () => { 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isCurrentUser());
    dispatch(getAllProducts());
  }, [dispatch]);

  return (  
    <div>
      <Notification />
      <NavBar />
      <Outlet />
    </div>
  );
};
export default App;
