import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Layout from "./components/Layout";
import About from "./components/Navbar/About";
import How from "./components/Navbar/How";
import HomePage from "./Pages/HomePage";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import CustALogin from "./components/Customer/CustALogin";
import FoodDetail from "./components/Customer/FoodDetails";
import Cart from "./components/Cart/Cart";
import Address from "./components/Cart/Address";
import Payment from "./components/Cart/Payment";
import Confirmation from "./components/Cart/Confirmation";
import Profile from "./components/Customer/Dashboard/Profile";
import ScrollToTop from "./ScrollToTop";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // restore session on refresh
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("maybhojan_user"));
    if (user?.loggedIn) setLoggedIn(true);
  }, []);

  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Routes>
        <Route
          element={
            <Layout
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
            />
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/custalogin" element={<CustALogin />} />
          <Route path="/food/:id" element={<FoodDetail />} />

          <Route
            path="/login"
            element={<Login setLoggedIn={setLoggedIn} />}
          />

          <Route
            path="/signup"
            element={<Signup setLoggedIn={setLoggedIn} />}
          />
<Route path="/cart" element={<Cart/>} />

<Route path="/address" element={<Address />} />
<Route path="/payment" element={<Payment />} />
<Route path="/confirm" element={<Confirmation />} />
<Route path="/profile" element={<Profile />} />

          <Route path="/about" element={<About />} />
          <Route path="/how" element={<How />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
