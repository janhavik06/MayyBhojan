import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../Cart/CartContext";

export default function Navbar({ language, setLanguage, loggedIn }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { count } = useCart();

  const showCustomerNav = loggedIn && location.pathname !== "/";
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("maybhojan_user"));
  const role = user?.role;
  return (
    <header className="w-full bg-white shadow-md shadow-black/5 sticky top-0 z-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* LEFT */}
        <nav className="hidden md:flex gap-8 font-medium">
          {!showCustomerNav ? (
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
          ) : (
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
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            className="border px-3 py-1 rounded-full text-sm"
          >
            🌐 {language === "en" ? "EN/हिं" : "हिं/EN"}
          </button>

          {!showCustomerNav ? (
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
          ) : (
            role !== "admin" &&
            role !== "delivery" && (
              <>
                <Link to="/cart" className="relative text-xl cursor-pointer">
                  <i className="fa-solid fa-basket-shopping"></i>

                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {count}
                  </span>
                </Link>

                <div onClick={goToProfile} className="cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold shadow-md hover:shadow-lg transition">
                    <i className="fa-solid fa-user"></i>
                  </div>
                </div>
              </>
            )
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          {open ? "✖" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden border-t bg-white px-6 py-4 space-y-4">
          <button
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            className="border px-3 py-1 rounded-full text-sm"
          >
            🌐 {language === "en" ? "EN/हिं" : "हिं/EN"}
          </button>

          {!showCustomerNav ? (
            <>
              <NavLink
                to="/about"
                onClick={() => setOpen(false)}
                className="block"
              >
                About Us
              </NavLink>

              <NavLink
                to="/how"
                onClick={() => setOpen(false)}
                className="block"
              >
                How it Works
              </NavLink>

              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block"
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() => setOpen(false)}
                className="block bg-orange-500 text-white px-4 py-2 rounded-full text-center"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link to="/" onClick={() => setOpen(false)} className="block">
                <i className="fa-solid fa-house"></i> Home
              </Link>

              <Link
                to="/explore"
                onClick={() => setOpen(false)}
                className="block"
              >
                <i className="fa-solid fa-magnifying-glass"></i> Explore
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
function goToProfile() {
  if (role === "cook") {
    navigate("/cook");
  } else if (role === "customer") {
    navigate("/profile");
  } else if (role === "delivery") {
    navigate("/delivery");
  } else if (role === "admin") {
    navigate("/admin");
  }
}
