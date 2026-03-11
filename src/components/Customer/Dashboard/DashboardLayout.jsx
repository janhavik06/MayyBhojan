import { Outlet, NavLink } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#F6F2EF] flex">
      {/* SIDEBAR — STATIC */}
      <aside className="hidden md:flex w-64 bg-white shadow-md shadow-black/5 fixed left-0 top-16 bottom-0 z-40 flex-col">
        {/* MENU */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto scrollbar-hide">
          <SidebarItem label="My Orders" to="/orders" end />
          <SidebarItem label="Favorites" to="/favorites" />
          <SidebarItem label="Settings" to="/settings" />
        </div>
        {/* LOGOUT */}
        <div className="p-6 shadow-[0_-2px_8px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-3 text-red-500 cursor-pointer hover:bg-red-50 p-3 rounded-lg transition">
            <i className="fa-solid fa-arrow-right-from-bracket text-sm"></i>
            <span className="font-medium">Logout</span>
          </div>
        </div>
      </aside>

      {/* PAGE CONTENT */}
      <main className="flex-1 md:ml-64 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

function SidebarItem({ label, to, danger, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `block p-3 rounded-lg transition
        ${isActive ? "bg-orange-100 text-orange-600 font-medium" : "text-gray-700"}
        ${danger ? "text-red-500" : "hover:bg-orange-50"}`
      }
    >
      {label}
    </NavLink>
  );
}
