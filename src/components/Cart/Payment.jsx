import { useState } from "react";
import { useCart } from "../Cart/CartContext";
import { useNavigate, Link } from "react-router-dom";
import Confetti from "react-confetti";
import { useEffect } from "react";
export default function Payment() {
  const { total } = useCart();
  const navigate = useNavigate();
  const [method, setMethod] = useState("card");
  const [showSuccess, setShowSuccess] = useState(false);
  const delivery = 35;
  const platform = 12;
  const taxes = 28.5;
  const grand = total + delivery + platform + taxes;
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        navigate("/orders");
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [showSuccess, navigate]);
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

            <span
              className={`mt-2 ${
                i === 2 ? "text-orange-500 font-semibold" : "text-gray-500"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

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
              <span>₹{total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>₹{delivery}</span>
            </div>

            <div className="flex justify-between">
              <span>Platform Fee</span>
              <span>₹{platform}</span>
            </div>

            <div className="flex justify-between">
              <span>Taxes</span>
              <span>₹{taxes}</span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between font-bold text-lg">
              <span>Total Amount</span>
              <span>₹{grand.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => setShowSuccess(true)}
            className="w-full mt-6 bg-orange-500 text-white py-4 rounded-xl font-semibold"
          >
            Confirm Payment
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            By confirming, you agree to Terms & Privacy Policy
          </p>

          <Link
            to="/address"
            className="block text-center text-sm text-gray-500 mt-4"
          >
            ← Back to Address Selection
          </Link>
        </div>
      </div>

      {/* FOOTER ICONS */}
      <div className="max-w-7xl mx-auto px-10 mt-16 grid grid-cols-3 text-sm text-gray-600 text-center pb-12">
        <div>✔ Safe Payments</div>
        <div>⚡ Fast Delivery</div>
        <div>🚚 Student Partners</div>
      </div>
      {/* SUCCESS POPUP */}
      {/* SUCCESS POPUP */}
      {showSuccess && (
        <>
          <Confetti
            recycle={false}
            numberOfPieces={300}
            className="fixed inset-0 z-40"
          />

          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl shadow-2xl p-10 text-center w-[420px] animate-scaleIn">
              <div className="text-green-500 text-6xl mb-4">✔</div>

              <h2 className="text-2xl font-bold text-gray-800">
                Order Placed Successfully!
              </h2>

              <p className="text-gray-500 mt-2">
                Your food is being prepared 🍛
              </p>

              <p className="text-sm text-gray-400 mt-1">
                Redirecting to your orders...
              </p>

              <button
                onClick={() => navigate("/orders")}
                className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600"
              >
                View My Orders
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
