import React from "react";

export default function ActiveOrder() {
  return (
    <div className="min-h-screen bg-[#f7f5f3] p-6">

      {/* STATUS TRACKER */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex justify-center gap-16 text-sm font-semibold">
          <div className="text-green-600">Kitchen Pickup</div>
          <div className="text-orange-500 border-b-2 border-orange-500 pb-1">
            In Transit
          </div>
          <div className="text-gray-400">Delivered</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* MAP SECTION */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-4 relative">

          <img
            src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83"
            alt="map"
            className="rounded-xl w-full h-[420px] object-cover"
          />

          {/* ETA BOX */}
          <div className="absolute top-8 left-8 bg-white rounded-xl shadow-md p-4 w-56">
            <p className="font-bold text-lg">8 mins away</p>
            <p className="text-gray-500 text-sm">
              Traffic is light on Main Street.
            </p>
          </div>

          {/* PRICE BADGE */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-6 py-3 rounded-full font-bold shadow-lg">
            ₹45.00
          </div>
        </div>

        {/* DETAILS PANEL */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-5">

          <h2 className="text-xl font-bold">Delivery Details</h2>

          {/* PICKUP */}
          <div className="border rounded-xl p-4 space-y-2">
            <p className="text-gray-500 text-sm">Pickup</p>
            <p className="font-semibold">Aunty's Spice Kitchen</p>
            <p className="text-sm text-gray-500">
              Flat 402, Sunshine Apartments, Mohali
            </p>
            <button className="w-full mt-2 border rounded-lg py-2 hover:bg-gray-100">
              📞 Call Kitchen
            </button>
          </div>

          {/* DELIVERY */}
          <div className="border rounded-xl p-4 space-y-2">
            <p className="text-gray-500 text-sm">Delivery</p>
            <p className="font-semibold">Rohan Sharma</p>
            <p className="text-sm text-gray-500">
              Boys Hostel Block C, Chandigarh
            </p>
            <button className="w-full mt-2 border rounded-lg py-2 hover:bg-gray-100">
              📞 Call Customer
            </button>
          </div>

          {/* INSTRUCTIONS */}
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="font-semibold">Special Instructions</p>
            <p className="text-sm text-gray-600">
              Leave at gate if not reachable.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
