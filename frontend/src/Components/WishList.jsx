import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../utility/ProductSlice";
import { addToCart, addToWishlist } from "../utility/UserSLice.js";
import { useNavigate } from "react-router-dom";
const WishList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthLoading } = useSelector((state) => state.users);
  const { productList, isLoading } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  const { wishlist } = user;
  if (isAuthLoading && wishlist.length === 0) {
    if (isLoading) {
      return (
        <div className="container-fluid text-center py-5">
          <h2>Loading...</h2>
        </div>
      );
    }
  }
  console.log(user);
  const wishlistedProducts = productList.filter((product) =>
    wishlist.includes(product.id)
  );
  console.log(wishlistedProducts);
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
    <div className="container-fluid py-2">
      <div className="card shadow-lg border-0">
        <div
          className="card-header text-white p-4"
          style={{
            background: "linear-gradient(135deg, #e91e63 0%, #f06292 100%)",
          }}
        >
          <div className="d-flex align-items-center">
            <i className="bi bi-heart-fill fs-1 me-3"></i>
            <div>
              <h2 className="mb-0">My Wishlist</h2>
              <p className="mb-0 opacity-75">Save items you love for later</p>
            </div>
          </div>
        </div>
        <div className="card-body p-4">
          {wishlistedProducts.map((product) => (
            <div
              key={product.id}
              className="card item-card mb-3 border border-black"
              onClick={() => {
                navigate(`/singleProduct/${product.id}`);
              }}
            >
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <img
                      src={product.thumbnail}
                      style={{ height: "8vh" }}
                      alt=""
                    />
                  </div>
                  <div className="col">
                    <h5 className="card-title mb-1">{product.title}</h5>
                    <h4 className="text-danger fw-bold mb-0">
                      ${product.price.toFixed(2)}
                    </h4>
                  </div>
                  <div className="col-auto">
                    <button
                      className="btn btn-primary me-2"
                      onClick={(e) => MoveToCart(e, product)}
                    >
                      <i className="bi bi-cart-plus"></i> Add to Cart
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => removeFromWishlist(e, product)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default WishList;
