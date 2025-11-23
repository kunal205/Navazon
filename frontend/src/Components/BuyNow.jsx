import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

const BuyNow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (location.state && location.state.product) {
      const { product, quantity } = location.state;
      setCartItems([{ ...product, quantity: quantity || 1 }]);
    }
  }, [location.state]);

  const incQuantity = (e, id) => {
    e.stopPropagation();
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          if (
            item.minimumOrderQuantity &&
            item.quantity >= item.minimumOrderQuantity
          ) {
            return item;
          }
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };
  const decQuantity = (e, id) => {
    e.stopPropagation();
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };
  const removeFromCart = (e, id) => {
    e.stopPropagation();
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  const totalPrice = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);
  const placeOrder = () => {
    alert("Proceeding to Payment Gateway...");
  };

  if (cartItems.length === 0) {
    return (
      <div className="container text-center py-5">
        <h2>Your Buy Now list is empty</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    );
  }
  return (
    <div className="container-fluid">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-success text-white">
          <div className="d-flex align-items-center">
            <i className="bi bi-lightning-fill fs-1 me-3"></i>
            <div>
              <h2 className="mb-0">Buy Now</h2>
              <p className="mb-0 opacity-75">Instant Checkout</p>
            </div>
          </div>
        </div>
        <div className="card-body p-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="card item-card mb-3 border"
              onClick={() => navigate(`/singleProduct/${item.id}`)}
            >
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <img
                      className="user-select-none"
                      src={item.thumbnail}
                      style={{ height: "8vh" }}
                      alt={item.title}
                    />
                  </div>
                  <div className="col">
                    <h5 className="card-title mb-1">{item.title}</h5>
                    <h4 className="text-primary fw-bold mb-0">
                      ${item.price.toFixed(2)}
                    </h4>
                  </div>
                  <div className="col-auto">
                    <div
                      className="btn-group me-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="btn btn-outline-danger"
                        onClick={(e) => decQuantity(e, item.id)}
                      >
                        <FaMinus className="mb-1" />
                      </button>
                      <button
                        className="btn btn-outline-secondary"
                        style={{ minWidth: "60px", pointerEvents: "none" }}
                      >
                        {item.quantity}
                      </button>
                      <button
                        className="btn btn-outline-success"
                        onClick={(e) => incQuantity(e, item.id)}
                        disabled={item.quantity >= item.minimumOrderQuantity}
                      >
                        <FaPlus className="mb-1" />
                      </button>
                    </div>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => removeFromCart(e, item.id)}
                    >
                      <FaTrash className="mb-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <hr className="my-4" />
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="mb-0">Total To Pay:</h3>
            <h2 className="mb-0 text-success fw-bold">${totalPrice}</h2>
          </div>
          <button
            className="btn btn-success btn-lg w-100 py-3"
            onClick={placeOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
