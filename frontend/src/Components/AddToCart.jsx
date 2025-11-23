import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../utility/ProductSlice";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { isCurrentUser, updateCartQuantity } from "../utility/UserSLice";
import { useNavigate } from "react-router-dom";
const AddToCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthLoading } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(isCurrentUser());
    dispatch(getAllProducts());
  }, [dispatch]);
  const { productList, isLoading } = useSelector((state) => state.products);
  const { Cart } = user;
  if (isAuthLoading || isLoading || !Cart) {
    <div className="container-fluid text-center py-5">
      <h2>Loading...</h2>
    </div>;
  }
  if (Cart.length === 0) {
    return <h2>Your Cart is Empty</h2>;
  }
  console.log(user);
  const cartItems = Cart.map((Item) => {
    const { productId, quantity } = Item;
    const product = productList.find((prod) => prod.id === productId);
    if (product) {
      return { ...product, quantity };
    }
    return null;
  }).filter(Boolean);
  console.log(cartItems);
  const removeFromCart = (id) => {
    dispatch(updateCartQuantity({ productId: id, quantity: 0 }));
  };
  const incQuantity = (id, quantity) => {
    dispatch(updateCartQuantity({ productId: id, quantity: quantity + 1 }));
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
  const emptyCart = () => {
    // Logic to empty the cart
  };
  return (
    <>
      <div className="container-fuild">
        <div className="card shadow-lg border-0">
          <div className="card-header bg-primary text-white">
            <div className="d-flex align-items-center">
              <i className="bi bi-cart-fill fs-1 me-3"></i>
              <div>
                <h2 className="mb-0">Shopping Cart</h2>
                <p className="mb-0 opacity-75">
                  Review your items before checkout
                </p>
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
                        alt=""
                      />
                    </div>
                    <div className="col">
                      <h5 className="card-title mb-1">{item.title}</h5>
                      <h4 className="text-primary fw-bold mb-0">
                        ${item.price.toFixed(2)}
                      </h4>
                    </div>
                    <div
                      className="col-auto border"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <div className="btn-group me-2">
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => decQuantity(item.id, item.quantity)}
                        >
                          <FaMinus className="mb-1" />
                        </button>
                        <button
                          className="btn btn-outline-secondary"
                          style={{
                            minWidth: "60px",
                            pointerEvents: "none",
                          }}
                        >
                          {item.quantity}
                        </button>
                        <button
                          className="btn btn-outline-success"
                          onClick={() => incQuantity(item.id, item.quantity)}
                          disabled={item.quantity >= item.minimumOrderQuantity}
                        >
                          <FaPlus className="mb-1" />
                        </button>
                      </div>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeFromCart(item.id)}
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
              <h3 className="mb-0">Total:</h3>
              <h2 className="mb-0 text-primary fw-bold">${totalPrice}</h2>
            </div>
            <button
              className="btn btn-primary btn-lg w-100 py-3"
              onClick={emptyCart}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddToCart;
