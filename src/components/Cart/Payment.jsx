import { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { useNavigate, useLocation } from "react-router-dom";
import { createOrder } from "../../api/orderApi";
import { clearCart } from "../../api/cartApi";
import { getUser } from "../../utils/getUser";

export default function Payment() {

  const { cart, total, emptyCart } = useCart();

  const navigate = useNavigate();
  const location = useLocation();

  const addressId = location.state?.addressId;

  const [method, setMethod] = useState("card");
  const [showSuccess, setShowSuccess] = useState(false);

  const user = getUser();
  const userId = user?.id;

  const delivery = 35;
  const platform = 12;
  const taxes = 28.5;

  const grand = total + delivery + platform + taxes;

  useEffect(() => {

    if (showSuccess) {

      const timer = setTimeout(() => {
        navigate("/confirm");
      }, 3500);

      return () => clearTimeout(timer);

    }

  }, [showSuccess, navigate]);

  async function confirmPayment() {

    try {

      const items = cart.map(i => ({
        foodId: i.foodId,
        qty: i.qty,
        price: i.price
      }));

      const res = await createOrder({
        userId: userId,
        addressId: addressId,
        paymentMethod: method,
        total: grand,
        items: items
      });

      const orderId = res.data.id;

      await clearCart(userId);

      emptyCart();

      setShowSuccess(true);

      setTimeout(() => {

        navigate("/confirm", {
          state: { orderId }
        });

      }, 2000);

    } catch (err) {

      console.error("Payment error", err);

    }

  }

  return (

    <div className="min-h-screen bg-[#F6F2EF]">

      <div className="max-w-7xl mx-auto px-10 grid lg:grid-cols-3 gap-10">

        {/* PAYMENT METHODS */}
        <div className="lg:col-span-2 bg-white rounded-2xl border p-8">

          <h2 className="text-xl font-bold">
            Choose Payment Method
          </h2>

          <div className="space-y-4 mt-6">

            <div
              onClick={() => setMethod("card")}
              className={`p-5 border rounded-xl cursor-pointer
              ${method === "card" ? "border-orange-500 bg-orange-50" : ""}`}
            >
              Credit / Debit Card
            </div>

            <div
              onClick={() => setMethod("upi")}
              className={`p-5 border rounded-xl cursor-pointer
              ${method === "upi" ? "border-orange-500 bg-orange-50" : ""}`}
            >
              UPI
            </div>

            <div
              onClick={() => setMethod("cod")}
              className={`p-5 border rounded-xl cursor-pointer
              ${method === "cod" ? "border-orange-500 bg-orange-50" : ""}`}
            >
              Cash on Delivery
            </div>

          </div>

        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-white rounded-2xl border p-6 h-fit">

          <h2 className="font-semibold text-lg mb-4">
            Order Summary
          </h2>

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

          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

            <div className="bg-white rounded-3xl shadow-2xl p-10 text-center w-[420px]">

              <div className="text-green-500 text-6xl mb-4">✔</div>

              <h2 className="text-2xl font-bold text-gray-800">
                Order Placed Successfully!
              </h2>

              <p className="text-gray-500 mt-2">
                Your food is being prepared 🍛
              </p>

              <p className="text-sm text-gray-400 mt-1">
                Redirecting to your order tracking...
              </p>

              <button
                onClick={() => navigate("/orders")}
                className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold"
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