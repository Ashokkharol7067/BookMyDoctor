import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { token, setToken, userData } = useContext(AppContext);

  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Doctors", path: "/doctors" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between py-4">
        <img
          onClick={() => navigate("/")}
          className="w-44 cursor-pointer hover:scale-105 transition-transform duration-300"
          src={assets.logo1}
          alt=""
        />

        {/* Desktop Menu */}

        <ul className="hidden md:flex items-center gap-8 font-medium">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative pb-1 transition-all duration-300 ${
                  isActive ? "text-primary" : "text-gray-700 hover:text-primary"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <li>{item.name}</li>

                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 bg-primary transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  ></span>
                </>
              )}
            </NavLink>
          ))}
        </ul>

        {/* Right Section */}

        <div className="flex items-center gap-4">
          {token && userData ? (
            <div className="relative group cursor-pointer">
              <div className="flex items-center gap-2">
                <img
                  className="w-10 h-10 rounded-full object-cover border border-gray-300"
                  src={userData.image}
                  alt=""
                />

                <img className="w-2.5" src={assets.dropdown_icon} alt="" />
              </div>

              <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2">
                  <p
                    onClick={() => navigate("/my-profile")}
                    className="px-4 py-3 hover:bg-primary hover:text-white transition-all cursor-pointer"
                  >
                    My Profile
                  </p>

                  <p
                    onClick={() => navigate("/my-appointment")}
                    className="px-4 py-3 hover:bg-primary hover:text-white transition-all cursor-pointer"
                  >
                    My Appointment
                  </p>

                  <p
                    onClick={logout}
                    className="px-4 py-3 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="hidden md:block bg-primary text-white px-8 py-3 rounded-full font-medium shadow hover:shadow-lg hover:bg-blue-700 transition-all duration-300"
            >
              Create Account
            </button>
          )}

          {/* Mobile Menu Button */}

          <img
            onClick={() => setShowMenu(true)}
            className="w-7 cursor-pointer md:hidden"
            src={assets.menu_icon}
            alt=""
          />
        </div>
      </div>

      {/* Mobile Menu */}

      <div
        className={`fixed top-0 right-0 h-screen bg-white shadow-2xl transition-all duration-300 overflow-hidden z-50 ${
          showMenu ? "w-72" : "w-0"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b">
          <img className="w-36" src={assets.logo1} alt="" />

          <img
            onClick={() => setShowMenu(false)}
            className="w-7 cursor-pointer"
            src={assets.cross_icon}
            alt=""
          />
        </div>

        <ul className="flex flex-col mt-6 px-5 gap-3">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setShowMenu(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-white"
                    : "hover:bg-primary hover:text-white"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
