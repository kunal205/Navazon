import React from "react";
import { IoStar } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, addToWishlist } from "../utility/UserSLice";

const Products = ({
  elm: { title, thumbnail, rating, id, price, discountPercentage },
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();

  // guard if user or wishlist missing
  const wishlist = user?.wishlist ?? [];

  const handleWishlist = (e) => {
    e.stopPropagation();
    dispatch(addToWishlist(id));
  };
  const handleAddCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ productId: id, quantity: 1 }));
  };
  const discountedPrice = () => {
    const newPrice = price - (price * discountPercentage) / 100;
    return newPrice.toFixed(2);
  };

  return (
    <div
      className="col-6 col-sm-6 col-md-4 col-lg-3 my-2 my-md-3"
      style={{ cursor: "pointer" }}
    >
      <div
        className="items card h-100 text-center"
        onClick={() => navigate(`/singleProduct/${id}`)}
      >
        <div className="position-relative">
          <img
            src={thumbnail}
            className="card-img-top img-fluid product-thumb"
            alt={title || "product image"}
          />

          <button
            onClick={handleWishlist}
            aria-label={
              wishlist.includes(id) ? "Remove from wishlist" : "Add to wishlist"
            }
            className={`wishlist-btn btn shadow d-flex align-items-center justify-content-center ${
              wishlist.includes(id) ? "active" : ""
            }`}
            // stopPropagation already in handler, keep pointer accessible
            type="button"
          >
            <span className="heart-icon" aria-hidden>
              {wishlist.includes(id) ? "❤️" : "🤍"}
            </span>
          </button>
        </div>

        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-truncate" title={title}>
            {title}
          </h5>

          <p className="fw-lighter mb-2 small d-flex align-items-center justify-content-center">
            Rating: {rating}
            <IoStar
              style={{
                color: "#ffc107",
                fontSize: "1.1rem",
                marginBottom: "2px",
                marginLeft: "6px",
              }}
            />
          </p>

          <div className="mb-2">
            <h5 className="d-inline-flex m-auto mb-0">₹{discountedPrice()}</h5>
            <h6 className="d-inline-flex pt-2 pt-md-0 ms-2 mb-0 align-items-center">
              <span className="text-decoration-line-through d-inline-flex ms-2">
                ₹{price}
              </span>
              <sup className="fs-6 text-danger ms-2">
                {discountPercentage}% off
              </sup>
            </h6>
          </div>

          <div className="mt-auto">
            <button
              onClick={handleAddCart}
              className="btn btn-primary d-block w-100 p-2"
              type="button"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
