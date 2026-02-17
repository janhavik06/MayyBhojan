import { useEffect } from "react";

export default function Confirmation() {

  useEffect(() => {
    const live = document.getElementById("aria-status");
    if (live) {
      live.textContent =
        "Order confirmed. Food is on the way. Estimated arrival 22 to 28 minutes.";
    }
  }, []);

  return (
    <div className="min-h-screen ">

      {/* ARIA status */}
      <div id="aria-status" aria-live="polite" className="sr-only" />

      {/* HEADER MESSAGE */}
      <div className="text-center pt-14">

        <div className="text-4xl">✅</div>

        <h1 className="text-3xl font-semibold mt-4">
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
      <div className="max-w-6xl mx-auto mt-10 bg-white rounded-2xl shadow p-8 flex justify-between text-sm">

        {["Confirmed", "Preparing", "On the way", "Arrived"].map(
          (step, i) => (
            <div key={i} className="flex flex-col items-center flex-1">

              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center
                ${i <= 1 ? "bg-orange-500 text-white" : "bg-gray-200"}`}
              >
                {i === 0 && "✔"}
                {i === 1 && "🍴"}
                {i === 2 && "🚴"}
                {i === 3 && "📍"}
              </div>

              <span className="mt-2">{step}</span>

              {i < 3 && (
                <div
                  className={`h-1 w-full mt-3
                  ${i < 1 ? "bg-orange-400" : "bg-gray-200"}`}
                />
              )}
            </div>
          )
        )}

      </div>

      {/* MAIN GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-8 mt-10">

        {/* MAP + ETA */}
        <div className="col-span-8">

          <div className="relative bg-white rounded-2xl shadow overflow-hidden">

            <img
              src="https://maps.googleapis.com/maps/api/staticmap?center=Delhi&zoom=12&size=800x400&key=YOUR_KEY"
              alt="Map preview"
              className="w-full h-[360px] object-cover opacity-70"
            />

            <div className="absolute top-6 left-6 bg-white px-5 py-3 rounded-xl shadow text-sm">
              <div className="font-semibold text-orange-500">
                Estimated Arrival
              </div>
              <div className="text-lg font-bold">
                22 – 28 mins
              </div>
            </div>

          </div>

          {/* DELIVERY PARTNER */}
          <div className="bg-white rounded-2xl shadow p-6 mt-6 flex justify-between items-center">

            <div className="flex gap-4 items-center">
              <img
                src="https://i.pravatar.cc/80"
                className="w-16 h-16 rounded-full"
              />

              <div>
                <p className="font-semibold">
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
              <button className="bg-orange-500 text-white px-6 py-3 rounded-xl">
                📞 Call Rahul
              </button>
              <button className="border px-6 py-3 rounded-xl">
                💬 Chat
              </button>
            </div>

          </div>

        </div>

        {/* ORDER SUMMARY SIDE */}
        <div className="col-span-4 space-y-6">

          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-semibold text-lg">
              🍴 Order Summary
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Order ID: #MB-98231
            </p>

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

            <button className="mt-4 underline text-sm">
              View Full Receipt
            </button>

          </div>

          {/* SAFETY CARD */}
          <div className="bg-white rounded-2xl shadow p-6 text-sm">

            <p className="font-semibold mb-2">🛡 Safety First</p>

            <ul className="space-y-2 text-gray-600">
              <li>Choose “Leave at Door” for contactless delivery</li>
              <li>Kitchen follows 10-point hygiene checklist</li>
            </ul>

          </div>

        </div>

      </div>

      {/* ACTION BUTTONS */}
      <div className="max-w-4xl mx-auto mt-10 flex gap-6 justify-center">

        <button className="border px-8 py-4 rounded-xl text-lg">
          🔁 Reorder This Meal
        </button>

        <button className="bg-gray-200 px-8 py-4 rounded-xl text-lg">
          🆘 Get Help & Support
        </button>

      </div>

      {/* WHAT HAPPENS NEXT */}
      <div className="max-w-6xl mx-auto mt-14 border border-dashed border-orange-200 rounded-2xl p-10 text-center">

        <h2 className="text-xl font-semibold mb-8">
          What happens next?
        </h2>

        <div className="grid grid-cols-3 gap-8 text-sm">

          <div>
            <div className="text-2xl font-bold text-orange-500">1</div>
            <p className="font-semibold mt-2">Partner Arrival</p>
            <p className="text-gray-600 mt-1">
              Rahul will notify you when he arrives.
            </p>
          </div>

          <div>
            <div className="text-2xl font-bold text-orange-500">2</div>
            <p className="font-semibold mt-2">Fresh & Warm</p>
            <p className="text-gray-600 mt-1">
              Meals travel in insulated bags.
            </p>
          </div>

          <div>
            <div className="text-2xl font-bold text-orange-500">3</div>
            <p className="font-semibold mt-2">Share the Love</p>
            <p className="text-gray-600 mt-1">
              Don’t forget to rate your experience!
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
