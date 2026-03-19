import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logInUser, handleuser, isCurrentUser } from "../utility/UserSLice.js";
import {useAuth} from "../utility/customHooks"
const Login = () => {
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const { user, message, error } = useAuth();
  useEffect(() => {
    dispatch(isCurrentUser());
  }, [dispatch]);
  useEffect(() => {
    if (user?.name  && message) {
      redirect("/");
    }
  }, [user, message, redirect]);
  const { email, password } = user;
  const handleLogIn = async () => {
    dispatch(logInUser(user));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-zinc-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-zinc-200 p-8 sm:p-10 shadow-sm">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-[28px] font-bold text-zinc-900 tracking-tight">Log in</h2>
          <p className="text-sm text-zinc-500 mt-2">
            Enter your details below to access your account
          </p>
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-zinc-900 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) =>
              dispatch(
                handleuser({ ...user, [e.target.name]: e.target.value }),
              )
            }
            placeholder="you@example.com"
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-none text-zinc-900 text-sm focus:outline-none focus:bg-white focus:border-purple-600 focus:ring-0 transition-colors placeholder:text-zinc-400"
          />
        </div>

        {/* Password */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-semibold text-zinc-900">
              Password
            </label>
          </div>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) =>
              dispatch(
                handleuser({ ...user, [e.target.name]: e.target.value }),
              )
            }
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-none text-zinc-900 text-sm focus:outline-none focus:bg-white focus:border-purple-600 focus:ring-0 transition-colors placeholder:text-zinc-400"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleLogIn}
          className="w-full bg-zinc-900 text-white py-3.5 px-4 font-bold text-sm tracking-wide rounded-none hover:bg-purple-600 transition-colors"
        >
          Sign In
        </button>

        {/* Messages */}
        {error && (
          <p className="text-red-500 text-center mt-4 text-sm font-medium">{error}</p>
        )}
        {message && (
          <p className="text-purple-600 text-center mt-4 text-sm font-medium">
            {message}
          </p>
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-zinc-100">
          <p className="text-center text-sm text-zinc-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
