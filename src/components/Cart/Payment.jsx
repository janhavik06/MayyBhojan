import { useState, useEffect } from "react"; // ✅ FIXED
import { useCart } from "./CartContext";
import { useNavigate, useLocation } from "react-router-dom";
import { createOrder } from "../../api/orderApi";
import { clearCart } from "../../api/cartApi";
import { getUser } from "../../utils/getUser";
import Confetti from "react-confetti";
export default function Payment() {
  const { cart, total, emptyCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const addressId = location.state?.addressId;

  const [method, setMethod] = useState("card");
  const [showSuccess, setShowSuccess] = useState(false); // ✅ FIXED

  const user = getUser();
  const userId = user?.id;

  const delivery = 35;
  const platform = 12;
const taxes = total * 0.05;
  const grand = total + delivery + platform + taxes;

  return (
    <div className="min-h-screen bg-[#F6F2EF]">
      {/* STEP TRACKER */}
      <div className="flex justify-center gap-20 py-8 text-sm">
        {["Cart", "Address", "Payment", "Confirm"].map((label, i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full border font-semibold
              ${
                i === 2
                  ? "bg-orange-500 text-white border-orange-500"
                  : i < 2
                    ? "bg-green-100 text-green-600 border-green-300"
                    : "bg-gray-100 text-gray-500"
              }`}
            >
              {i + 1}
            </div>

      const res = await createOrder({
        userId,
        addressId,
        paymentMethod: method,
        total: grand,
        items
      });

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT */}
        <div className="lg:col-span-2 bg-white rounded-2xl border shadow-sm p-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Choose Payment Method</h2>
            <span className="text-xs border px-3 py-1 rounded-full text-gray-500">
              🔒 Secure Transaction
            </span>
          </div>

          {/* METHODS */}
          <div className="space-y-4 mt-6">
            {[
              {
                id: "card",
                title: "Credit or Debit Card",
                desc: "Visa, Mastercard, RuPay supported",
              },
              {
                id: "upi",
                title: "UPI / Apps",
                desc: "Google Pay, PhonePe, UPI apps",
              },
              { id: "cod", title: "Cash on Delivery", desc: "Pay at doorstep" },
            ].map((m) => (
              <div
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={`p-5 rounded-2xl border cursor-pointer transition
                  ${
                    method === m.id
                      ? "border-orange-400 bg-orange-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{m.title}</h3>
                    <p className="text-sm text-gray-500">{m.desc}</p>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full border
                    ${
                      method === m.id
                        ? "bg-orange-500 border-orange-500"
                        : "border-gray-300"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* CARD FORM */}
          {method === "card" && (
            <div className="mt-8 border border-dashed rounded-2xl p-6 space-y-4">
              <input
                placeholder="Card Number"
                className="w-full border rounded-xl px-4 py-3"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="MM / YY"
                  className="border rounded-xl px-4 py-3"
                />
                <input
                  placeholder="CVV"
                  className="border rounded-xl px-4 py-3"
                />
              </div>

              <input
                placeholder="Name on Card"
                className="w-full border rounded-xl px-4 py-3"
              />

              <p className="text-xs text-gray-500">
                🔒 Your payment info is encrypted
              </p>
            </div>
          )}
        </div>

        {/* RIGHT SUMMARY */}
        <div className="bg-white rounded-2xl border shadow-sm p-6 h-fit">
          <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span>₹{delivery}</span>
            </div>

            <div className="flex justify-between">
              <span>Platform</span>
              <span>₹{platform}</span>
            </div>

            <div className="flex justify-between">
              <span>Taxes</span>
              <span>₹{taxes}</span>
            </div>

            <hr />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{grand}</span>
            </div>
          </div>

          <button
            onClick={confirmPayment}
            className="w-full mt-6 bg-orange-500 text-white py-4 rounded-xl"
          >
            Confirm Payment
          </button>
        </div>
      </div>

      {/* SUCCESS POPUP */}
    {showSuccess && (
  <>
    <Confetti recycle={false} numberOfPieces={300} />

          <Link
            to="/address"
            className="block text-center text-sm text-gray-500 mt-4"
          >
            ← Back to Address Selection
          </Link>
        </div>
      </div>

      </div>
    </div>
  );
}
