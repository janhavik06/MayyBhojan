import { useCart } from "../Cart/CartContext";
import { useFavorites } from "../Customer/Dashboard/FavoriteContext";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, updateQty, removeItem, updateNote, total } = useCart();
  const { toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  const delivery = 35;
  const platform = 10;
  const grand = total + delivery + platform;

  function saveForLater(item) {
    toggleFavorite(item);
    removeItem(item.id);
  }

  return (
    <div className="min-h-screen bg-[#F6F2EF]">

      <div className="max-w-7xl mx-auto px-10 py-8">

        <Link to="/custalogin" className="text-sm hover:text-orange-400 text-gray-500">
          ← Back to Kitchens
        </Link>

        <div className="flex justify-between items-center mt-4">
          <h1 className="text-3xl font-bold">
            Your Food Basket
            <span className="text-orange-500 text-lg ml-2">
              ({cart.length} items)
            </span>
          </h1>
        </div>

        <div className="bg-white border rounded-2xl mt-6 px-10 py-6 flex justify-between text-sm text-gray-600">
          <div className="font-semibold text-orange-500">Review Cart</div>
          <div>Delivery Address</div>
          <div>Payment Method</div>
          <div>Confirmation</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          {cart.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border shadow-sm p-6 flex gap-6">

              <img src={item.image} className="w-36 h-36 object-cover rounded-xl" />

              <div className="flex-1">

                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-1">by {item.chef}</p>

                <p className="text-orange-500 font-bold mt-2">
                  ₹{item.price}
                </p>

                {/* Quantity */}
                <div className="flex items-center gap-4 mt-4">

                  <div className="flex items-center border rounded-full px-3 py-1 gap-3">
                    <button onClick={() => updateQty(item.id, -1)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)}>+</button>
                  </div>

                  {/* Save for later */}
                  <button
                    onClick={() => saveForLater(item)}
                    className="text-sm text-orange-500"
                  >
                    ♡ Save for Later
                  </button>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-500 text-sm"
                  >
                    <i class="fa-regular fa-trash-can"></i> Remove
                  </button>
                </div>

                {/* Special instructions */}
                <textarea
                  value={item.note}
                  onChange={(e) => updateNote(item.id, e.target.value)}
                  placeholder="Add special instructions for the homemaker..."
                  className="mt-4 w-full border rounded-xl px-4 py-3 text-sm text-gray-600 resize-none"
                  rows={2}
                />

              </div>
            </div>
          ))}

          <div className="bg-pink-50 border border-pink-200 rounded-2xl p-6 text-sm text-gray-700">
            ❤️ By ordering, you support local homemakers.
          </div>

        </div>

        {/* RIGHT */}
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

            <hr className="my-3" />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
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
    </div>
  );
}
