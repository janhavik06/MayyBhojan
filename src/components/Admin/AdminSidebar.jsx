import { NavLink, useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("maybhojan_user");
    navigate("/login");
  }

  const item =
    "flex items-center gap-3 px-5 py-3 rounded-xl text-gray-700 hover:bg-orange-50 transition";

  const active = "bg-orange-100 text-orange-600 font-semibold";

  return (
    <aside className="w-64 bg-white flex flex-col shadow-md shadow-black/5 justify-between fixed left-0 top-18 h-165 ">
      <div className="p-5 space-y-2">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) => `${item} ${isActive ? active : ""}`}
        >
          <i class="fa-solid fa-chart-simple"></i> Overview
        </NavLink>

        <NavLink
          to="/admin/approvals"
          className={({ isActive }) => `${item} ${isActive ? active : ""}`}
        >
          <i class="fa-solid fa-check"></i> Approvals
        </NavLink>

        <NavLink
          to="/admin/safety"
          className={({ isActive }) => `${item} ${isActive ? active : ""}`}
        >
          <i class="fa-solid fa-clipboard-list"></i> Trust & Safety
        </NavLink>
      </div>

      <div className="p-4 shadow-[0_-2px_8px_rgba(0,0,0,0.05)]">
        <button
          onClick={logout}
          className="flex items-center gap-3 text-red-500 px-5 py-3 rounded-xl hover:bg-red-50 w-full"
        >
          <i class="fa-solid fa-arrow-right-from-bracket"></i> Logout
        </button>
      </div>
    </aside>
  );
}
