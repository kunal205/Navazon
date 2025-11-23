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
export default function ProductDetailsPage() {
  const [quantity, setQuantity] = useState(1);
  const [newReview, setNewReview] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isloading: userIsLoading } = useSelector(
    (state) => state.users
  );
  const { product, isLoading: productIsLoading } = useSelector(
    (state) => state.products
  );
  const { wishlist } = user;
  useEffect(() => {
    dispatch(getSingleProducts(id));
  }, [id]);
  const isWishlisted = wishlist.includes(Number(id));
  const handleWishlist = () => {
    dispatch(addToWishlist(id));
  };
  const handlePostReview = async () => {
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
      })
    );
    setNewReview("");
    setUserRating(0);
    dispatch(getSingleProducts(id));
  };
  const handleAddToCart = () => {
    dispatch(addToCart({ productId: id, quantity: quantity }));
    setQuantity(1);
  };
  const handleBuyNow = () => {
    navigate("/checkout", {
      state: {
        product: product,
        quantity: quantity,
      },
    });
    setQuantity(1);
  };
  if (userIsLoading || productIsLoading || !product.title) {
    return (
      <div className="container text-center py-5">
        <h2>Loading...</h2>
      </div>
    );
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
    <div className="bg-secondary-subtle">
      <div className="container py-4">
        <div className="shadow p-3 mb-5 bg-body-tertiary rounded">
          <div className="row g-4 p-4 p-md-5">
            {/* Image Gallery */}
            <div className="col-md-6 position-relative">
              <div className="mb-3  pb-5 rounded-2 border w-100">
                <div id="carouselExample" className="carousel slide">
                  <div className="carousel-inner">
                    {Array.isArray(images) &&
                      images.map((imageSrc, index) => (
                        <div
                          key={imageSrc}
                          className={`carousel-item ${
                            index === 0 ? "active" : ""
                          }`}
                        >
                          <img
                            src={imageSrc}
                            className="d-block w-100"
                            alt={`Product image ${index + 1}`}
                          />
                        </div>
                      ))}
                  </div>
                  <button
                    onClick={handleWishlist}
                    className="position-absolute top-0 end-0 m-3 shadow border border-none"
                    style={{
                      ...styles.wishlistBtn,
                      ...(isWishlisted ? styles.wishlistBtnActive : {}),
                    }}
                  >
                    <span style={styles.heartIcon}>
                      {isWishlisted ? "❤️" : "🤍"}
                    </span>
                  </button>
                  <button
                    className=" btn btn-black d-none d-lg-block position-absolute top-50 start-0"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="prev"
                  >
                    <IoArrowBackOutline />
                  </button>
                  <button
                    className="btn btn-black d-none d-lg-block position-absolute top-50 end-0"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="next"
                  >
                    <IoArrowForwardOutline />
                  </button>
                </div>
              </div>
            </div>
            {/* Product Details */}
            <div className="col-md-6">
              <h1 className="display-5 fw-bold mb-2">{title}</h1>

              <div
                className="d-flex align-items-center mb-3"
                style={{ gap: "1rem" }}
              >
                rating: {rating}
                <div className="d-flex">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      style={{
                        color: i < Math.floor(rating) ? "#ffc107" : "#dee2e6",
                        fontSize: "1.2rem",
                      }}
                    >
                      {i < Math.floor(rating) ? "★" : "☆"}
                    </span>
                  ))}
                </div>
              </div>
              <div
                className="d-flex align-items-baseline mb-3"
                style={{ gap: "1rem" }}
              >
                <h2 className="display-4 fw-bold mb-0">${price}</h2>
              </div>
              <p className="text-muted mb-4">{description}</p>
              {/* Quantity */}
              <div className="mb-4">
                <h5 className="fw-semibold mb-3">Quantity</h5>
                <div
                  className="d-flex align-items-center"
                  style={{ gap: "1rem" }}
                >
                  <button
                    onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                    style={styles.quantityBtn}
                  >
                    -
                  </button>
                  <span style={styles.quantityDisplay}>{quantity}</span>
                  <button
                    onClick={() =>
                      setQuantity((q) =>
                        q < minimumOrderQuantity ? q + 1 : minimumOrderQuantity
                      )
                    }
                    style={styles.quantityBtn}
                  >
                    +
                  </button>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="d-flex mb-4" style={{ gap: "1rem" }}>
                <button
                  onClick={handleAddToCart}
                  style={{ ...styles.actionBtn, ...styles.actionBtnDark }}
                  className="flex-fill m-0"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  style={{ ...styles.actionBtn, ...styles.actionBtnPrimary }}
                  className="flex-fill p-1"
                >
                  Buy Now
                </button>
              </div>
              {/*Details Section*/}
              <div>
                <h3 className="border-dark border-bottom text-center">
                  Details
                </h3>
                <p className="fw-bold">
                  Brand : <span className="fw-light">{brand}</span>
                </p>
                <p className="fw-bold">
                  Warranty :
                  <span className="fw-light">{warrantyInformation}</span>
                </p>
                <p className="fw-bold">
                  InStock : <span className="fw-light">{stock}</span>
                </p>
              </div>
              {/* Reviews Section*/}
              <div>
                <h3 className="border-dark border-bottom text-center">
                  Reviews
                </h3>
                <label className="form-label fw-medium">your Comment</label>
                <div className="mb-2">
                  <label className="form-label fw-medium d-block">
                    Your Rating
                  </label>
                  <div className="d-flex">
                    {[...Array(5)].map((_, index) => {
                      const starValue = index + 1;
                      return (
                        <IoStar
                          key={index}
                          onClick={() => setUserRating(starValue)}
                          onMouseEnter={() => setHoverRating(starValue)}
                          onMouseLeave={() => setHoverRating(0)}
                          style={{
                            cursor: "pointer",
                            color:
                              starValue <= (hoverRating || userRating)
                                ? "#ffc107"
                                : "#dee2e6",
                            fontSize: "1.8rem",
                            marginRight: "5px",
                            transition: "color 0.2s",
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-medium">Your Comment</label>
                  <input
                    className="form-control form-control-lg"
                    placeholder="Write your experience..."
                    type="text"
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-primary mb-4"
                  onClick={handlePostReview}
                >
                  Post Review
                </button>
                {Array.isArray(reviews) &&
                  reviews.map((elm) => (
                    <div className="border-bottom" key={elm.reviewerEmail}>
                      <p className="fw-bold my-0 d-inline">
                        {elm.reviewerName}
                      </p>
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          style={{
                            color:
                              i < Math.floor(elm.rating)
                                ? "#ffc107"
                                : "#dee2e6",
                            fontSize: "1.2rem",
                          }}
                        >
                          {i < Math.floor(elm.rating) ? "★" : "☆"}
                        </span>
                      ))}
                      <p className="fw-bold">
                        Posted On:
                        <span className="fw-light">
                          {elm.date ? elm.date.slice(0, 10) : "just now"}
                        </span>
                      </p>
                      <p className="fw-light">{elm.comment}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wishlistBtn: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(10px)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  heartIcon: {
    fontSize: "1.5rem",
  },
  sizeBtn: {
    padding: "0.5rem 1.25rem",
    border: "2px solid #dee2e6",
    borderRadius: "0.5rem",
    background: "white",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontWeight: 500,
  },
  sizeBtnActive: {
    borderColor: "#0d6efd",
    background: "#e7f1ff",
    color: "#0d6efd",
    transform: "scale(0.95)",
  },
  quantityBtn: {
    width: "40px",
    height: "40px",
    border: "2px solid #dee2e6",
    borderRadius: "0.5rem",
    background: "white",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1.2rem",
    transition: "all 0.3s ease",
  },
  quantityDisplay: {
    fontSize: "1.25rem",
    fontWeight: 600,
    minWidth: "50px",
    textAlign: "center",
  },
  actionBtn: {
    padding: "1rem",
    borderRadius: "0.75rem",
    fontWeight: 600,
    border: "none",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  actionBtnDark: {
    background: "#212529",
    color: "white",
  },
  actionBtnPrimary: {
    background: "#0d6efd",
    color: "white",
  },
  featureIcon: {
    fontSize: "2rem",
    marginBottom: "0.5rem",
  },
  notification: {
    position: "fixed",
    top: "2rem",
    right: "2rem",
    background: "#198754",
    color: "white",
    padding: "1rem 1.5rem",
    borderRadius: "0.5rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    zIndex: 9999,
    animation: "slideIn 0.3s ease",
  },
};
