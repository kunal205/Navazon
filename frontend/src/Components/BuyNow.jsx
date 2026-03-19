import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";
import Loader from "./Loader";
import { deliveredOrder } from "../utility/UserSLice";
import { useDispatch } from "react-redux";
import {useAuth} from "../utility/customHooks"
const BuyNow = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [deliveryOption, setDeliveryOption] = useState("saved");
  const [giftDetails, setGiftDetails] = useState({
    recipientName: "",
    recipientAddress: "",
    message: "",
  });

  useEffect(() => {
    if (location.state && location.state.product) {
      const { product, quantity } = location.state;
      setCartItems([{ ...product, quantity: quantity || 1 }]);
    }
  }, [location.state]);

  const incQuantity = (id, quantity, minOrder) => {
    if (minOrder && quantity >= minOrder) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decQuantity = (id, quantity) => {
    if (quantity <= 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const totalPrice = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  const placeOrder = (e) => {
    e.preventDefault();
    const orderId = Math.floor(Math.random() * 1000000000).toString();
    const items = cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));
    dispatch(deliveredOrder({ 
      items,
      orderId: orderId,
        status: "delivered",
        deliveredDate: new Date().toISOString(), 
        bill: totalPrice
      }));
    if (!user?._id) {
      return navigate("/login");
    }
    navigate("/");
  };

  if (!location.state) {
    return <Loader message="PREPARING CHECKOUT..." />;
  }
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-20 min-h-[calc(100vh-64px)]">
      {/* Header */}
      <div className="mb-12 border-b border-zinc-200 pb-6">
        <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Checkout</h2>
        <p className="text-sm text-zinc-500 mt-2">
          Review your order and complete payment
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        {/* Left Column: Items List & Delivery Selection */}
        <div className="flex-1 w-full space-y-12">
          
          <div className="border-t border-zinc-200 pt-2">
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
                    <h5 className="font-semibold text-zinc-900 text-base max-w-[200px] md:max-w-xs xl:max-w-sm truncate">{item.title}</h5>
                    <p className="text-zinc-500 text-sm mt-1 mb-2 max-w-[200px] md:max-w-xs xl:max-w-md truncate">{item.description}</p>
                    <p className="text-zinc-900 font-bold text-[15px]">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Right Details: Qty Adjuster */}
                <div
                  className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8 w-full sm:w-auto mt-4 sm:mt-0"
                  onClick={(e) => e.stopPropagation()}
                >
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
                      onClick={() => incQuantity(item.id, item.quantity, item.minimumOrderQuantity)}
                      disabled={item.minimumOrderQuantity && item.quantity >= item.minimumOrderQuantity}
                    >
                      <FaPlus size={10} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <section>
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6 border-b border-zinc-200 pb-2">
              Delivery Selection
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Option A */}
              <div 
                onClick={() => setDeliveryOption("saved")}
                className={`cursor-pointer border p-6 transition-colors duration-200 ${deliveryOption === "saved" ? "border-zinc-900 bg-zinc-50" : "border-zinc-200 hover:border-zinc-300 bg-white"}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors duration-200 ${deliveryOption === "saved" ? "border-zinc-900 bg-zinc-900" : "border-zinc-300"}`}>
                    {deliveryOption === "saved" && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>}
                  </div>
                  <span className="font-bold text-zinc-900 text-[15px]">Deliver to saved address</span>
                </div>
                <p className="text-[13px] text-zinc-500 ml-7 leading-relaxed flex flex-col space-y-0.5">
                  <span className="font-medium text-zinc-700">Kunal</span>
                  <span>123 Main St, Sector 15</span>
                  <span>Faridabad, Haryana 121001</span>
                </p>
              </div>

              {/* Option B */}
              <div 
                onClick={() => setDeliveryOption("gift")}
                className={`cursor-pointer border p-6 transition-colors duration-200 ${deliveryOption === "gift" ? "border-zinc-900 bg-zinc-50" : "border-zinc-200 hover:border-zinc-300 bg-white"}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors duration-200 ${deliveryOption === "gift" ? "border-zinc-900 bg-zinc-900" : "border-zinc-300"}`}>
                    {deliveryOption === "gift" && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>}
                  </div>
                  <span className="font-bold text-zinc-900 text-[15px]">Gift to someone</span>
                </div>
                <p className="text-[13px] text-zinc-500 ml-7 mt-2 leading-relaxed">
                  Send this order directly to a recipient with a custom message.
                </p>
              </div>

            </div>

            {/* Gift Form (Conditional) */}
            {deliveryOption === "gift" && (
              <div className="mt-4 border border-zinc-200 bg-zinc-50 p-6 rounded-none animate-[fadeIn_0.3s_ease-out]">
                <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest mb-4">Gift Details</h4>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Recipient's Name"
                    value={giftDetails.recipientName}
                    onChange={(e) => setGiftDetails({...giftDetails, recipientName: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-zinc-300 rounded-none text-zinc-900 text-sm focus:outline-none focus:bg-white focus:border-zinc-900 focus:ring-0 transition-colors placeholder:text-zinc-400"
                  />
                  <input
                    type="text"
                    placeholder="Recipient's Address"
                    value={giftDetails.recipientAddress}
                    onChange={(e) => setGiftDetails({...giftDetails, recipientAddress: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-zinc-300 rounded-none text-zinc-900 text-sm focus:outline-none focus:bg-white focus:border-zinc-900 focus:ring-0 transition-colors placeholder:text-zinc-400"
                  />
                  <textarea
                    placeholder="Write a special note..."
                    rows={3}
                    value={giftDetails.message}
                    onChange={(e) => setGiftDetails({...giftDetails, message: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-zinc-300 rounded-none text-zinc-900 text-sm focus:outline-none focus:bg-white focus:border-zinc-900 focus:ring-0 transition-colors placeholder:text-zinc-400 resize-none"
                  />
                </div>
              </div>
            )}
          </section>

        </div>

        {/* Right Column: Order Summary */}
        <div className="w-full lg:w-[400px] flex-shrink-0 bg-zinc-50 border border-zinc-200 p-8 sticky top-24">
           
           <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6 border-b border-zinc-200 pb-4">
             Order Summary
           </h3>
           <div className="space-y-4 mb-8">
             <div className="flex justify-between items-center text-sm">
               <span className="text-zinc-600">Subtotal ({cartItems.length} items)</span>
               <span className="font-semibold text-zinc-900">${totalPrice}</span>
             </div>
             <div className="flex justify-between items-center text-sm">
               <span className="text-zinc-600">Shipping</span>
               <span className="font-semibold text-zinc-900">Free</span>
             </div>
             <div className="flex justify-between items-center text-sm">
               <span className="text-zinc-600">Taxes</span>
               <span className="font-semibold text-zinc-900">$0.00</span>
             </div>

             <div className="border-t border-zinc-200 pt-4 mt-4">
               <div className="flex justify-between items-baseline">
                 <span className="font-bold text-zinc-900 text-base">Total</span>
                 <span className="font-bold text-2xl text-purple-600">${totalPrice}</span>
               </div>
             </div>
           </div>

           {/* Massive Place Order CTA */}
           <button
              onClick={(e)=>placeOrder(e,cartItems)}
              className="w-full bg-purple-600 hover:bg-zinc-900 text-white py-5 font-bold uppercase tracking-widest transition-colors duration-300 rounded-none shadow-sm"
           >
              Buy
           </button>
           
           <div className="mt-6 flex items-center justify-center gap-2 text-zinc-400">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
             <p className="text-xs">256-bit Encrypted Checkout</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
