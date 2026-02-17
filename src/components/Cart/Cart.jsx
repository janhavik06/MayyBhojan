import { useCart } from "../Cart/CartContext";
import { Link ,useNavigate} from "react-router-dom";

export default function Cart() {
  const { cart, updateQty, removeItem, total } = useCart();
const navigate=useNavigate();
  const delivery = 35;
  const platform = 10;
  const grand = total + delivery + platform;

  return (
    <div className="min-h-screen bg-[#F6F2EF]">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-10 py-8">

        <Link to="/custalogin" className="text-sm text-gray-500">
          ← Back to Kitchens
        </Link>

        <div className="flex justify-between items-center mt-4">
          <h1 className="text-3xl font-bold">
            Your Food Basket{" "}
            <span className="text-orange-500 text-lg">
              ({cart.length} items)
            </span>
          </h1>

          <button className="border border-orange-300 text-orange-500 px-5 py-2 rounded-full text-sm">
            Save Basket for Later
          </button>
        </div>

        {/* Step Bar */}
        <div className="bg-white border rounded-2xl mt-6 px-10 py-6 flex justify-between text-sm text-gray-600">
          <div className="font-semibold text-orange-500">Review Cart</div>
          <div>Delivery Address</div>
          <div>Payment Method</div>
          <div>Confirmation</div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT CART ITEMS */}
        <div className="lg:col-span-2 space-y-6">

          {cart.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border shadow-sm p-6 flex gap-6">

              <img
                src={item.image}
                className="w-36 h-36 object-cover rounded-xl"
              />

              <div className="flex-1">

                <h3 className="font-semibold text-lg">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  by {item.chef}
                </p>

                <p className="text-orange-500 font-bold mt-2">
                  ₹{item.price}
                  <span className="text-xs text-gray-400 ml-2">
                    ₹{item.price} / plate
                  </span>
                </p>

                {/* Quantity */}
                <div className="flex items-center gap-4 mt-4">

                  <div className="flex items-center border rounded-full px-3 py-1 gap-3">
                    <button onClick={() => updateQty(item.id, -1)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)}>+</button>
                  </div>

                  <button className="text-gray-500 text-sm">
                    ♡ Save for Later
                  </button>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-500 text-sm"
                  >
                    🗑 Remove
                  </button>
                </div>

                {/* Notes */}
                <div className="mt-4 border rounded-xl px-4 py-3 text-sm text-gray-500">
                  Add special instructions for the homemaker...
                </div>

              </div>
            </div>
          ))}

          {/* Support Card */}
          <div className="bg-pink-50 border border-pink-200 rounded-2xl p-6 text-sm text-gray-700">
            ❤️ Making a Difference  
            <p className="mt-2">
              By ordering these meals, you're supporting local homemakers.
            </p>
          </div>

        </div>

        {/* RIGHT SUMMARY */}
        <div className="bg-white rounded-2xl border shadow-sm p-6 h-fit">

          <h2 className="font-semibold text-lg mb-4">
            Order Summary
          </h2>

          <div className="space-y-2 text-sm">

            <div className="flex justify-between">
              <span>Basket Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Student Fee</span>
              <span>₹{delivery}</span>
            </div>

            <div className="flex justify-between">
              <span>Platform Support Fee</span>
              <span>₹{platform}</span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between font-bold text-lg">
              <span>Grand Total</span>
              <span>₹{grand}</span>
            </div>

          </div>

          <button
  onClick={() => navigate("/address")}
  className="w-full mt-6 bg-orange-500 text-white py-4 rounded-xl font-semibold"
>
  Proceed to Address
</button>


        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 mt-16 pb-10">
        © 2024 MayBhojan · Made with ❤️ for Home Cooks · Privacy · Terms
      </div>

    </div>
  );
}
