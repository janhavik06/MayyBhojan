import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

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
import Settings from "./components/Customer/Dashboard/Settings";
import DashboardLayout from "./components/Customer/Dashboard/DashboardLayout";
import Favorites from "./components/Customer/Dashboard/Favorites";
import CookALogin from "./components/Cook/CookALogin";
import CookVerification from "./components/Cook/CookVerification";
import CookBankSetup from "./components/Cook/CookBankSetup";
import CookDashboard from "./components/Cook/Dashboard/CookDashboard";
import CookLayout from "./components/Cook/CookLayout";
import CookMenu from "./components/Cook/Dashboard/CookMenu";
import CookEarnings from "./components/Cook/Dashboard/CookEarnings";
import CookKitchenInfo from "./components/Cook/Dashboard/CookKitchenInfo";
import DeliveryDashboard from "./components/Delivery/Dashboard/DeliveryDashboard";
import DeliveryLayout from "./components/Delivery/DeliveryLayout";
import ActiveOrder from "./components/Delivery/Dashboard/ActiveOrder";
import DeliveryWallet from "./components/Delivery/Dashboard/DeliveryWallet";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminDashboard from "./components/Admin/Dashboard/AdminDashboard";
import AdminApprovals from "./components/Admin/Dashboard/AdminApprovals";
import AdminTrustSafety from "./components/Admin/Dashboard/AdminTrustSafety";
import CookIdentityVerification from "./components/Cook/CookIdentityVerification";
export default function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    const user = JSON.parse(localStorage.getItem("maybhojan_user"));
    return !!user?.loggedIn;
  });

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          element={<Layout loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/custalogin" element={<CustALogin />} />
          <Route path="/cust" element={<CustALogin />} />
          <Route path="/explore" element={<CustALogin />} />

          <Route path="/food/:id" element={<FoodDetail />} />

          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />

          <Route
            path="/signup"
            element={<Signup setLoggedIn={setLoggedIn} />}
          />
          <Route path="/cart" element={<Cart />} />

          <Route path="/address" element={<Address />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/confirm" element={<Confirmation />} />
          <Route element={<DashboardLayout />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/orders" element={<Profile />} />
            <Route path="/favorites" element={<Favorites />} />
          </Route>

          <Route element={<CookLayout />}>
            <Route path="cookdashboard" element={<CookDashboard />} />
            <Route path="/cook/orders" element={<CookDashboard />} />

            <Route path="/cook/menu" element={<CookMenu />} />
            <Route path="/cook/earnings" element={<CookEarnings />} />
            <Route path="/cook/kitchen" element={<CookKitchenInfo />} />
          </Route>

          <Route path="/cook" element={<CookALogin />} />
          {/* <Route path="/delivery" element={<DeliveryDashboard />} />
<Route path="/admin" element={<AdminDashboard />} /> */}
          <Route path="/cook/verification" element={<CookVerification />} />
          <Route path="/cook/identity" element={<CookIdentityVerification />} />

          <Route path="/cook/bank" element={<CookBankSetup />} />

          <Route element={<DeliveryLayout />}>
            <Route path="/delivery" element={<DeliveryDashboard />} />
            <Route path="/delivery/active" element={<ActiveOrder />} />
            <Route path="/delivery/wallet" element={<DeliveryWallet />} />
          </Route>

          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/approvals" element={<AdminApprovals />} />
            <Route path="/admin/safety" element={<AdminTrustSafety />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/how" element={<How />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
