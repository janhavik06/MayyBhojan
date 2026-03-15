import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Tracker from "./Tracker";

function Confirmation() {

  const location = useLocation();
  const navigate = useNavigate();

  const orderId = location.state?.orderId;

  const [status, setStatus] = useState("PLACED");

  useEffect(() => {

    if (!orderId) {
      navigate("/custalogin");
      return;
    }

    async function fetchStatus() {

      try {

        const res = await axios.get(
          `http://localhost:8080/api/orders/${orderId}`
        );

        setStatus(res.data.status);

      } catch (err) {
        console.error("Tracking error", err);
      }

    }

    // first fetch
    fetchStatus();

    // live polling every 3 seconds
    const interval = setInterval(fetchStatus, 3000);

    return () => clearInterval(interval);

  }, [orderId]);

  return (

    <div className="min-h-screen bg-[#F6F2EF]">

      {/* BACK BUTTON */}
      <div className="max-w-5xl mx-auto pt-10 px-6">

        <button
          onClick={() => navigate("/custalogin")}
          className="text-gray-600 hover:text-orange-500"
        >
          ← Back to Kitchens
        </button>

      </div>

      {/* HEADER */}
      <div className="text-center mt-10">

        <div className="text-4xl">🍲</div>

        <h1 className="text-3xl font-semibold mt-4">
          Tracking your order
        </h1>

        <p className="text-gray-500 mt-2">
          Order ID: #{orderId}
        </p>

      </div>

      {/* DELIVERY TRACKER */}
      <Tracker status={status} />

    </div>

  );

}

export default Confirmation;