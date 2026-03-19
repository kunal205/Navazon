import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import ProductsContainer from "../Components/ProductsContainer.jsx";
import Adminpanel from "../Components/AdminPanel.jsx";
import SingleProduct from "../Components/SingleProduct.jsx";
import WishList from "../Components/WishList.jsx";
import AddToCart from "../Components/AddToCart.jsx";
import BuyNow from "../Components/BuyNow.jsx";
import Profile from "../Components/Profile.jsx";
import Search from "../Components/Search.jsx";
import AddProduct from "../Components/AddProduct.jsx";

const RouterShow = () => {
  // const { name } = user;
  const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <ProductsContainer /> },
        { path: "/admin", element: <Adminpanel /> },
        { path: "/singleProduct/:id", element: <SingleProduct /> },
        { path: "/wishlist", element: <WishList /> },
        { path: "/addtocart", element: <AddToCart /> },
        { path: "/checkout", element: <BuyNow /> },
        { path: "/profile", element: <Profile /> },
        { path: "/search", element: <Search /> },
        { path: "/addproduct", element: <AddProduct /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
export default RouterShow;
