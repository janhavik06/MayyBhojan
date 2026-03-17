import { Outlet } from "react-router-dom";

export default function DeliveryOnboardingLayout() {

  return (
    <div className="min-h-screen bg-[#F6F2EF]">

      {/* Navbar or header if needed */}

      <Outlet />

    </div>
  );

}