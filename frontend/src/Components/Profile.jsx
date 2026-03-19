import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateUser, signOut } from "../utility/UserSLice";
import { useNavigate } from "react-router-dom";
import { FiCamera } from "react-icons/fi";
import Loader from "./Loader";
import {useAuth} from "../utility/customHooks"
const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthLoading } = useAuth();

  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);  
  const [showConfirm, setShowConfirm] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    image: "",
    imageFile: null,
    gender: "",
    email: "",
    address: "",
    age: "",
    dob: "",
  });
  useEffect(() => {
    if (!isAuthLoading && !user.name) {
      navigate("/login");
    }
  }, [user, navigate, isAuthLoading]); 
  const fileInputRef = useRef(null);
  
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setProfile((prev) => ({
        ...prev,
        image: preview,
        imageFile: file,
      }));
      // Auto-trigger edit mode so user knows they need to save
      setIsEditing(true);
    }
  };

  useEffect(() => {
    if (user) {
      setProfile({
        image: user.image || "",
        dob: user.dob || "",
        name: user.name || "",
        gender: user.gender || "",
        email: user.email || "",
        address: user.address || "",
        age: user.age || "",
      });
   }
  }, [user]);

  const handleInputChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggleEdit = () => {
    if (isEditing) {
      setShowConfirm(true); 
    } else {
      setIsEditing(true);
    }
  };

  const handleConfirmSave = async () => {
    try {
      const fd = new FormData();
      fd.append("name", profile.name);
      fd.append("email", profile.email);
      fd.append("address", profile.address);
      fd.append("gender", profile.gender);
      fd.append("dob", profile.dob);
      if (profile.age) fd.append("age", profile.age);
      if (profile.imageFile) fd.append("image", profile.imageFile);

      await dispatch(updateUser(fd));
      setIsEditing(false);
      setShowConfirm(false);
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  const handleSignOut = () => {
    dispatch(signOut());
    navigate("/login");
  };

  if (isAuthLoading) {
    return <Loader message="LOADING PROFILE..." />;
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-20 min-h-[calc(100vh-64px)]">
      {/* Header */}
      <div className="mb-12 border-b border-zinc-200 pb-6">
        <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Account Dashboard</h2>
        <p className="text-sm text-zinc-500 mt-2">
          Manage your personal information and orders
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Sidebar Menu */}
        <div className="w-full md:w-64 flex flex-col shrink-0 space-y-2">
          <button 
            onClick={() => setActiveTab("profile")}
            className={`text-left px-4 py-3 text-sm font-semibold uppercase tracking-wider transition-colors ${activeTab === 'profile' ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'}`}
          >
            Personal Info
          </button>
          <button 
            onClick={() => setActiveTab("orders")}
            className={`text-left px-4 py-3 text-sm font-semibold uppercase tracking-wider transition-colors ${activeTab === 'orders' ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'}`}
          >
            Order History
          </button>
          <button 
            onClick={() => setActiveTab("settings")}
            className={`text-left px-4 py-3 text-sm font-semibold uppercase tracking-wider transition-colors ${activeTab === 'settings' ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'}`}
          >
            Preferences
          </button>
          
          <div className="h-px bg-zinc-200 my-4"></div>
          
          <button 
            onClick={handleSignOut}
            className="text-left px-4 py-3 text-sm font-semibold text-red-500 uppercase tracking-wider hover:bg-red-50 transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 w-full border border-zinc-200 bg-white">
          
          {activeTab === "profile" && (
            <div>
               {/* Content Header */}
               <div className="p-8 border-b border-zinc-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                 <div className="flex items-center gap-6">
                   {/* Hidden File Input */}
                   <input
                     type="file"
                     ref={fileInputRef}
                     accept="image/*"
                     className="hidden"
                     onChange={handleFileChange}
                   />

                   {/* Interactive Image Container */}
                   <div 
                     onClick={handleImageClick}
                     className="w-32 h-32 aspect-square relative group cursor-pointer overflow-hidden border border-zinc-200 shrink-0"
                   >
                     <img
                       src={profile.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5la_9NIA4dMPDT81DSbe73sKpqK3idaIHdYOvFEjz67qvqNyQxqt_Dbn1LFPCyr4jg_kZvcY3ezdFwQPgqxCub_WX4QtgDwcVpZeaMA&s"}
                       alt="profile"
                       className="w-full h-full object-cover"
                     />
                     <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                       <FiCamera className="text-white" size={24} />
                       <span className="text-white text-[10px] font-bold tracking-widest mt-1">CHANGE</span>
                     </div>
                   </div>
                   <div>
                     <h3 className="text-lg font-bold text-zinc-900">{profile.name || "User Account"}</h3>
                     <p className="text-sm text-zinc-500">{profile.email}</p>
                   </div>
                 </div>

                 <button
                    onClick={handleToggleEdit}
                    className={`px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors shadow-sm ${isEditing ? 'bg-purple-600 hover:bg-zinc-900 text-white' : 'bg-zinc-900 hover:bg-purple-600 text-white'}`}
                  >
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </button>
               </div>

               {/* Form Body */}
               <div className="p-8">
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6 border-b border-zinc-200 pb-2">
                    Profile Details
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold text-zinc-900 uppercase tracking-wider mb-2">
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          value={profile.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm focus:outline-none focus:bg-white focus:border-purple-600 focus:ring-0 transition-colors"
                        />
                      ) : (
                        <p className="text-zinc-700 text-sm py-3 border-b border-transparent">{profile.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-zinc-900 uppercase tracking-wider mb-2">
                        Email Address
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm focus:outline-none focus:bg-white focus:border-purple-600 focus:ring-0 transition-colors"
                        />
                      ) : (
                        <p className="text-zinc-700 text-sm py-3 border-b border-transparent">{profile.email}</p>
                      )}
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-xs font-semibold text-zinc-900 uppercase tracking-wider mb-2">
                        Gender
                      </label>
                      {isEditing ? (
                        <select
                          value={profile.gender}
                          onChange={(e) => handleInputChange("gender", e.target.value)}
                          className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm focus:outline-none focus:bg-white focus:border-purple-600 focus:ring-0 transition-colors appearance-none"
                        >
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                          <option>Prefer not to say</option>
                        </select>
                      ) : (
                        <p className="text-zinc-700 text-sm py-3 border-b border-transparent capitalize">{profile.gender || "Not specified"}</p>
                      )}
                    </div>

                    {/* DOB */}
                    <div>
                      <label className="block text-xs font-semibold text-zinc-900 uppercase tracking-wider mb-2">
                        Date of Birth
                      </label>
                      {isEditing ? (
                        <input
                          type="date"
                          value={profile.dob ? profile.dob.split("T")[0] : ""}
                          onChange={(e) => handleInputChange("dob", e.target.value)}
                          className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm focus:outline-none focus:bg-white focus:border-purple-600 focus:ring-0 transition-colors"
                        />
                      ) : (
                        <p className="text-zinc-700 text-sm py-3 border-b border-transparent">
                          {profile.dob ? new Date(profile.dob).toLocaleDateString() : "Not specified"}
                        </p>
                      )}
                    </div>

                     {/* Address */}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-zinc-900 uppercase tracking-wider mb-2">
                        Physical Address
                      </label>
                      {isEditing ? (
                        <textarea
                          rows="3"
                          value={profile.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm focus:outline-none focus:bg-white focus:border-purple-600 focus:ring-0 transition-colors resize-none"
                        />
                      ) : (
                        <p className="text-zinc-700 text-sm py-3 border-b border-transparent">{profile.address || "No address provided."}</p>
                      )}
                    </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="p-8">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6 border-b border-zinc-200 pb-2">
                Order History
              </h3>
              
              {(!user?.orders || user.orders.length === 0) ? (
                <div className="py-16 px-6 bg-zinc-50 border border-zinc-200 flex items-center justify-center flex-col gap-4 text-center">
                  <p className="text-zinc-500 text-sm">You haven't placed any orders yet.</p>
                  <button
                    onClick={() => navigate("/")}
                    className="px-6 py-2.5 bg-zinc-900 hover:bg-purple-600 text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-sm focus:outline-none mt-2"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {user.orders.map((order) => (
                    <div key={order.orderId} className="border border-zinc-200 bg-white hover:border-zinc-300 transition-colors p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-zinc-100">
                        <div>
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Order ID</p>
                          <p className="text-sm font-bold text-zinc-900">{order.orderId}</p>
                        </div>
                        <div className="shrink-0">
                          <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
                            order.status?.toLowerCase() === 'delivered' ? 'bg-green-50 text-green-700 border border-green-200' :
                            order.status?.toLowerCase() === 'processing' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                            order.status?.toLowerCase() === 'cancelled' ? 'bg-red-50 text-red-700 border border-red-200' :
                            'bg-zinc-100 text-zinc-700 border border-zinc-200'
                          }`}>
                            {order.status || 'Processing'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        {order.items?.map((item, idx) => {
                          const product = productList?.find(p => p.id == item.productId);
                          return (
                            <div key={idx} className="flex gap-4 items-center bg-zinc-50 border border-zinc-100 p-3">
                               <div className="w-16 h-16 bg-white shrink-0 border border-zinc-200">
                                 {product?.thumbnail ? (
                                   <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover" />
                                 ) : (
                                   <div className="w-full h-full flex items-center justify-center text-zinc-300">
                                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                   </div>
                                 )}
                               </div>
                               <div className="flex-1 min-w-0">
                                 <p className="text-sm font-semibold text-zinc-900 truncate">{product?.title || `Product ID: ${item.productId}`}</p>
                                 <p className="text-xs text-zinc-500 mt-0.5">Qty: {item.quantity}</p>
                               </div>
                               <div className="text-right shrink-0 px-2">
                                 <p className="font-bold text-sm text-zinc-900">
                                   ${(product?.price * item.quantity || 0).toFixed(2)}
                                 </p>
                               </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-6 pt-4 border-t border-zinc-100 flex justify-between items-end">
                        <div className="flex flex-col">
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Date Delivered</p>
                          <p className="text-sm font-semibold text-zinc-700">
                            {order.deliveredDate ? new Date(order.deliveredDate).toLocaleDateString() : 'N/A'}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Total Billed</p>
                          <p className="text-lg font-bold text-purple-600">
                            ${order.bill ? Number(order.bill).toFixed(2) : '0.00'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "settings" && (
            <div className="p-8">
               <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6 border-b border-zinc-200 pb-2">
                Preferences
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-6">
                  <div>
                    <p className="font-semibold text-zinc-900 text-sm">Email Notifications</p>
                    <p className="text-sm text-zinc-500">Receive order updates and promotions</p>
                  </div>
                  <button className="w-12 h-6 bg-purple-600 rounded-full relative transition-colors focus:outline-none shadow-inner">
                    <span className="absolute right-1 top-1 bg-white w-4 h-4 rounded-full transition-all"></span>
                  </button>
                </div>
                <div className="flex items-center justify-between border-b border-zinc-100 pb-6">
                  <div>
                    <p className="font-semibold text-zinc-900 text-sm">SMS Alerts</p>
                    <p className="text-sm text-zinc-500">Receive delivery tracking texts</p>
                  </div>
                  <button className="w-12 h-6 bg-zinc-200 rounded-full relative transition-colors focus:outline-none shadow-inner">
                    <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all"></span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

       {/* CONFIRMATION MODAL */}
       {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm"
            onClick={() => setShowConfirm(false)}
          />

          <div className="relative bg-white border border-zinc-200 shadow-2xl w-full max-w-md p-8 rounded-none">
            <h3 className="text-xl font-bold text-zinc-900 tracking-tight mb-2">Save Changes</h3>
            <p className="text-sm text-zinc-500 mb-8">
              Are you sure you want to continuously update your profile information?
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-6 py-2.5 text-xs font-bold text-zinc-500 hover:text-zinc-900 uppercase tracking-widest transition-colors focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSave}
                className="px-6 py-2.5 bg-purple-600 hover:bg-zinc-900 text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-sm focus:outline-none"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
