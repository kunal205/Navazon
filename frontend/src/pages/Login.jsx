import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logInUser, handleuser, isCurrentUser } from "../utility/UserSLice.js";
const Login = () => {
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const { user, message, error } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(isCurrentUser());
  }, [dispatch]);
  useEffect(() => {
    if (user && message) {
      redirect("/");
    }
  }, [user, message, redirect]);
  console.log(user.message);
  const { email, password } = user;
  const handleLogIn = async () => {
    dispatch(logInUser(user));
  };
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <div className="bg-white p-4 p-md-5 shadow-sm rounded border">
            {/* Header */}
            <div className="text-center mb-4">
              <h2 className="fw-bold">Log-in</h2>
              <p className="text-muted">Fill in your details to get started</p>
            </div>

            {/* Email Input */}
            <div className="mb-3">
              <label className="form-label fw-medium">Email Address</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  dispatch(
                    handleuser({ ...user, [e.target.name]: e.target.value })
                  );
                }}
                placeholder="Enter your email"
                className="form-control form-control-lg"
              />
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <label className="form-label fw-medium">Password</label>
              <input
                name="password"
                value={password}
                type="password"
                placeholder="Enter your password"
                className="form-control form-control-lg"
                onChange={(e) =>
                  dispatch(
                    handleuser({ ...user, [e.target.name]: e.target.value })
                  )
                }
              />
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogIn}
              className="btn btn-primary btn-lg w-100 mb-3"
            >
              Log-in
            </button>

            {/* Messages */}
            <div className="text-danger text-center">{error}</div>
            <div className="text-success text-center">{message}</div>

            <p className="text-center mt-3">
              New user? <a href="/register">Register here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
