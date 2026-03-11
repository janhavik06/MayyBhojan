import { useState } from "react";
import { useCart } from "../../Cart/CartContext";
import { useFavorites } from "../../Customer/Dashboard/FavoriteContext";
import { FiSearch } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";

export default function Favorites() {
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);

  const { favorites, removeFavorite } = useFavorites();
  const { addToCart } = useCart();

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  }

  function handleRemove(id) {
    removeFavorite(id);
    showToast("Removed from favorites");
  }

  function handleAdd(meal) {
    addToCart(meal);
    showToast("Added to cart");
  }

  const filtered = (favorites || []).filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#F6F2EF]">
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* HEADER */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800">Your Favorites</h1>
          <p className="text-gray-500 mt-2">
            Meals you loved — reorder anytime.
          </p>
        </header>

        {/* SEARCH BAR */}
        <div className="relative mb-10">
          <input
            placeholder="Search your favorite meals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white rounded-full px-6 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <FiSearch
            className="absolute right-5 top-3.5 text-gray-400"
            size={18}
          />
        </div>

        {/* CONTENT */}
        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
                onRemove={() => handleRemove(meal.id)}
                onAdd={() => handleAdd(meal)}
              />
            ))}
          </div>
        )}
      </main>

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-lg animate-fadeIn">
          {toast}
        </div>
      )}
    </div>
  );
}
////////////////////////////
// COMPONENTS
////////////////////////////
function MealCard({ meal, onRemove, onAdd }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{meal.name}</h3>

        <p className="text-gray-500 text-sm mt-1">
          {meal.chef} • ⭐ {meal.rating}
        </p>

        <p className="text-orange-500 font-semibold text-lg mt-2">
          ₹{meal.price}
        </p>
      </div>

      <div className="flex gap-3 mt-5">
        <button
          onClick={onAdd}
          className="flex items-center justify-center gap-2 flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition"
        >
          <FiShoppingCart size={16} />
          Add to Cart
        </button>

        <button
          onClick={onRemove}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition"
        >
          <FiTrash2 size={15} />
          Remove
        </button>
      </div>
    </div>
  );
}
function EmptyState() {
  return (
    <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
      <div className="flex justify-center mb-4 text-red-400">
        <FiHeart size={40} />
      </div>

      <p className="text-gray-600">You haven't saved any meals yet.</p>

      <p className="text-sm text-gray-400 mt-1">
        Tap the heart icon on meals to add them here.
      </p>
    </div>
  );
}
