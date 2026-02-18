import { useState } from "react";
import { useCart } from "../../Cart/CartContext";
import { useFavorites } from "../../Customer/Dashboard/FavoriteContext";

export default function Favorites() {
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);

  // ✅ pull favorites from context
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

  // ✅ safe filter
  const filtered = (favorites || []).filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F6F2EF]">

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Your Favorites</h1>
          <p className="text-gray-500 mt-1">
            Saved meals you love — reorder quickly.
          </p>
        </header>

        {/* SEARCH */}
        <input
          placeholder="Search your favorites"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-8 border rounded-full px-5 py-3"
        />

        {/* EMPTY STATE */}
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
        <div className="fixed bottom-6 right-6 bg-black text-white px-6 py-3 rounded-xl shadow-lg">
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
    <div className="bg-white shadow-md rounded-xl p-5">

      <h3 className="font-semibold text-lg">
        {meal.name}
      </h3>

      <p className="text-gray-500 text-sm">
        {meal.chef} • ⭐ {meal.rating}
      </p>

      <p className="text-orange-500 font-bold mt-1">
        ₹{meal.price}
      </p>

      <div className="flex gap-3 mt-4">

        <button
          onClick={onAdd}
          className="bg-orange-500 text-white px-4 py-2 rounded-full"
        >
          Add to cart
        </button>

        <button
          onClick={onRemove}
          className="border px-4 py-2 rounded-full text-sm"
        >
          Remove
        </button>

      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-white rounded-xl p-10 text-center shadow-md">
      <p className="text-gray-500">
        No favorites yet — tap ❤️ on meals to save them.
      </p>
    </div>
  );
}
