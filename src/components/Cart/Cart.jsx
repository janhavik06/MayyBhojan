import { useCart } from "./CartContext";
import { useFavorites } from "../Customer/Dashboard/FavoriteContext";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {

  const { cart, updateQty, removeItem, updateNote, total } = useCart();
  const { toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  const delivery = 35;
  const platform = 10;

  const grand = total + delivery + platform;

  const itemCount = cart.reduce((sum, i) => sum + (i.qty || 0), 0);

  function saveForLater(item) {
    toggleFavorite(item);
    removeItem(item.cartId); // ✅ fixed
  }

  return (

    <div className="min-h-screen bg-[#F6F2EF]">

      <div className="max-w-7xl mx-auto px-10 py-8">

        <Link
          to="/custalogin"
          className="text-sm hover:text-orange-400 text-gray-500"
        >
          ← Back to Kitchens
        </Link>

        <h1 className="text-3xl font-bold mt-4">
          Your Food Basket
          <span className="text-orange-500 text-lg ml-2">
            ({itemCount} items)
          </span>
        </h1>

      </div>

      <div className="max-w-7xl mx-auto px-10 grid lg:grid-cols-3 gap-10">

        {/* CART ITEMS */}
        <div className="lg:col-span-2 space-y-6">

          {cart.map((item, index) => (
  <div
    key={item.cartId || index}
    className="bg-white rounded-2xl border shadow-sm p-6 flex gap-6"
  >

              {/* Image Placeholder */}
              <div className="w-36 h-36 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                Food
              </div>

              <div className="flex-1">

                <h3 className="font-semibold text-lg">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500">
                  by {item.chef}
                </p>

                <p className="text-orange-500 font-bold mt-2">
                  ₹{(item.price || 0) * (item.qty || 1)}
                </p>

                {/* Quantity */}
                <div className="flex items-center gap-4 mt-4">

                  <div className="flex items-center border rounded-full px-3 py-1 gap-3">

                    <button onClick={() => updateQty(item.foodId, -1)}>
                      −
                    </button>

                    <span>{item.qty}</span>

                    <button onClick={() => updateQty(item.foodId, 1)}>
                      +
                    </button>

                  </div>

                  <button
                    onClick={() => saveForLater(item)}
                    className="text-sm text-orange-500"
                  >
                    ♡ Save for Later
                  </button>

                  <button
                    onClick={() => removeItem(item.cartId)}
                    className="text-gray-500 text-sm"
                  >
                    🗑 Remove
                  </button>

                </div>

                <textarea
                  value={item.note || ""}
                  onChange={(e) => updateNote(item.foodId, e.target.value)}
                  placeholder="Add special instructions..."
                  className="mt-4 w-full border rounded-xl px-4 py-3 text-sm"
                />

              </div>

            </div>

          ))}

        </div>

        {/* ORDER SUMMARY */}
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
              <span>Delivery</span>
              <span>₹{delivery}</span>
            </div>

            <div className="flex justify-between">
              <span>Platform</span>
              <span>₹{platform}</span>
            </div>

            <hr />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{grand}</span>
            </div>

          </div>

          <button
            onClick={() => navigate("/address")}
            className="w-full mt-6 bg-orange-500 text-white py-4 rounded-xl hover:bg-orange-600"
          >
            Proceed to Address
          </button>

        </div>

      </div>

    </div>

  );
}