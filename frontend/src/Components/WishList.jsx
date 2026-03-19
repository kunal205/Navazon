import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart, addToWishlist } from "../utility/UserSLice.js";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import {useAuth,useProduct,useWishlist} from "../utility/customHooks"
const WishList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user,isAuthLoading } = useAuth();  
  const { productList, isLoading } = useProduct();

  const { wishlist } = useWishlist();  

  if (isAuthLoading && wishlist.length === 0) {
    if (isLoading) {
      return <Loader message="LOADING WISHLIST..." />;
    }
  }

  const wishlistedProducts = productList.filter((product) =>
    wishlist.includes(product.id),
  );

  const MoveToCart = async (e, product) => {
    e.stopPropagation();
    await dispatch(addToCart({ productId: product.id, quantity: 1 })).unwrap();
    dispatch(addToWishlist(product.id));
  };

  const removeFromWishlist = (e, product) => {
    e.stopPropagation();
    dispatch(addToWishlist(product.id));
  };

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-12 md:py-20 min-h-[calc(100vh-64px)]">
      {/* Header */}
      <div className="mb-12 border-b border-zinc-200 pb-6">
        <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Wishlist</h2>
        <p className="text-sm text-zinc-500 mt-2">
          Saved items for later review
        </p>
      </div>

      {/* Body */}
      {wishlistedProducts.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-zinc-300 bg-zinc-50">
          <p className="text-zinc-500 mb-6">Your wishlist is currently empty.</p>
          <button 
            onClick={() => navigate('/')} 
            className="text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors uppercase tracking-widest"
          >
            Explore Products
          </button>
        </div>
      ) : (
        <div className="flex flex-col">
          {wishlistedProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/singleProduct/${product.id}`)}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-6 border-b border-zinc-200 hover:bg-zinc-50 transition-colors cursor-pointer group"
            >
              {/* Product Info Left */}
              <div className="flex items-center gap-6">
                {/* Image */}
                <div className="w-24 h-24 bg-zinc-100 p-0 flex-shrink-0">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full aspect-square object-cover rounded-none group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col">
                  <h5 className="font-semibold text-zinc-900 text-base max-w-sm truncate">{product.title}</h5>
                  <p className="text-zinc-500 text-sm mt-1 mb-2 max-w-sm truncate">{product.description}</p>
                  <p className="text-zinc-900 font-bold text-lg">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Actions Right */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 mt-4 sm:mt-0 w-full sm:w-auto" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={(e) => MoveToCart(e, product)}
                  className="px-6 py-2.5 bg-zinc-900 hover:bg-purple-600 text-white rounded-none text-xs font-bold uppercase tracking-widest transition-colors shadow-sm"
                >
                  Add to Cart
                </button>

                <button
                  onClick={(e) => removeFromWishlist(e, product)}
                  className="text-sm font-medium text-zinc-500 hover:text-red-600 transition-colors focus:outline-none"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;
