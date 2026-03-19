import React, { use, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, handleuser } from "../utility/UserSLice.js";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const { user, message, error } = useSelector((state) => state.users);
  
  const { name, gender, age, dob, email, password, confirmPassword, address } = user;
  
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
  fd.append("dob", dob);

  const userAge = (e) => {
    const userDob = e.target.value;
    const computedAge = new Date().getFullYear() - new Date(e.target.value).getFullYear();
    
    if (computedAge < 1) {
      alert("You must be at least 18 years old to register.");
    } else {
      return dispatch(handleuser({ ...user, age: computedAge, dob: userDob }));
    }
  };
    const fileInputRef = useRef(null);
    const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }}
    const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setImg(preview);
    }
  };

  const handleSignUp = () => {
    dispatch(addUser(fd));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-zinc-50 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-lg bg-white border border-zinc-200 p-8 sm:p-10 shadow-sm">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-[28px] font-bold text-zinc-900 tracking-tight">
            Create Account
          </h2>
          <p className="text-sm text-zinc-500 mt-2">
            Fill in your details below to get started
          </p>
        </div>
  {/* Profile Picture */}
        <div className="mb-8 flex justify-center">
           <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
          
            {/* The Clickable Image Container (Added onClick) */}
            <div 
              onClick={handleImageClick} 
              className="w-24 h-24 aspect-square relative group cursor-pointer overflow-hidden border border-zinc-200 "
            >
              <img
                src={image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5la_9NIA4dMPDT81DSbe73sKpqK3idaIHdYOvFEjz67qvqNyQxqt_Dbn1LFPCyr4jg_kZvcY3ezdFwQPgqxCub_WX4QtgDwcVpZeaMA&s"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              </div>
        </div>
        {/* Full Name */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-zinc-900 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Your Name"
            onChange={(e) =>
              dispatch(
                handleuser({ ...user, [e.target.name]: e.target.value }),
              )
            }
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-none text-zinc-900 text-sm focus:outline-none focus:bg-white focus:border-purple-600 focus:ring-0 transition-colors placeholder:text-zinc-400"
          />
        </div>

        {/* Gender */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-zinc-900 mb-3">
            Gender
          </label>
          <div className="flex gap-8">
            {["male", "female", "other"].map((g) => (
              <label
                key={g}
                className="flex items-center gap-2 text-sm font-medium text-zinc-700 cursor-pointer"
              >
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  onChange={(e) =>
                    dispatch(
                      handleuser({
                        ...user,
                        [e.target.name]: e.target.value,
                      }),
                    )
                  }
                  className="w-4 h-4 text-purple-600 bg-zinc-50 border-zinc-300 focus:ring-purple-600 focus:ring-1"
                />
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </label>
            ))}
          </div>
        </div>
        {/* DOB & Age */}
        <div className="mb-6">
          <div className="flex justify-between items-baseline mb-2">
            <label className="block text-sm font-semibold text-zinc-900">
              Date of Birth
            </label>
            {age > 0 && (
               <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 border border-purple-200">
                 Age: {age}
               </span>
            )}
          </div>
          <input
            type="date"
            name="dob"
            value={dob}
            min="1925-01-01"
            max={new Date().toISOString().split("T")[0]}
            onChange={(e) => userAge(e)}
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-none text-zinc-900 text-sm focus:outline-none focus:bg-white focus:border-purple-600 focus:ring-0 transition-colors"
          />
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
            placeholder="Enter Your Email"
            onChange={(e) =>
              dispatch(
                handleuser({ ...user, [e.target.name]: e.target.value }),
              )
            }
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-none text-zinc-900 text-sm focus:outline-none focus:bg-white focus:border-purple-600 focus:ring-0 transition-colors placeholder:text-zinc-400"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-zinc-900 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter Your Password"
            onChange={(e) =>
              dispatch(
                handleuser({ ...user, [e.target.name]: e.target.value }),
              )
            }
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-none text-zinc-900 text-sm focus:outline-none focus:bg-white focus:border-purple-600 focus:ring-0 transition-colors placeholder:text-zinc-400"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-zinc-900 mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Enter Your Confirm Password"
            onChange={(e) =>
              dispatch(
                handleuser({ ...user, [e.target.name]: e.target.value }),
              )
            }
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-none text-zinc-900 text-sm focus:outline-none focus:bg-white focus:border-purple-600 focus:ring-0 transition-colors placeholder:text-zinc-400"
          />
        </div>

        {/* Address */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-zinc-900 mb-2">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={address}
            placeholder="123 Example Street"
            onChange={(e) =>
              dispatch(
                handleuser({ ...user, [e.target.name]: e.target.value }),
              )
            }
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-none text-zinc-900 text-sm focus:outline-none focus:bg-white focus:border-purple-600 focus:ring-0 transition-colors placeholder:text-zinc-400"
          />
        </div>
        {/* Sign Up Button */}
        <button
          onClick={handleSignUp}
          className="w-full bg-zinc-900 text-white py-3.5 px-4 font-bold text-sm tracking-wide rounded-none hover:bg-purple-600 transition-colors"
        >
          Sign Up
        </button>

        {/* Messages */}
        {error && (
          <p className="text-red-500 text-center mt-4 text-sm font-medium">{error}</p>
        )}
        {message && (
          <p className="text-purple-600 text-center mt-4 text-sm font-medium">{message}</p>
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-zinc-100">
          <p className="text-center text-sm text-zinc-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;