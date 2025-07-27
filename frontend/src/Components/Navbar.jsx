import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMoon } from "react-icons/fa6";
import { useAuth } from "../contexts/AuthContext"; // Adjust path as needed

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between px-14 shadow-md bg-white">
      {/* Logo Image */}
      <div className="w-[15%] flex items-center">
        <img src="Logo.png" alt="Lost Link Logo" className="ml-2 w-[100%] h-[100%]" />
      </div>

      <div className="w-[70%] flex items-center justify-end gap-12 mr-6">
        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6 font-medium">
          <li onClick={() => navigate("/")} className="hover:text-blue-500 cursor-pointer ml-2">
            Home
          </li>
          <li onClick={() => navigate("/pickup-guidelines")} className="hover:text-blue-500 cursor-pointer ml-2">
            PickUp Guidelines
          </li>
          <li onClick={() => navigate("/contact")} className="hover:text-blue-500 cursor-pointer ml-2">
            Contact Us
          </li>

          {/* Show different buttons based on auth status */}
          {!isAuthenticated ? (
            <li
              onClick={() => navigate("/signup")}
              className="hover:text-blue-500 cursor-pointer rounded-full ml-1 px-4 py-1 bg-black text-white text-medium">
              Sign Up
            </li>
          ) : (
            <li
              onClick={handleLogout}
              className="hover:bg-red-600 cursor-pointer rounded-full ml-1 px-4 py-1 bg-red-500 text-white text-medium">
              Logout
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
