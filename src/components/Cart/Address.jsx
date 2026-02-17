import { useCart } from "../Cart/CartContext";
import { useNavigate } from "react-router-dom";

export default function Address() {
  const { total } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F6F2EF]">

      {/* STEP TRACKER */}
      <div className="flex justify-center gap-20 py-8 text-sm">

        {[
          { id: 1, label: "Cart" },
          { id: 2, label: "Address" },
          { id: 3, label: "Payment" },
          { id: 4, label: "Confirm" },
        ].map((s) => (
          <div key={s.id} className="flex flex-col items-center">

            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full border font-semibold
              ${
                s.id === 2
                  ? "bg-orange-500 text-white border-orange-500"
                  : s.id < 2
                  ? "bg-green-100 text-green-600 border-green-300"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {s.id}
            </div>

            <span
              className={`mt-2 ${
                s.id === 2 ? "text-orange-500 font-semibold" : "text-gray-500"
              }`}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT FORM */}
        <div className="lg:col-span-2 bg-white rounded-2xl border shadow-sm p-8">

          <h1 className="text-3xl font-bold">
            Where should we deliver?
          </h1>

          <p className="text-gray-500 mt-2">
            Enter your delivery details for a hot and fresh meal experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

            <input placeholder="Full Name" className="border rounded-xl px-4 py-3" />
            <input placeholder="Mobile Number" className="border rounded-xl px-4 py-3" />

            <input placeholder="Flat / House No." className="border rounded-xl px-4 py-3" />
            <input placeholder="Area / Locality" className="border rounded-xl px-4 py-3" />

            <input placeholder="Landmark" className="border rounded-xl px-4 py-3" />
            <input placeholder="Pincode" className="border rounded-xl px-4 py-3 border-red-300" />

          </div>

          {/* Save Address */}
          <div className="mt-8">
            <p className="font-semibold mb-3">Save Address As:</p>

            <div className="flex gap-4">
              <button className="bg-orange-500 text-white px-6 py-2 rounded-xl">
                Home
              </button>
              <button className="border px-6 py-2 rounded-xl">Work</button>
              <button className="border px-6 py-2 rounded-xl">Other</button>
            </div>
          </div>

          <div className="mt-6 border border-dashed rounded-xl p-4 text-sm text-gray-600">
            Save this address for future cravings
          </div>

          {/* Continue */}
          <button
            onClick={() => navigate("/payment")}
            className="w-full mt-10 bg-orange-500 text-white py-4 rounded-xl font-semibold text-lg"
          >
            Continue to Payment →
          </button>

          <p className="text-xs text-gray-500 mt-3 text-center">
            Prices include all local taxes and delivery fees.
          </p>

        </div>

        {/* RIGHT SUMMARY */}
        <div className="bg-white rounded-2xl border shadow-sm p-6 h-fit">

          <h2 className="font-semibold text-lg mb-4">
            Order Summary
          </h2>

          <div className="space-y-2 text-sm">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>FREE</span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between font-bold text-lg text-orange-500">
              <span>Total Pay</span>
              <span>₹{total}</span>
            </div>

          </div>

          <div className="mt-6 flex gap-3 text-sm text-gray-600">
            <div className="border rounded-xl px-4 py-2">Secure Payments</div>
            <div className="border rounded-xl px-4 py-2">Live Tracking</div>
          </div>

        </div>

      </div>
    </div>
  );
}
