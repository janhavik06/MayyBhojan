import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function DeliveryOnboardingLayout({ loggedIn }) {
  return (
    <>
      <Navbar loggedIn={loggedIn} />

      <main className="min-h-screen bg-[#F6F2EF]">
        <Outlet />
      </main>
    </>
  );
}
