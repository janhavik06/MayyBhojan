import { useState, useEffect } from "react";
import { getMenu, addDish } from "../../../services/menuService";

export default function CookMenu() {
  const [filter, setFilter] = useState("all");
  const [dishes, setDishes] = useState([]);
  const [showAddDish, setShowAddDish] = useState(false);

  useEffect(() => {
    async function loadMenu() {
      const user = JSON.parse(localStorage.getItem("user"))
      const userId = user?.id;
      const data = await getMenu(userId);
      setDishes(data);
    }

    loadMenu();
  }, []);

  const filtered =
    filter === "all"
      ? dishes
      : filter === "veg"
        ? dishes.filter((d) => d.category === "VEG")
        : dishes.filter((d) => d.category === "NONVEG");

  return (
    <div className="bg-[#F6F2EF] min-h-screen p-10">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <p className="text-xs text-orange-500 font-semibold tracking-wide">
            KITCHEN MANAGEMENT
          </p>

          <h1 className="text-3xl font-bold mt-2">Your Kitchen Menu</h1>

          <p className="text-gray-600 mt-2 max-w-xl">
            Keep your menu fresh and updated. Your customers love discovering
            new tastes from your home!
          </p>
        </div>

        <div className="flex gap-4">
          <StatCard label="Total Items" value={dishes.length} />
          <StatCard label="Menu Health" value="94%" />
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-[320px_1fr] gap-8">
        {/* ADD NEW DISH */}
        <div className="border-2 border-dashed border-orange-200 rounded-2xl p-10 text-center bg-orange-50">
          <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto text-3xl">
            +
          </div>

          <h3 className="font-semibold text-lg mt-6">Add New Dish</h3>

          <p className="text-gray-600 mt-2 text-sm">
            Ready to share a new recipe? Upload a photo and set your price to
            start receiving orders.
          </p>

          <button
            onClick={() => setShowAddDish(true)}
            className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Get Started
          </button>
        </div>

        {/* CURRENT OFFERINGS */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Current Offerings</h2>

            <div className="flex gap-2">
              {["all", "veg", "nonveg"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-full text-sm border
                    ${filter === f
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-white border-gray-300"
                    }`}
                >
                  {f.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* DISH CARDS */}
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((d) => (
              <DishCard key={d.id} dish={d} />
            ))}
          </div>
        </div>
      </div>

      {showAddDish && (
        <AddDishModal
          close={() => setShowAddDish(false)}
          refreshMenu={async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            const data = await getMenu(user.id);
            setDishes(data);
          }}
        />
      )}
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-orange-100 px-6 py-4 rounded-xl text-center min-w-[120px]">
      <p className="text-xs text-gray-600">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

function DishCard({ dish }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="relative">
        <img src={dish.image} className="h-48 w-full object-cover" />

        <span
          className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full
          ${dish.available
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
            }`}
        >
          {dish.available ? "AVAILABLE" : "HIDDEN"}
        </span>
      </div>

      <div className="p-6">
        <p
          className={`text-xs font-semibold
          ${dish.category === "VEG" ? "text-green-600" : "text-red-600"}`}
        >
          {dish.category}
        </p>

        <h3 className="font-semibold mt-1">{dish.name}</h3>

        <p className="text-orange-500 font-bold mt-2">₹{dish.price}</p>
      </div>
    </div>
  );
}

function AddDishModal({ close, refreshMenu }) {
  const [dish, setDish] = useState({
    name: "",
    price: "",
    type: "veg",
    image: null,
  });

  function handleChange(e) {
    setDish({ ...dish, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    const user = JSON.parse(localStorage.getItem("user"));

    await addDish(user.id, dish);

    await refreshMenu();

    close();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-start justify-center pt-24 px-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-xl">
        <h2 className="text-xl font-bold mb-6">Add New Dish</h2>

        <div className="space-y-5">
          <Input
            label="Dish Name"
            name="name"
            value={dish.name}
            onChange={handleChange}
          />

          <Input
            label="Price (₹)"
            name="price"
            value={dish.price}
            onChange={handleChange}
          />

          <div>
            <label className="text-sm font-medium">Dish Type</label>

            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={() => setDish({ ...dish, type: "veg" })}
                className={`px-4 py-2 rounded-full border text-sm
                ${dish.type === "veg"
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-white border-gray-300"
                  }`}
              >
                Veg
              </button>

              <button
                type="button"
                onClick={() => setDish({ ...dish, type: "nonveg" })}
                className={`px-4 py-2 rounded-full border text-sm
                ${dish.type === "nonveg"
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white border-gray-300"
                  }`}
              >
                Non-Veg
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Dish Photo</label>

            <input
              type="file"
              onChange={(e) =>
                setDish({ ...dish, image: e.target.files[0] })
              }
              className="mt-2"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={close}
            className="px-5 py-2 border rounded-xl text-sm hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-orange-500 text-white px-6 py-2 rounded-xl"
          >
            Add Dish
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>

      <input
        name={name}
        value={value}
        onChange={onChange}
        className="w-full mt-2 px-4 py-3 border rounded-xl"
      />
    </div>
  );
}