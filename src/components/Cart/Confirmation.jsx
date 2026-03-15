import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Tracker from "./Tracker";

export default function Confirmation() {

  const location = useLocation();
  const navigate = useNavigate();

  const orderId = location.state?.orderId;

  const [status, setStatus] = useState("PLACED");

  useEffect(() => {

    if (!orderId) return;

    const interval = setInterval(async () => {

      try {

        const res = await axios.get(
          `http://localhost:8080/api/orders/${orderId}`
        );

        setStatus(res.data.status);

      } catch (err) {

        console.error("Order fetch error", err);

      }

    }, 4000);

    return () => clearInterval(interval);

  }, [orderId]);


  return (

    <div className="min-h-screen bg-[#F6F2EF]">

      {/* BACK BUTTON */}

      <div className="max-w-5xl mx-auto pt-8 px-6">

        <button
          onClick={() => navigate("/custalogin")}
          className="text-sm text-gray-600 hover:text-orange-500"
        >
          ← Back to Kitchens
        </button>

      </div>


      {/* HEADER */}

      <div className="text-center pt-10">

        <div className="text-4xl">🍲</div>

        <h1 className="text-3xl font-semibold mt-4">
          Tracking your order
        </h1>

      </div>


      <Tracker step={4} />


      {/* STATUS */}

      <div className="max-w-3xl mx-auto mt-10 bg-white rounded-xl p-8 shadow">

        <h2 className="font-semibold text-lg mb-6">
          Delivery Progress
        </h2>

        <div className="space-y-6">

          <StatusItem
            active={status === "PLACED"}
            label="Order Placed"
          />

          <StatusItem
            active={status === "ACCEPTED"}
            label="Delivery Partner Assigned"
          />

          <StatusItem
            active={status === "DELIVERING"}
            label="Out for Delivery"
          />

          <StatusItem
            active={status === "DELIVERED"}
            label="Delivered"
          />

        </div>

      </div>

    </div>

  );

}


function StatusItem({ active, label }) {

  return (

    <div className="flex items-center gap-4">

      <div
        className={`w-4 h-4 rounded-full ${
          active ? "bg-green-500" : "bg-gray-300"
        }`}
      />

      <span
        className={`${
          active ? "text-green-600 font-semibold" : "text-gray-500"
        }`}
      >
        {label}
      </span>

    </div>

  );

}