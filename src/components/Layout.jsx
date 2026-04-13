import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

export default function Layout({ loggedIn }) {
  const [language, setLanguage] = useState("en");
  const location = useLocation();

  // show footer only on home page
  const showFooter = location.pathname === "/";

  return (
    <>
      <Navbar
        language={language}
        setLanguage={setLanguage}
        loggedIn={loggedIn}
      />

      <Outlet />

      {showFooter && <Footer loggedIn={loggedIn} />}
    </>
  );
}
