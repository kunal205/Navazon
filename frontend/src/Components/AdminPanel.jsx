import axios from "axios";
import React, { useEffect, useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, deleteUser, updateProfile } from "../utility/UserSLice.js";
import { FiCamera } from "react-icons/fi";
import Loader from "./Loader";

const Adminpanel = () => {
  const { userList, isloading } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    image: "",
    age: "",
    role: "",
  });
  const fileInputRef = useRef(null);
  const handleImageClick = () => {
  if (fileInputRef.current) {
    fileInputRef.current.click();
  }}
const handleFileChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    const preview = URL.createObjectURL(file);

    setForm({
      ...form,
      image: preview,     // preview for UI
      imageFile: file     // real file for upload
    });
  }
};
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const DeleteUser = (email) => {
    dispatch(deleteUser(email));
    dispatch(getAllUsers());
  };
  const openEdit = (user) => {
    setForm({
      name: user.name || "",
      email: user.email || "",
      address: user.address || "",
      image: user.image || "",
      age: user.age || "",
      role: user.role || "",
      _id: user._id || "",
      });
    setOpen(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async () => {
  try {
    const fd = new FormData();

    fd.append("name", form.name);
    fd.append("email", form.email);
    fd.append("address", form.address);
    fd.append("age", form.age);
    fd.append("role", form.role);
    

    if (form.imageFile) {
      fd.append("image", form.imageFile);
    }
    console.log("Dispatching updateProfile with _id:", form._id);
    await dispatch(updateProfile({ _id: form._id, formData: fd })); 
    dispatch(getAllUsers());

    setOpen(false);
  } catch (error) {
    console.log(error); 
  }
};

  if (isloading) {
    return <Loader message="LOADING USERS..." />;
  }

  return (
    <>
      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-center">Photo</th>
              <th className="px-4 py-3 text-center">Age</th>
              <th className="px-4 py-3 text-left">Address</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {userList.map((user) => (
              <tr key={user.email} className="hover:bg-gray-50">
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3 text-center">
                  <img
                    src={user.image}
                    className="w-9 h-9 rounded-full mx-auto"
                    alt=""
                  />
                </td>
                <td className="px-4 py-3 text-center">{user.age}</td>
                <td className="px-4 py-3 truncate max-w-[200px]">
                  {user.address}
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => DeleteUser(user.email)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => openEdit(user)}
                      className="px-3 py-1 bg-green-600 text-white rounded"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-zinc-900/20 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div className="relative bg-white w-full max-w-md mx-auto rounded-none p-8 border border-zinc-200 shadow-2xl">
            <h2 className="text-xl font-bold mb-8 text-zinc-900 tracking-tight text-center">Edit User Profile</h2>

            {/* Profile Image Container */}
            <div className="flex justify-center mb-8">
  {/* The Hidden Input (Updated onChange) */}
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
    className="w-24 h-24 aspect-square relative group cursor-pointer overflow-hidden border border-zinc-200"
  >
    <img
      src={form.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5la_9NIA4dMPDT81DSbe73sKpqK3idaIHdYOvFEjz67qvqNyQxqt_Dbn1LFPCyr4jg_kZvcY3ezdFwQPgqxCub_WX4QtgDwcVpZeaMA&s"}
      alt="Profile"
      className="w-full h-full object-cover"
    />

    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
      <FiCamera className="text-white" size={20} />
      <span className="text-white text-[10px] font-bold tracking-widest mt-1">CHANGE</span>
    </div>
  </div>
</div>

            {/* Form Fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Full Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="User Name"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-none text-zinc-900 text-sm focus:outline-none focus:bg-white focus:border-zinc-900 focus:ring-0 transition-colors placeholder:text-zinc-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Email Address</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="user@example.com"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-none text-zinc-900 text-sm focus:outline-none focus:bg-white focus:border-zinc-900 focus:ring-0 transition-colors placeholder:text-zinc-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Role</label>
                <select
                  name="role"
                  value={form.role || "user"}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-none text-zinc-900 text-sm focus:outline-none focus:bg-white focus:border-zinc-900 focus:ring-0 transition-colors appearance-none"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 mt-10 pt-6 border-t border-zinc-200">
              <button
                onClick={() => setOpen(false)}
                className="px-6 py-2.5 text-xs font-bold text-zinc-500 hover:text-zinc-900 uppercase tracking-widest transition-colors focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-sm focus:outline-none rounded-none"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Adminpanel;
