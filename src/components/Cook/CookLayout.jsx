import CookSidebar from "./CookSidebar";
import { Outlet } from "react-router-dom";

export default function CookLayout() {
  return (
    <div className="flex">

      <CookSidebar />

      {/* MAIN CONTENT */}
      <main className="ml-64 flex-1 min-h-screen bg-[#F6F2EF] p-8">
        <Outlet />
      </main>

    </div>
  );
}
