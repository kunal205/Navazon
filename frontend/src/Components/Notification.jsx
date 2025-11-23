import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../utility/UserSLice.js";
// import { clearErrors as clearProductErrors } from "../utility/ProductSlice.js";

const Notification = () => {
  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.users);

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        dispatch(clearErrors());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, error, dispatch]);

  if (!message && !error) return null;

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
      <div
        className={`toast show align-items-center text-white border-0 ${
          error ? "bg-danger" : "bg-success"
        }`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body fs-6 fw-bold">
            {/* Show Message or Error */}
            {error ? error : message}
          </div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            onClick={() => dispatch(clearErrors())}
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
