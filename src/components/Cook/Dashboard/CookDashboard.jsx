import { useState } from "react";

export default function CookDashboard() {
  const [online, setOnline] = useState(true);

  const orders = []; // mock empty state

  return (
    <div className="bg-[#F6F2EF] min-h-screen p-8">

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">

        {/* LEFT COLUMN */}
        <div className="space-y-8">

          {/* HERO WELCOME */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">

            <h1 className="text-3xl font-bold">
              Welcome back, Savita!
            </h1>

            <p className="text-gray-600 mt-2">
              Your kitchen is verified — here’s what’s happening today.
            </p>

            <div className="flex gap-3 mt-4 flex-wrap">

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                ✔ Verified
              </span>

              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                ★ 4.8 Rating
              </span>

              <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                Kitchen Live
              </span>

            </div>

            <div className="flex gap-4 mt-6 flex-wrap">

              <button className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold">
                + Add new meal
              </button>

              <button className="border px-6 py-3 rounded-xl">
                View daily orders
              </button>

            </div>

          </div>

          {/* TODAY ACTION CARD */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">

            <h2 className="font-semibold text-lg">
              Today’s Actions
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mt-6">

              {/* LEFT */}
              <div>

                <p className="text-gray-500 text-sm">
                  Orders Today
                </p>

                <p className="text-3xl font-bold mt-2">
                  {orders.length}
                </p>

                <button className="mt-4 bg-orange-500 text-white px-5 py-3 rounded-xl">
                  Open Orders
                </button>

              </div>

              {/* RIGHT checklist */}
              <div className="space-y-3">

                {["Confirm menu", "Update availability", "Check messages"].map(item => (
                  <label key={item} className="flex gap-3 items-center">
                    <input type="checkbox" className="w-5 h-5" />
                    <span>{item}</span>
                  </label>
                ))}

              </div>

            </div>

          </div>

          {/* ORDERS SECTION */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">

            <h2 className="font-semibold text-lg">
              Today’s Orders
            </h2>

            {orders.length === 0 ? (
              <div className="text-center mt-6">

                <p className="text-gray-600">
                  No orders yet — share your kitchen link to get noticed.
                </p>

                <button className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-xl">
                  Share Kitchen Link
                </button>

              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {/* order cards would go here */}
              </div>
            )}

          </div>

          {/* MENU SNAPSHOT */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">

            <h2 className="font-semibold text-lg">
              Menu Snapshot
            </h2>

            <div className="grid md:grid-cols-3 gap-4 mt-6">

              {["Paneer Butter Masala", "Veg Thali", "Chicken Biryani"].map(meal => (
                <div key={meal} className="border rounded-xl p-4">

                  <h4 className="font-semibold">
                    {meal}
                  </h4>

                  <p className="text-sm text-green-600">
                    Available
                  </p>

                </div>
              ))}

            </div>

            <button className="mt-6 text-orange-500 font-semibold">
              Edit Menu →
            </button>

          </div>

          {/* EARNINGS */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">

            <h2 className="font-semibold text-lg">
              Earnings Snapshot
            </h2>

            <div className="grid grid-cols-3 gap-4 text-center mt-6">

              <div>
                <p className="text-gray-500 text-sm">Today</p>
                <p className="font-bold text-xl">₹1,250</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Week</p>
                <p className="font-bold text-xl">₹8,420</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Balance</p>
                <p className="font-bold text-xl">₹5,000</p>
              </div>

            </div>

            <button className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-xl">
              Request payout
            </button>

          </div>

          {/* MESSAGES */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">

            <h2 className="font-semibold text-lg">
              Messages
            </h2>

            <p className="text-gray-600 mt-3">
              No new messages.
            </p>

          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-8">

          {/* AVAILABILITY */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">

            <h2 className="font-semibold text-lg">
              Availability
            </h2>

            <p className="text-gray-600 mt-2">
              Going offline pauses new orders.
            </p>

            <button
              onClick={() => setOnline(!online)}
              className={`mt-6 w-full py-4 rounded-xl font-semibold
                ${online ? "bg-green-500 text-white" : "bg-gray-300"}
              `}
            >
              {online ? "Online" : "Offline"}
            </button>

          </div>

          {/* PROFILE */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">

            <h2 className="font-semibold text-lg">
              Kitchen Profile
            </h2>

            <p className="text-gray-600 mt-3">
              Savita’s Kitchen • Pune
            </p>

            <button className="mt-4 text-orange-500 font-semibold">
              View public page →
            </button>

          </div>

          {/* SUPPORT */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">

            <h2 className="font-semibold text-lg">
              Support
            </h2>

            <button className="mt-4 bg-orange-500 text-white w-full py-3 rounded-xl">
              Call Support
            </button>

            <button className="mt-3 border w-full py-3 rounded-xl">
              Request Callback
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}
