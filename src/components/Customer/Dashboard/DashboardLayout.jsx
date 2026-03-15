import { Outlet, NavLink, useNavigate } from "react-router-dom";

export default function DashboardLayout() {

  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (

    <div className="min-h-screen bg-[#F6F2EF] flex">

      {/* SIDEBAR */}

      <aside className="hidden md:flex w-64 bg-white shadow-md fixed left-0 top-0 bottom-0 z-40 flex-col">

        {/* LOGO */}

        <div className="p-6 border-b">
          <h1
            onClick={() => navigate("/custalogin")}
            className="text-xl font-bold text-orange-500 cursor-pointer"
          >
            MayBhojan
          </h1>
        </div>


        {/* MENU */}

        <div className="p-6 space-y-4 flex-1">

          <SidebarItem label="🏠 Browse Kitchens" to="/custalogin" />

          <SidebarItem label="📦 My Orders" to="/orders" end />

          <SidebarItem label="❤️ Favorites" to="/favorites" />

          <SidebarItem label="⚙️ Settings" to="/settings" />

        </div>


        {/* LOGOUT */}

        <div className="p-6 border-t">

          <button
            onClick={logout}
            className="flex items-center gap-3 text-red-500 hover:bg-red-50 p-3 rounded-lg w-full"
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
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