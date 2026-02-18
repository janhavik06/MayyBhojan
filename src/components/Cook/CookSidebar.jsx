import { NavLink, useNavigate } from "react-router-dom";

export default function CookSidebar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("maybhojan_user");
    navigate("/login");
  }

  const item =
    "flex items-center gap-3 px-5 py-3 rounded-xl text-gray-700 hover:bg-orange-50 transition";

  const active =
    "bg-orange-100 text-orange-600 font-semibold";

  return (
    <aside className="w-64 bg-white shadow-md shadow-black/5 flex flex-col justify-between h-225 fixed left-0 top-15">

      {/* TOP MENU */}
      <div className="p-4 space-y-2">

        <NavLink
          to="/cook/orders"
          className={({ isActive }) =>
            `${item} ${isActive ? active : ""}`
          }
        >
          <i class="fa-solid fa-clipboard-list"></i> Daily Orders
        </NavLink>

        <NavLink
          to="/cook/menu"
          className={({ isActive }) =>
            `${item} ${isActive ? active : ""}`
          }
        >
          <i class="fa-solid fa-bars"></i> Manage Menu
        </NavLink>

        <NavLink
          to="/cook/earnings"
          className={({ isActive }) =>
            `${item} ${isActive ? active : ""}`
          }
        >
          <i class="fa-solid fa-wallet"></i> Earnings
        </NavLink>

        <NavLink
          to="/cook/kitchen"
          className={({ isActive }) =>
            `${item} ${isActive ? active : ""}`
          }
        >
          <i class="fa-solid fa-gear"></i> Kitchen Info
        </NavLink>

      </div>

      {/* LOGOUT */}
      <div className="p-4 shadow-[0_-2px_8px_rgba(0,0,0,0.05)]">
        <button
          onClick={logout}
          className="flex items-center gap-3 text-red-500 px-5 py-3 rounded-xl hover:bg-red-50 w-full"
        >
                      <i className="fa-solid fa-arrow-right-from-bracket text-sm"></i>
                      Logout
        </button>
      </div>

    </aside>
  );
}
