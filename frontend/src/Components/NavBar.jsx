import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { FaRegHeart } from "react-icons/fa6";
import { FiUser, FiSearch, FiMenu, FiX } from "react-icons/fi";
import {useAuth,useProduct} from "../utility/customHooks"
const NavBar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const { productList } = useProduct();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    const safeSearchTerm = (searchTerm || "").trim().toLowerCase();
    if (!safeSearchTerm) return;

    const filteredResults = productList.filter((item) => {
      const titleMatch = item.title?.toLowerCase().includes(safeSearchTerm);
      const categoryMatch = item.category?.toLowerCase().includes(safeSearchTerm);

      return titleMatch || categoryMatch;
    });

    navigate('/search', { state: { results: filteredResults, searchTerm: safeSearchTerm } });
    setSearchTerm("");
  };

  return (
    <nav className="w-full bg-white border-b border-zinc-200 sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-6 h-20 flex justify-between items-center relative">
        {/* Left Side: Logo */}
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer text-2xl font-extrabold tracking-tighter text-zinc-900 flex-shrink-0"
        >
          Navazon
        </div>

        {/* Center: Search Bar */}
        <form onSubmit={handleSearch} className="relative flex-1 max-w-md mx-2 sm:mx-4">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-10 bg-zinc-50 border border-zinc-300 rounded-none text-sm text-zinc-900 focus:outline-none focus:bg-white focus:border-zinc-900 focus:ring-0 transition-colors placeholder:text-zinc-400"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors focus:outline-none">
            <FiSearch size={18} />
          </button>
        </form>

        {/* Right Side: Desktop Icons (Hidden on Mobile/Tablet) */}
        <div className="hidden lg:flex items-center gap-8">

          {/* Home */}
          <button
            onClick={() => navigate("/")}
            className="group relative flex items-center justify-center text-zinc-500 hover:text-purple-600 transition-colors focus:outline-none"
          >
            <IoIosHome size={22} />
          </button>

          {/* Admin */}
          {user?.role === "admin" && (
            <button
              onClick={() => navigate("/Admin")}
              className="group relative flex items-center justify-center text-zinc-500 hover:text-purple-600 transition-colors focus:outline-none"
            >
              <MdOutlineAdminPanelSettings size={24} />
            </button>
          )}

          {/* Wishlist */}
          <button
            onClick={() => navigate("/wishlist")}
            className="group relative flex items-center justify-center text-zinc-500 hover:text-purple-600 transition-colors focus:outline-none"
          >
            <FaRegHeart size={20} />
          </button>

          {/* Cart */}
          <button
            onClick={() => navigate("/addtocart")}
            className="group relative flex items-center justify-center text-zinc-500 hover:text-purple-600 transition-colors focus:outline-none"
          >
            <div className="relative">
              <TiShoppingCart size={26} />
              {user?.Cart?.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-purple-600 text-white text-[9px] font-bold px-1.5 py-0.5 flex items-center justify-center min-w-[16px] shadow-sm">
                  {user.Cart.length}
                </span>
              )}
            </div>
          </button>

          {/* Profile */}
          <button
            onClick={() => navigate(user?.name ? "/profile" : "/login")}
            className="group relative flex items-center justify-center text-zinc-500 hover:text-purple-600 transition-colors focus:outline-none"
          >
            <FiUser size={22} />
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-zinc-900 hover:text-purple-600 transition-colors focus:outline-none z-50 ml-auto"
        >
          {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

      </div>

      {/* Mobile/Tablet Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-zinc-200 shadow-lg flex flex-col items-center py-6 space-y-6 animate-[fadeIn_0.2s_ease-out]">
          <button
            onClick={() => { navigate("/"); setIsMobileMenuOpen(false); }}
            className="text-base font-bold text-zinc-700 hover:text-purple-600 uppercase tracking-widest transition-colors w-full text-center"
          >
            Home
          </button>

          {user?.role === "admin" && (
            <button
              onClick={() => { navigate("/Admin"); setIsMobileMenuOpen(false); }}
              className="text-base font-bold text-zinc-700 hover:text-purple-600 uppercase tracking-widest transition-colors w-full text-center"
            >
              Admin Panel
            </button>
          )}

          <button
            onClick={() => { navigate("/wishlist"); setIsMobileMenuOpen(false); }}
            className="text-base font-bold text-zinc-700 hover:text-purple-600 uppercase tracking-widest transition-colors w-full text-center"
          >
            Wishlist
          </button>

          <button
            onClick={() => { navigate("/addtocart"); setIsMobileMenuOpen(false); }}
            className="text-base font-bold flex items-center justify-center gap-2 text-zinc-700 hover:text-purple-600 uppercase tracking-widest transition-colors w-full text-center"
          >
            Cart {user?.Cart?.length > 0 && <span className="bg-purple-600 text-white text-[10px] px-2 py-0.5">{user.Cart.length}</span>}
          </button>

          <button
            onClick={() => { navigate(user?.name ? "/profile" : "/login"); setIsMobileMenuOpen(false); }}
            className="text-base font-bold text-zinc-700 hover:text-purple-600 uppercase tracking-widest transition-colors w-full text-center"
          >
            Profile
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
