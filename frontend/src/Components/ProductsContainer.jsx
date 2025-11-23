import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Products from "./Products.jsx";
import { getAllProducts } from "../utility/ProductSlice.js";
const ProductsContainer = () => {
  const dispatch = useDispatch();

  const { productList } = useSelector((state) => state.products);
  const { isloading: userIsLoading } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (userIsLoading) {
    return (
      <div className="container text-center py-5">
        <h2>Loading...</h2>
      </div>
    );
  }
  return (
    <div className="container-fluid ">
      <div className="row mt-2">
        {productList.map((elm, ind) => (
          <Products key={ind} elm={elm} />
        ))}
      </div>
    </div>
  );
};

export default ProductsContainer;
