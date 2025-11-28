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
  const { email, password } = user;
  const handleLogIn = async () => {
    dispatch(logInUser(user));
  };
  return (
    <>
      <div className="min-vh-50 d-flex container p-3">
        {/* Right Side - Sign Up Form */}
        <div className=" w-50  align-items-center justify-content-center p-4 m-auto bg-white border border-black offset-1">
          <div className="w-100" style={{ maxWidth: "600px" }}>
            {/* Header */}
            <div className="mb-4">
              <h2 className="fw-bold mb-2 text-center">Log-in</h2>
              <p className="text-muted text-center">
                Fill in your details to get started
              </p>
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
              <div className="position-relative">
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
            </div>
            {/* Login Button */}
            <button
              onClick={handleLogIn}
              className="btn btn-primary btn-lg w-100 mb-4"
            >
              Log-in
            </button>
            <div className="text-danger text-center">{error}</div>
            <div className="text-success text-center">{message}</div>
            <p className="text-center">
              new user? <a href="/register">register here</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
