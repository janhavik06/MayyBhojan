import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBoxOpen,
  FaHeart,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

export default function DashboardLayout() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("maybhojan_user"); // ✅ fixed key
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-[#F6F2EF] flex">
      {/* SIDEBAR */}
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 fixed left-0 top-0 bottom-0 z-40 flex-col">
        {/* LOGO */}
        <div className="p-6 border-b border-gray-100">
          <h1
            onClick={() => navigate("/custalogin")}
            className="text-xl font-bold text-orange-500 cursor-pointer"
          >
            MayBhojan
          </h1>
        </div>

        {/* MENU */}
        <div className="p-6 space-y-3 flex-1">
          <SidebarItem
            icon={<FaHome />}
            label="Browse Kitchens"
            to="/custalogin"
          />

          <SidebarItem
            icon={<FaBoxOpen />}
            label="My Orders"
            to="/orders"
            end
          />

          <SidebarItem icon={<FaHeart />} label="Favorites" to="/favorites" />

          <SidebarItem icon={<FaCog />} label="Settings" to="/settings" />
        </div>

        {/* LOGOUT */}
        <div className="p-6 border-t border-gray-100">
          <button
            onClick={logout}
            className="flex items-center gap-3 text-red-500 hover:bg-red-50 p-3 rounded-lg w-full transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* PAGE CONTENT */}
      <main className="flex-1 md:ml-64 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, to, danger, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3  rounded-lg border transition
        ${
          isActive
            ? "bg-orange-50 text-orange-600 border-orange-200"
            : "text-gray-700 border-transparent hover:bg-orange-50 hover:border-orange-100"
        }
        ${danger ? "text-red-500" : ""}`
      }
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}
