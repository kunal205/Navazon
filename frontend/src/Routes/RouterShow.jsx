import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import ProductsContainer from "../Components/ProductsContainer.jsx";
import Adminpanel from "../Components/AdminPanel.jsx";
import { useDispatch, useSelector } from "react-redux";
import { isCurrentUser } from "../utility/UserSLice.js";
import SingleProduct from "../Components/SingleProduct.jsx";
import WishList from "../Components/WishList.jsx";
import AddToCart from "../Components/AddToCart.jsx";
import BuyNow from "../Components/BuyNow.jsx";
const RouterShow = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  // const { name } = user;
  // console.log(name);
  const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/admin", element: <Adminpanel /> },
        { path: "/", element: <ProductsContainer /> },
        { path: "/singleProduct/:id", element: <SingleProduct /> },
        { path: "/wishlist", element: <WishList /> },
        { path: "/addtocart", element: <AddToCart /> },
        { path: "/checkout", element: <BuyNow /> },
      ],
    },
  ]);
  useEffect(() => {
    dispatch(isCurrentUser());
  }, []);
  return <RouterProvider router={router} />;
};
export default RouterShow;
