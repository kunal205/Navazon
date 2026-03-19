import React from "react";
import { IoStar } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, addToWishlist } from "../utility/UserSLice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {useWishlist} from "../utility/customHooks"
const Products = ({
  elm: { title, thumbnail, rating, id, price, discountPercentage },
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const handleWishlist = (e) => {
    e.stopPropagation();
    if (!user?._id) {
      return navigate("/login");
    }
    dispatch(addToWishlist(id));
  };

  const handleAddCart = (e) => {
    e.stopPropagation();
    if (!user?._id) {
      return navigate("/login");
    }
    navigate("/addtocart");
    dispatch(addToCart({ productId: id, quantity: 1 }));
  };

  const discountedPrice = () => {
    const newPrice = price - (price * discountPercentage) / 100;
    return newPrice.toFixed(2);
  };
  return (
    <div
      onClick={() => navigate(`/singleProduct/${id}`)}
      className="group relative bg-white border border-black/10 hover:border-black/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-500 cursor-pointer flex flex-col overflow-hidden rounded-none"
    >
      {/* Wishlist */}
       <button
                     onClick={handleWishlist}
                       className="absolute top-6 right-6 z-20 bg-transparent text-2xl transition-colors focus:outline-none focus:scale-110 active:scale-95"
                   >
                     {wishlist.includes(id) ? (
                       <FaHeart className="text-red-500 hover:text-red-600 transition-colors" />
                     ) : (
                       <FaRegHeart className="text-zinc-400 hover:text-red-500 transition-colors" />
                     )}
                   </button>
      
      {/* Image Gallery Container */}
      <div className="aspect-square bg-gray-50 flex items-center justify-center p-8 relative overflow-hidden border-b border-black/10">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      </div>

      {/* Body */}
      <div className="flex flex-col px-6 py-6 flex-1 bg-transparent">
        {/* Title */}
        <h5 className="text-[16px] font-medium text-zinc-900 truncate mb-3" title={title}>
          {title}
        </h5>

        {/* Rating & Stock */}
        <div className="flex items-center gap-2 mb-4">
          <span className="flex items-center gap-1.5 bg-black/5 text-zinc-700 text-[11px] font-medium px-2.5 py-1 tracking-widest border border-black/5">
            {rating}
            <IoStar size={12} className="text-cyan-500" />
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto mb-6">
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="font-bold text-[24px] text-zinc-900 tracking-tight">
              ${discountedPrice()}
            </span>
            {discountPercentage > 0 && (
              <>
                <span className="text-[14px] text-zinc-400 line-through decoration-zinc-300">${price}</span>
                <span className="text-[11px] font-bold text-cyan-700 bg-cyan-50 border border-cyan-200 px-2 py-1 tracking-wide">
                  {Math.round(discountPercentage)}% OFF
                </span>
              </>
            )}
          </div>
        </div>

        {/* Add button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddCart(e);
          }}
          className="w-full bg-cyan-500 hover:bg-cyan-400 text-white text-[14px] py-3.5 font-bold tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] border border-transparent hover:border-cyan-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Products;
