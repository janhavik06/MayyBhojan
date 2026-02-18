import { NavLink, useNavigate } from "react-router-dom";

export default function DeliverySidebar() {
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
    <aside className="w-64 bg-white flex flex-col justify-between h-225 fixed left-0 top-18 border-r border-black/5">

      {/* MENU */}
      <div className="p-4 space-y-2">

        <NavLink
          to="/delivery"
          className={({ isActive }) =>
            `${item} ${isActive ? active : ""}`
          }
        >
          <i class="fa-solid fa-person-biking"></i> Find Orders
        </NavLink>

        <NavLink
          to="/delivery/active"
          className={({ isActive }) =>
            `${item} ${isActive ? active : ""}`
          }
        >
          <i class="fa-solid fa-angle-right"></i> Active Delivery
        </NavLink>

        <NavLink
          to="/delivery/wallet"
          className={({ isActive }) =>
            `${item} ${isActive ? active : ""}`
          }
        >
          <i class="fa-solid fa-wallet"></i> My Wallet
        </NavLink>

      </div>

      {/* LOGOUT */}
      <div className="p-4 border-t border-black/5">
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
