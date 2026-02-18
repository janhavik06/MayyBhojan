import DeliverySidebar from "./DeliverySidebar";
import { Outlet } from "react-router-dom";

export default function DeliveryLayout() {
  return (
    <div className="flex">

      {/* SIDEBAR */}
      <DeliverySidebar />

      {/* MAIN CONTENT */}
      <main className="ml-64 flex-1 bg-[#F6F2EF] min-h-screen p-8">
        <Outlet />
      </main>

    </div>
  );
}
