import CookSidebar from "./CookSidebar";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function CookLayout() {
  const [language, setLanguage] = useState("en");

  return (
    <>
      {/* Navbar visible */}
      <Navbar language={language} setLanguage={setLanguage} loggedIn />

      <div className="flex min-h-screen">
        <CookSidebar />

        {/* MAIN CONTENT */}
        <main className="ml-64 flex-1 bg-[#F6F2EF]">
          <Outlet />
        </main>
      </div>
    </>
  );
}
