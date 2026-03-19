import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleProducts, addReview } from "../utility/ProductSlice";
import { addToWishlist, addToCart } from "../utility/UserSLice";
import { useDispatch, useSelector } from "react-redux";
import {
  IoArrowBackOutline,
  IoArrowForwardOutline,
  IoStar,
} from "react-icons/io5";
import { FaHeart, FaMinus, FaPlus, FaRegHeart } from "react-icons/fa";
import Loader from "./Loader";
import {useWishlist} from "../utility/customHooks"
export default function ProductDetailsPage() {
  const [quantity, setQuantity] = useState(1);
  const [newReview, setNewReview] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isloading: userIsLoading } = useSelector(
    (state) => state.users,
  );    
  const { product, isLoading: productIsLoading } = useSelector(
    (state) => state.products,
  );
  const { wishlist } = useWishlist();
  useEffect(() => {
    dispatch(getSingleProducts(id));
  }, [id]);
  const isWishlisted = wishlist.includes(Number(id));
  const handleWishlist = () => {
    if (!user?._id) {
      return navigate("/login");
    }
    if(!isWishlisted){
      navigate("/wishlist");
    } 
    dispatch(addToWishlist(id));
  };
  const handlePostReview = async () => {
    if (!user?._id) {
      return navigate("/login");
    }
    if (userRating === 0) {
      alert("Please select a star rating.");
      return;
    }
    if (!newReview.trim()) {
      alert("Please write a comment.");
      return;
    }
    await dispatch(
      addReview({
        id: id,
        comment: newReview,
        rating: userRating,
        reviewerName: user.name,
        reviewerEmail: user.email,
      }),
    );
    setNewReview("");
    setUserRating(0);
    dispatch(getSingleProducts(id));
  };
  const [currentImage, setCurrentImage] = useState(0);

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    if (!user?._id) {
      return navigate("/login");
    }
    navigate("/addtocart");
    dispatch(addToCart({ productId: id, quantity: quantity }));
    setQuantity(1);
  };
  const handleBuyNow = () => {
    if (!user?._id) {
      return navigate("/login");
    }
    navigate("/checkout", {
      state: {
        product: product,
        quantity: quantity,
      },
    });
    setQuantity(1);
  };
  if (userIsLoading || productIsLoading || !product.title) {
    return <Loader message="LOADING PRODUCT DETAILS..." />;
  }
  const {
    rating,
    title,
    description,
    price,
    images,
    stock,
    brand,
    warrantyInformation,
    minimumOrderQuantity,
    reviews,
  } = product;
  return (
    <div className="bg-white min-h-[calc(100vh-64px)]">
      <div className="max-w-6xl mx-auto p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* IMAGE SECTION (Left Column) */}
          <div className="relative w-full aspect-square border border-zinc-200 bg-zinc-50 p-6 flex flex-col items-center justify-center group overflow-hidden">
             {/* IMAGE CONTAINER */}
             <div className="w-full h-full flex items-center justify-center relative z-10">
               <img
                 src={images?.[currentImage]}
                 alt={`Product ${currentImage + 1}`}
                 className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
               />
             </div>

             {/* WISHLIST (Ghost Button) */}
             <button
               onClick={handleWishlist}
               className="absolute top-6 right-6 z-20 bg-transparent text-2xl transition-colors focus:outline-none focus:scale-110 active:scale-95"
             >
               {isWishlisted ? (
                 <FaHeart className="text-red-500 hover:text-red-600 transition-colors" />
               ) : (
                 <FaRegHeart className="text-zinc-400 hover:text-red-500 transition-colors" />
               )}
             </button>

             {/* PREV MULTIPLE IMAGES */}
             {images?.length > 1 && (
               <>
                 <button
                   onClick={prevImage}
                   className="hidden md:flex absolute left-4 z-20 top-1/2 -translate-y-1/2 w-10 h-10 border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 items-center justify-center transition-colors rounded-none opacity-0 group-hover:opacity-100"
                 >
                   <IoArrowBackOutline className="text-xl text-zinc-600" />
                 </button>

                 <button
                   onClick={nextImage}
                   className="hidden md:flex absolute right-4 z-20 top-1/2 -translate-y-1/2 w-10 h-10 border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 items-center justify-center transition-colors rounded-none opacity-0 group-hover:opacity-100"
                 >
                   <IoArrowForwardOutline className="text-xl text-zinc-600" />
                 </button>
               </>
             )}
          </div>

          {/* PRODUCT DETAILS (Right Column) */}
          <div className="flex flex-col">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-zinc-900 tracking-tight leading-tight mb-4">
              {title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-0.5">
               {[...Array(5)].map((_, i) => (
                  <IoStar
                    key={i}
                    className={`text-[15px] ${
                      i < Math.floor(rating || 0)
                        ? "text-zinc-900"
                        : "text-zinc-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-zinc-500 tracking-wider">
                {rating?.toFixed(1) || "0.0"} / 5.0
              </span>
            </div>

            {/* Price */}
            <h2 className="text-3xl font-bold text-zinc-900 mb-6 font-mono tracking-tight">${price?.toFixed(2)}</h2>

            {/* Description */}
            <p className="text-zinc-500 text-[15px] leading-relaxed mb-8">
              {description}
            </p>

            <div className="border-b border-zinc-200 w-full mb-8"></div>

            {/* Quantity */}
            <div className="mb-8">
              <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Quantity</h4>
              <div className="inline-flex items-center border border-zinc-300 rounded-none bg-white">
                <button
                  onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                  className="w-12 h-12 flex items-center justify-center text-zinc-500 hover:text-purple-600 hover:bg-zinc-50 transition-colors focus:outline-none"
                >
                  <FaMinus size={12} />
                </button>
                <div className="w-14 h-12 flex items-center justify-center text-sm font-bold text-zinc-900 border-x border-zinc-300">
                  {quantity}
                </div>
                <button
                  onClick={() =>
                    setQuantity((q) =>
                      q < minimumOrderQuantity ? q + 1 : minimumOrderQuantity,
                    )
                  }
                  className="w-12 h-12 flex items-center justify-center text-zinc-500 hover:text-purple-600 hover:bg-zinc-50 transition-colors focus:outline-none"
                >
                  <FaPlus size={12} />
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 mb-12">
              <button
                onClick={handleAddToCart}
                className="w-full bg-zinc-900 text-white py-5 rounded-none font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors shadow-sm focus:outline-none"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full bg-purple-600 text-white py-5 rounded-none font-bold uppercase tracking-widest hover:bg-purple-700 transition-colors shadow-sm focus:outline-none"
              >
                Buy Now
              </button>
            </div>

            {/* DETAILS ACCORDION-STYLE BLOCKS */}
            <div className="space-y-6 mb-12">
               <div>
                  <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-widest border-b border-zinc-200 pb-2 mb-3">Product Specifications</h3>
                  <div className="grid grid-cols-2 gap-y-3 text-sm">
                    <div className="text-zinc-500">Brand</div>
                    <div className="font-semibold text-zinc-900 text-right">{brand || "Generic"}</div>
                    
                    <div className="text-zinc-500">Warranty</div>
                    <div className="font-semibold text-zinc-900 text-right">{warrantyInformation || "Standard 1 Year"}</div>
                    
                    <div className="text-zinc-500">Availability</div>
                    <div className="font-semibold text-zinc-900 text-right">{stock > 0 ? `${stock} in stock` : "Out of stock"}</div>
                  </div>
               </div>
            </div>

            {/* REVIEWS SECTION */}
            <div className="pt-6 border-t border-zinc-200">
              <h3 className="text-xl font-bold text-zinc-900 tracking-tight mb-8">Customer Reviews</h3>

              {/* Review Form */}
              <div className="bg-zinc-50 border border-zinc-200 p-6 mb-10">
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Write a Review</h4>
                
                <div className="mb-5">
                  <p className="text-[13px] font-semibold text-zinc-700 mb-2">Select Rating</p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, index) => {
                      const value = index + 1;
                      return (
                        <IoStar
                          key={index}
                          onClick={() => setUserRating(value)}
                          onMouseEnter={() => setHoverRating(value)}
                          onMouseLeave={() => setHoverRating(0)}
                          className={`text-2xl cursor-pointer transition-colors ${
                            value <= (hoverRating || userRating)
                              ? "text-zinc-900"
                              : "text-zinc-300 hover:text-zinc-400"
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="mb-5">
                   <p className="text-[13px] font-semibold text-zinc-700 mb-2">Your Experience</p>
                   <textarea
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    placeholder="Share your thoughts on this product..."
                    rows={4}
                    className="w-full border border-zinc-300 rounded-none px-4 py-3 text-sm focus:outline-none focus:border-zinc-900 focus:ring-0 bg-white resize-none transition-colors placeholder:text-zinc-400"
                  />
                </div>
               
                <button
                  onClick={handlePostReview}
                  className="bg-zinc-900 text-white px-8 py-3.5 rounded-none font-bold text-xs uppercase tracking-widest hover:bg-zinc-800 transition-colors shadow-sm focus:outline-none"
                >
                  Post Review
                </button>
              </div>

              {/* Reviews List */}
              <div className="space-y-0">
                {Array.isArray(reviews) && reviews.length > 0 ? (
                  reviews.map((elm, idx) => (
                    <div key={`${elm.reviewerEmail}-${idx}`} className="border-b border-zinc-200 py-6 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                         <p className="font-bold text-zinc-900 text-[15px]">{elm.reviewerName}</p>
                         <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                          {elm.date ? new Date(elm.date).toLocaleDateString() : "Just now"}
                        </p>
                      </div>
                      
                      <div className="flex gap-0.5 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <IoStar
                            key={i}
                            className={`text-sm ${
                              i < Math.floor(elm.rating)
                                ? "text-zinc-900"
                                : "text-zinc-200"
                            }`}
                          />
                        ))}
                      </div>
                      
                      <p className="text-sm text-zinc-600 leading-relaxed">{elm.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-zinc-500 italic py-4">No reviews yet. Be the first to share your thoughts!</p>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
