import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isCurrentUser } from "../utility/UserSLice";

const Profile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isCurrentUser());
  }, []);
  const { user, isloading: userIsLoading } = useSelector(
    (state) => state.users
  );
  const {} = user;
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    Profile Information
                  </h1>
                  <p className="text-blue-100">Personal Details</p>
                </div>
              </div>
              <button
                onClick={toggleEdit}
                className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors shadow-md"
              >
                {isEditing ? (
                  <>
                    <Save className="w-4 h-4" />
                    Save
                  </>
                ) : (
                  <>
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Profile Fields */}
          <div className="px-6 py-8 space-y-6">
            {/* Name */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full text-gray-800 text-lg border-2 border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="Enter your name"
                  />
                ) : (
                  <p className="text-gray-800 text-lg">{profile.name}</p>
                )}
              </div>
            </div>

            {/* Gender */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Gender
                </label>
                {isEditing ? (
                  <select
                    value={profile.gender}
                    onChange={(e) =>
                      handleInputChange("gender", e.target.value)
                    }
                    className="w-full text-gray-800 text-lg border-2 border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                ) : (
                  <p className="text-gray-800 text-lg">{profile.gender}</p>
                )}
              </div>
            </div>

            {/* Date of Birth */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Date of Birth
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    value={profile.dob}
                    onChange={(e) => handleInputChange("dob", e.target.value)}
                    className="w-full text-gray-800 text-lg border-2 border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-800 text-lg">
                    {formatDate(profile.dob)}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full text-gray-800 text-lg border-2 border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                ) : (
                  <p className="text-gray-800 text-lg break-words">
                    {profile.email}
                  </p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    value={profile.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    rows="3"
                    className="w-full text-gray-800 text-lg border-2 border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="Enter your address"
                  />
                ) : (
                  <p className="text-gray-800 text-lg">{profile.address}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
