import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, handleuser } from "../utility/UserSLice.js";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const { user, message, error } = useSelector((state) => state.users);
  const { name, gender, age, dob, email, password, confirmPassword, address } =
    user;
  useEffect(() => {
    if (user && message) {
      redirect("/");
    }
  }, [user, message, redirect]);
  const [image, setImg] = useState();
  const fd = new FormData();
  fd.append("name", name);
  fd.append("gender", gender);
  fd.append("age", age);
  fd.append("email", email);
  fd.append("password", password);
  fd.append("confirmPassword", confirmPassword);
  fd.append("address", address);
  fd.append("image", image);
  const userAge = (e) => {
    const userDob = e.target.value;
    const age =
      new Date().getFullYear() - new Date(e.target.value).getFullYear();
    if (age < 1) {
      alert("You must be at least 18 years old to register.");
    } else {
      return dispatch(handleuser({ ...user, age: age, dob: userDob }));
    }
  };
  const handleSignUp = () => {
    dispatch(addUser(fd));
  };
  return (
    <>
      <div className="min-vh-50 d-flex container p-3">
        {/* Right Side - Sign Up Form */}
        <div className="w-100 w-lg-50 d-flex align-items-center justify-content-center p-4 bg-white ">
          <div className="border border-black p-4">
            <div className="w-100" style={{ maxWidth: "450px" }}>
              {/* Header */}

              <div className="mb-4">
                <h2 className="fw-bold mb-2">Create Account</h2>

                <p className="text-muted">
                  Fill in your details to get started
                </p>
              </div>
              {/* Name Input */}

              <div className="mb-3">
                <label className="form-label fw-medium">Full Name</label>

                <input
                  className="form-control form-control-lg"
                  placeholder="Enter your full name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) =>
                    dispatch(
                      handleuser({ ...user, [e.target.name]: e.target.value })
                    )
                  }
                />
              </div>
              {/*Gender Input*/}
              <div className="row mb-3">
                <label className="form-label fw-medium d-block ">Gender</label>
                <div className="col-12 col-md-4">
                  <input
                    className="form-check-input mx-3"
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={(e) =>
                      dispatch(
                        handleuser({ ...user, [e.target.name]: e.target.value })
                      )
                    }
                    id="male"
                  />
                  <label className="form-check-label" htmlFor="male">
                    Male
                  </label>
                </div>
                <div className="col-12 col-md-4">
                  <input
                    className="form-check-input mx-3"
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={(e) =>
                      dispatch(
                        handleuser({ ...user, [e.target.name]: e.target.value })
                      )
                    }
                    id="female"
                  />
                  <label className="form-check-label" htmlFor="female">
                    Female
                  </label>
                </div>
                <div className="col-12 col-md-4">
                  <input
                    className="form-check-input mx-3"
                    type="radio"
                    name="gender"
                    value="other"
                    onChange={(e) =>
                      dispatch(
                        handleuser({ ...user, [e.target.name]: e.target.value })
                      )
                    }
                    id="other"
                  />
                  <label className="form-check-label" htmlFor="other">
                    Other
                  </label>
                </div>
              </div>
              {/*Age Input*/}
              <div className="mb-3">
                <label className="form-label fw-medium">
                  D.O.B (Date of Birth)
                </label>

                <input
                  type="date"
                  placeholder="Enter your Age"
                  className="form-control form-control-lg"
                  min="1925-01-01"
                  max={new Date().toISOString().split("T")[0]}
                  name="dob"
                  value={dob}
                  onChange={(e) => {
                    userAge(e);
                  }}
                />
                <p>Your {age} years old </p>
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
              <div className="mb-3">
                <label className="form-label fw-medium">Confirm Password</label>
                <div className="position-relative">
                  <input
                    name="confirmPassword"
                    value={confirmPassword}
                    type="text"
                    placeholder="Enter your confirm password"
                    className="form-control form-control-lg"
                    onChange={(e) =>
                      dispatch(
                        handleuser({ ...user, [e.target.name]: e.target.value })
                      )
                    }
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label fw-medium">Address</label>
                <div className="position-relative">
                  <input
                    name="address"
                    value={address}
                    type="text"
                    placeholder="Your Current Address"
                    className="form-control form-control-lg"
                    onChange={(e) =>
                      dispatch(
                        handleuser({ ...user, [e.target.name]: e.target.value })
                      )
                    }
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label fw-medium">Profile Picture</label>
                <div className="position-relative">
                  <input
                    type="file"
                    placeholder="Confirm your password"
                    className="form-control form-control-lg"
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                </div>
              </div>
              {/* Sign Up Button */}
              <button
                onClick={handleSignUp}
                className="btn btn-primary btn-lg w-100 mb-4"
              >
                Sign Up
              </button>
              <div className="text-danger text-center">{error}</div>
              <div className="text-primary text-center">{message}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
