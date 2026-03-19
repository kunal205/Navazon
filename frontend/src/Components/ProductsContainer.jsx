import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Products from "./Products.jsx";
import Loader from "./Loader.jsx";
const ProductsContainer = () => {
  const { productList } = useSelector((state) => state.products);
  const { user,isloading: userIsLoading } = useSelector((state) => state.users);
  if (userIsLoading) {
    return (
      <Loader message="LOADING COLLECTION..." />
    );
  }
  return (
    <div className="max-w-screen-2xl mx-auto px-8 py-20">
      <div className="flex items-center justify-between mb-12 border-b border-black/10 pb-6">
       
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
        {productList.map((elm, ind) => (
          <Products key={ind} elm={elm} />
        ))}
      </div>
    </div>
  );  
};

export default ProductsContainer;
