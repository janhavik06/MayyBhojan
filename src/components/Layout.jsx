import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

export default function Layout({ loggedIn }) {
  const [language, setLanguage] = useState("en");

  return (
    <>
      <Navbar
        language={language}
        setLanguage={setLanguage}
        loggedIn={loggedIn}
      />

      <Outlet />
      <Footer loggedIn={loggedIn} />
      </>
  );
}
