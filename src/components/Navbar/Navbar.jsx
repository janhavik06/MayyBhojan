import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../Cart/CartContext";

export default function Navbar({ language, setLanguage }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { count } = useCart();

  // ✅ Detect customer pages
  const isCustomerPage = location.pathname.startsWith("/custalogin");
  const isHomePage = location.pathname === "/";
  const user = JSON.parse(localStorage.getItem("maybhojan_user"));
  const role = user?.role;

  function goToProfile() {
    if (role === "COOK") navigate("/cook");
    else if (role === "CUSTOMER") navigate("/profile");
    else if (role === "DELIVERY") navigate("/delivery");
    else if (role === "ADMIN") navigate("/admin");
  }

  return (
    <header className="w-full bg-white shadow-md shadow-black/5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* LEFT */}
        <nav className="hidden md:flex gap-8 font-medium">
          {isCustomerPage ? (
            <>
              <Link to="/" className="text-gray-700 hover:text-orange-500">
                <i className="fa-solid fa-house"></i> Home
              </Link>

              <Link
                to="/explore"
                className="text-gray-700 hover:text-orange-500"
              >
                <i className="fa-solid fa-magnifying-glass"></i> Explore
              </Link>
            </>
          ) : (
            <>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500"
                    : "text-gray-700 hover:text-orange-500"
                }
              >
                About Us
              </NavLink>

              <NavLink
                to="/how"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500"
                    : "text-gray-700 hover:text-orange-500"
                }
              >
                How it Works
              </NavLink>
            </>
          )}
        </nav>

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl text-orange-500"
        >
          <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center">
            🍴
          </div>
          MayBhojan
        </Link>

        {/* RIGHT */}
        <div className="hidden md:flex items-center gap-6">
          {/* LANGUAGE */}
          <button
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            className="border px-3 py-1 rounded-full text-sm"
          >
            🌐 {language === "en" ? "EN/हिं" : "हिं/EN"}
          </button>

          {isCustomerPage ? (
            <>
              {/* CART */}
              <Link to="/cart" className="relative text-xl">
                <i className="fa-solid fa-cart-shopping"></i>
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 rounded-full">
                    {count}
                  </span>
                )}
              </Link>

              {/* PROFILE */}
              <div onClick={goToProfile} className="cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center text-white shadow-md hover:scale-105 transition">
                  <i className="fa-solid fa-user"></i>
                </div>
              </div>
            </>
          ) : (
            isHomePage && (
              <>
                <Link to="/login" className="px-5 py-2 font-semibold">
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="bg-orange-500 text-white px-5 py-2 rounded-full font-semibold"
                >
                  Sign Up
                </Link>
              </>
            )
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          {open ? "✖" : "☰"}
        </button>
      </div>
    </header>
  );
}
