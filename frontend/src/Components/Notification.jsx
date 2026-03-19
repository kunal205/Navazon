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
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999]">
      <div
        role="alert"
        className={`flex items-center gap-4 px-6 py-3 rounded-xl shadow-xl
        text-white text-sm font-medium
        transition-all duration-300 ease-out
        ${error ? "bg-red-600" : "bg-green-600"}
      `}
      >
        <span>{error || message}</span>

        <button
          onClick={() => dispatch(clearErrors())}
          className="text-white/80 hover:text-white text-lg leading-none"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Notification;
