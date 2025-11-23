import React from "react";
import { NavLink } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { FaRegHeart } from "react-icons/fa6";
const NavBar = () => {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary position-relativ"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <NavLink className="navbar-brand fs-2" to="/">
            Navazon
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse e"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item align-self-end mx-md-auto">
                <NavLink className="nav-link " aria-current="page" to="/">
                  <span className="d-lg-none">Home</span>
                  <IoIosHome className="d-none d-lg-block fs-2" />
                </NavLink>
              </li>
              <li className="nav-item  align-self-end mx-md-auto">
                <NavLink className="nav-link" to="/Admin">
                  <span className="d-lg-none"> Admin</span>
                  <MdOutlineAdminPanelSettings className="d-none d-lg-block fs-2" />
                </NavLink>
              </li>
              <li className="nav-item  align-self-end mx-md-auto">
                <NavLink className="nav-link" to="/wishlist">
                  <span className="d-lg-none"> WishList</span>
                  <FaRegHeart className="d-none d-lg-block fs-2" />
                </NavLink>
              </li>
              <li className="nav-item  align-self-end mx-md-auto">
                <NavLink className="nav-link" to="/addtocart">
                  <span className="d-lg-none">Cart</span>
                  <TiShoppingCart className="d-none d-lg-block fs-2" />
                </NavLink>
              </li>
              <li className="nav-item  align-self-end mx-md-auto">
                <NavLink className="nav-link" to="/login">
                  LOGIN
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
