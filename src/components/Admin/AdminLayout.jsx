import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="ml-64 flex-1 min-h-screen bg-[#F6F2EF] p-8">
        <Outlet />
      </main>
    </div>
  );
}
