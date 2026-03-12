import { useEffect } from "react";

import {
  FaCheckCircle,
  FaUtensils,
  FaMotorcycle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaCommentDots,
  FaShieldAlt,
  FaRedoAlt,
  FaHeadset,
} from "react-icons/fa";

import { MdRestaurantMenu } from "react-icons/md";
import { HiUserCircle } from "react-icons/hi";

export default function Confirmation() {
  useEffect(() => {
    const live = document.getElementById("aria-status");
    if (live) {
      live.textContent =
        "Order confirmed. Food is on the way. Estimated arrival 22 to 28 minutes.";
    }
  }, []);

  const steps = [
    { label: "Confirmed", icon: <FaCheckCircle /> },
    { label: "Preparing", icon: <FaUtensils /> },
    { label: "On the way", icon: <FaMotorcycle /> },
    { label: "Arrived", icon: <FaMapMarkerAlt /> },
  ];

  return (
    <div className="min-h-screen bg-[#F7F4F1] pb-16 fade-in">
      <div id="aria-status" aria-live="polite" className="sr-only" />

      {/* HEADER */}
      <div className="text-center pt-14">
        <div className="flex justify-center pulse-soft">
          <FaCheckCircle className="text-green-500 text-5xl" />
        </div>

        <h1 className="text-3xl font-semibold mt-4 text-gray-900">
          Food is on the way!
        </h1>

        <p className="text-gray-600 mt-3 text-lg">
          Relax! Your order from{" "}
          <span className="text-orange-500 font-semibold">
            Aunty's Spice Kitchen
          </span>{" "}
          is being prepared with love and care.
        </p>
      </div>

      {/* STEPPER */}
      <div className="max-w-6xl mx-auto mt-10 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex justify-between text-sm">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center flex-1 reveal">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-lg
              ${i <= 1 ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-500"}`}
            >
              {step.icon}
            </div>

            <span className="mt-2 font-medium text-gray-700">{step.label}</span>

            {i < 3 && (
              <div
                className={`h-1 w-full mt-3
                ${i < 1 ? "bg-orange-400" : "bg-gray-200"}`}
              />
            )}
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-8 mt-10">
        {/* MAP */}
        <div className="col-span-8">
          <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden card-hover">
            <img
              src="https://maps.googleapis.com/maps/api/staticmap?center=Delhi&zoom=12&size=800x400"
              alt="Map preview"
              className="w-full h-[360px] object-cover opacity-80"
            />

            <div className="absolute top-6 left-6 bg-white px-5 py-3 rounded-xl shadow text-sm float-soft">
              <div className="font-semibold text-orange-500">
                Estimated Arrival
              </div>
              <div className="text-lg font-bold">22 – 28 mins</div>
            </div>
          </div>

          {/* DELIVERY CARD */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6 flex justify-between items-center card-hover">
            <div className="flex gap-4 items-center">
              <HiUserCircle className="text-gray-400 text-6xl" />

              <div>
                <p className="font-semibold text-gray-800">
                  Rahul Sharma ★ 4.9
                </p>
                <p className="text-sm text-gray-500">
                  Student at Delhi University
                </p>
                <p className="text-xs text-gray-400">
                  Delivered 120+ warm meals
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium btn-press">
                <FaPhoneAlt />
                Call Rahul
              </button>

              <button className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 px-6 py-3 rounded-xl font-medium btn-press">
                <FaCommentDots />
                Chat
              </button>
            </div>
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div className="col-span-4 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 card-hover">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <MdRestaurantMenu />
              Order Summary
            </h2>

            <p className="text-sm text-gray-500 mt-1">Order ID: #MB-98231</p>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>2× Paneer Thali</span>
                <span>₹440</span>
              </div>

              <div className="flex justify-between">
                <span>1× Butter Roti</span>
                <span>₹60</span>
              </div>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between font-bold text-lg text-orange-500">
              <span>Total</span>
              <span>₹500</span>
            </div>
          </div>

          {/* SAFETY CARD */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-sm card-hover">
            <p className="font-semibold mb-3 flex items-center gap-2">
              <FaShieldAlt className="text-orange-500" />
              Safety First
            </p>

            <ul className="space-y-2 text-gray-600">
              <li>Choose “Leave at Door” for contactless delivery</li>
              <li>Kitchen follows 10-point hygiene checklist</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="max-w-4xl mx-auto mt-12 flex gap-6 justify-center">
        <button className="flex items-center gap-2 border border-gray-300 hover:bg-gray-100 px-8 py-4 rounded-xl text-lg font-medium btn-press">
          <FaRedoAlt />
          Reorder This Meal
        </button>

        <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-8 py-4 rounded-xl text-lg font-medium btn-press">
          <FaHeadset />
          Get Help & Support
        </button>
      </div>

      {/* WHAT HAPPENS NEXT */}
      <div className="max-w-6xl mx-auto mt-14 border border-dashed border-orange-200 rounded-2xl p-10 text-center bg-white">
        <h2 className="text-xl font-semibold mb-8">What happens next?</h2>

        <div className="grid grid-cols-3 gap-8 text-sm">
          {[1, 2, 3].map((n) => (
            <div key={n} className="reveal">
              <div className="text-2xl font-bold text-orange-500">{n}</div>

              <p className="font-semibold mt-2">
                {n === 1 && "Partner Arrival"}
                {n === 2 && "Fresh & Warm"}
                {n === 3 && "Share the Love"}
              </p>

              <p className="text-gray-600 mt-1">
                {n === 1 && "Rahul will notify you when he arrives."}
                {n === 2 && "Meals travel in insulated bags."}
                {n === 3 && "Don’t forget to rate your experience!"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
