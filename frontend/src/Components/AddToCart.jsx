import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FaMinus, FaPlus } from "react-icons/fa";
import { deliveredOrder, updateCartQuantity } from "../utility/UserSLice";
import { useNavigate } from "react-router-dom";
import {useAuth,useCart,useProduct} from "../utility/customHooks"
const AddToCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user,  isAuth} = useAuth();
  const { Cart } = useCart();
  const { productList } = useProduct();
  if (!Cart || Cart.length === 0) {
    return (
      <div className="max-w-[1000px] mx-auto px-6 py-20 min-h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center">
        <div className="p-10 border border-dashed border-zinc-300 bg-zinc-50 w-full max-w-2xl">
          <h2 className="text-xl font-bold text-zinc-900 mb-2 tracking-tight">Your Cart is Empty</h2>
          <p className="text-zinc-500 mb-8">It looks like you haven't added anything to your cart yet.</p>
          <button 
            className="bg-zinc-900 text-white px-8 py-3.5 text-sm font-bold uppercase tracking-widest hover:bg-purple-600 transition-colors rounded-none" 
            onClick={() => navigate("/")}
          >
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  const cartItems = Cart.map((Item) => {
    const { productId, quantity } = Item;
    const product = productList.find((prod) => prod.id === productId);
    if (product) {
      return { ...product, quantity };
    }
    return null;
  }).filter(Boolean);

  const removeFromCart = (id) => {
    dispatch(updateCartQuantity({ productId: id, quantity: 0 }));
  };

  const incQuantity = (id, quantity) => {
    return dispatch(updateCartQuantity({ productId: id, quantity: quantity + 1 }));
  };

  const decQuantity = (id, quantity) => {
    dispatch(updateCartQuantity({ productId: id, quantity: quantity - 1 }));
  };

  const totalPrice = cartItems
    .reduce((total, item) => {
      const price = item.price;
      const qty = item.quantity;
      return total + price * qty;
    }, 0)
    .toFixed(2);

  const emptyCart = (cartItems, e) => {
    e.preventDefault();
  if (!user?._id) {
    return navigate("/login");
  }
  navigate("/");
    const sharedOrderId = Math.floor(Math.random() * 1000000000).toString();
    const items = cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));
    dispatch(deliveredOrder({
      items,
      orderId: sharedOrderId,
      status: "delivered",
      deliveredDate: new Date().toISOString(),
      bill: totalPrice,
    }));
    dispatch(updateCartQuantity({ productId: id, quantity: 0 })); 
    
  };

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-12 md:py-20 min-h-[calc(100vh-64px)]">
      {/* Header */}
      <div className="mb-12 border-b border-zinc-200 pb-6">
        <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Shopping Cart</h2>
        <p className="text-sm text-zinc-500 mt-2">
          Review your items before checkout
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Cart Items List */}
        <div className="flex-1 w-full space-y-0 border-t border-zinc-200">
          {cartItems.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/singleProduct/${item.id}`)}
              className="flex flex-col sm:flex-row sm:items-center py-6 border-b border-zinc-200 gap-6 cursor-pointer group hover:bg-zinc-50 transition-colors"
            >
              {/* Left Details */}
              <div className="flex items-center gap-6 flex-1">
                <div className="w-24 h-24 bg-zinc-100 p-0 flex-shrink-0">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full aspect-square object-cover rounded-none group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="flex flex-col">
                  <h5 className="font-semibold text-zinc-900 text-base max-w-[200px] md:max-w-xs truncate">{item.title}</h5>
                  <p className="text-zinc-500 text-sm mt-1 mb-2 max-w-[200px] md:max-w-xs truncate">{item.description}</p>
                  <p className="text-zinc-900 font-bold text-lg">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Right Controls */}
              <div
                className="flex items-center gap-6 sm:gap-10 mt-4 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Quantity Box */}
                <div className="flex items-center border border-zinc-300 rounded-none bg-white">
                  <button
                    className="w-9 h-9 flex items-center justify-center text-zinc-500 hover:text-purple-600 hover:bg-zinc-50 transition-colors disabled:opacity-40"
                    onClick={() => decQuantity(item.id, item.quantity)}
                    disabled={item.quantity <= 1}
                  >
                    <FaMinus size={10} />
                  </button>

                  <span className="w-9 h-9 flex items-center justify-center text-sm font-bold text-zinc-900 border-x border-zinc-300">
                    {item.quantity}
                  </span>

                  <button
                    className="w-9 h-9 flex items-center justify-center text-zinc-500 hover:text-purple-600 hover:bg-zinc-50 transition-colors disabled:opacity-40"
                    onClick={() => incQuantity(item.id, item.quantity)}
                    disabled={item.quantity >= item.minimumOrderQuantity}
                  >
                    <FaPlus size={10} />
                  </button>
                </div>

                {/* Remove Text Link */}
                <button
                  className="text-sm font-medium text-zinc-500 hover:text-red-600 transition-colors focus:outline-none"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        {cartItems.length > 0 && (
          <div className="w-full lg:w-80 bg-zinc-50 border border-zinc-200 p-8 flex-shrink-0 sticky top-24">
            <h3 className="text-lg font-bold text-zinc-900 mb-6 tracking-tight">Order Summary</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-600">Subtotal ({cartItems.length} items)</span>
                <span className="font-semibold text-zinc-900">${totalPrice}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-600">Shipping</span>
                <span className="font-semibold text-zinc-900 max-w-[120px] text-right">Calculated at checkout</span>
              </div>
            </div>

            <div className="border-t border-zinc-200 pt-6 mb-8">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-zinc-900 text-base">Total</span>
                <span className="font-bold text-2xl text-purple-600">${totalPrice}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={(e)=>{emptyCart(cartItems,e)}}
              className="w-full bg-zinc-900 hover:bg-purple-600 text-white text-sm py-4 font-bold uppercase tracking-widest transition-colors rounded-none shadow-sm"
            >
              Checkout
            </button>
             <p className="text-xs text-center text-zinc-400 mt-4">Secure Checkout Powered by Navazon</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddToCart;
