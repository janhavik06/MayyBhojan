import React, { useEffect, useState } from "react";
import {
  FiNavigation,
  FiPhone,
  FiMapPin,
  FiCheck,
  FiRefreshCw,
} from "react-icons/fi";

export default function ActiveOrder() {
  const [order, setOrder] = useState(null);

  const [status, setStatus] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("active_delivery_status")) || "accepted"
    );
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("active_delivery"));
    if (saved) setOrder(saved);
  }, []);

  function updateStatus(next) {
    setStatus(next);
    localStorage.setItem("active_delivery_status", JSON.stringify(next));
  }

  function completeDelivery() {
    const history = JSON.parse(localStorage.getItem("delivery_history")) || [];

    history.push({
      ...order,
      completedAt: new Date().toISOString(),
    });

    localStorage.setItem("delivery_history", JSON.stringify(history));

    localStorage.removeItem("active_delivery");
    localStorage.removeItem("active_delivery_status");

    setOrder(null);
  }

  function openMaps() {
    const destination =
      status === "picked_up" || status === "on_the_way"
        ? order.drop
        : order.address;

    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`,
    );
  }

  if (!order) return <EmptyState />;

  function refreshOrders() {
    const saved = JSON.parse(localStorage.getItem("active_delivery"));

    if (saved) {
      setOrder(saved);
    } else {
      setOrder(null);
    }
  }

  return (
    <div className="min-h-screen bg-[#F6F2EF] p-6">
      {/* HEADER */}
      <div className="bg-white rounded-2xl shadow-sm p-5 mb-6 flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500">Active Order</p>
          <h2 className="font-semibold">{order.kitchen}</h2>
          <p className="text-xs text-gray-400">Order ID: #{order.id}</p>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-500">Earnings</p>
          <p className="text-lg font-bold text-orange-500">₹{order.earn}</p>
        </div>
      </div>

      {/* STATUS */}
      <div className="bg-white rounded-xl p-4 mb-6">
        <div className="flex justify-between text-xs font-medium">
          {["Accepted", "Picked Up", "On the Way", "Delivered"].map((s, i) => (
            <div
              key={i}
              className={`flex-1 text-center ${
                i <= getIndex(status) ? "text-orange-500" : "text-gray-400"
              }`}
            >
              {s}
            </div>
          ))}
        </div>

        <div className="mt-3 h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-orange-500 rounded-full"
            style={{
              width: `${(getIndex(status) / 3) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* MAIN */}
      <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
        {/* LEFT: NAVIGATION + ACTION */}
        <div className="space-y-5">
          {/* NAVIGATION */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-semibold mb-3">Navigation</h3>

            <button
              onClick={openMaps}
              className="w-full bg-orange-500 text-white py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <FiNavigation /> Open Maps
            </button>

            <p className="text-xs text-gray-500 mt-2 text-center">
              {status === "picked_up" || status === "on_the_way"
                ? "Heading to customer"
                : "Navigate to pickup location"}
            </p>
          </div>

          {/* QUICK ACTIONS */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-semibold mb-3">Quick Actions</h3>

            <div className="grid grid-cols-2 gap-3">
              <button className="border rounded-xl py-2 flex items-center justify-center gap-2">
                <FiPhone /> Call Kitchen
              </button>

              <button className="border rounded-xl py-2 flex items-center justify-center gap-2">
                <FiPhone /> Call Customer
              </button>

              <button
                onClick={refreshOrders}
                className="border rounded-xl py-2 flex items-center justify-center gap-2"
              >
                <FiRefreshCw /> Refresh
              </button>

              <button className="border rounded-xl py-2 text-red-500">
                Report Issue
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: DETAILS */}
        <div className="space-y-4">
          <Card title="Pickup">
            <p className="font-medium">{order.kitchen}</p>
            <p className="text-sm text-gray-500">{order.address}</p>
          </Card>

          <Card title="Drop">
            <p className="font-medium">{order.drop}</p>
          </Card>

          <Card title="Order Items">
            <p className="text-sm">{order.items}</p>
          </Card>

          {/* ACTION BUTTON */}
          <div>
            {status === "accepted" && (
              <PrimaryBtn onClick={() => updateStatus("picked_up")}>
                Confirm Pickup
              </PrimaryBtn>
            )}

            {status === "picked_up" && (
              <PrimaryBtn onClick={() => updateStatus("on_the_way")}>
                Start Delivery
              </PrimaryBtn>
            )}

            {status === "on_the_way" && (
              <PrimaryBtn
                onClick={() => {
                  updateStatus("delivered");
                  completeDelivery();
                }}
              >
                Complete Delivery
              </PrimaryBtn>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

//////////////////////
// EMPTY STATE
//////////////////////

function EmptyState() {
  return (
    <div className="min-h-screen bg-[#f4f4f5] flex items-center justify-center">
      <div className="bg-white border rounded-xl p-8 text-center w-full max-w-md">
        <p className="font-medium">No active delivery</p>
        <p className="text-sm text-gray-500 mt-2">
          Waiting for new assignments.
        </p>
      </div>
    </div>
  );
}

//////////////////////
// HELPERS
//////////////////////

function getIndex(status) {
  const map = {
    accepted: 0,
    picked_up: 1,
    on_the_way: 2,
    delivered: 3,
  };
  return map[status];
}

function Card({ title, children }) {
  return (
    <div className="bg-white border rounded-xl p-4">
      <p className="text-xs text-gray-500 mb-2">{title}</p>
      {children}
    </div>
  );
}

function PrimaryBtn({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-black text-white py-3 rounded-lg font-medium"
    >
      {children}
    </button>
  );
}
