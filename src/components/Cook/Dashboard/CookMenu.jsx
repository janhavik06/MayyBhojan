import { useState } from "react";
import { getMenu, addDish } from "../../../services/menuService";
export default function CookMenu() {
  const [filter, setFilter] = useState("all");

  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    setDishes(getMenu());
  }, []);
  function addDish(newDish) {
    setDishes((prev) => [
      ...prev,
      {
        ...newDish,
        id: Date.now(),
        orders: 0,
        available: true,
        tags: newDish.tags.split(",").map((t) => t.trim()),
      },
    ]);
  }

  const filtered =
    filter === "all"
      ? dishes
      : filter === "veg"
        ? dishes.filter((d) => d.veg)
        : dishes.filter((d) => !d.veg);
  const [showAddDish, setShowAddDish] = useState(false);
  return (
    <div className=" bg-[#F6F2EF] min-h-screen p-10">
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
          <StatCard label="Total Items" value="3" />
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
          {/* FILTER */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Current Offerings</h2>

            <div className="flex gap-2">
              {["all", "veg", "nonveg"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-full text-sm border
                    ${
                      filter === f
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-white border-gray-300"
                    }
                  `}
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

      {/* TIPS SECTION */}
      <div className="mt-10 bg-[#F3E2D6] rounded-2xl p-8">
        <h3 className="font-semibold mb-6">Kitchen Growth Tips</h3>

        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <Tip title="Weekly Specials">
            Limited edition dishes get 3× more weekend orders.
          </Tip>

          <Tip title="Photography Matters">
            Bright daylight photos build customer trust.
          </Tip>

          <Tip title="Dietary Tags">
            Tags like Gluten-free help customers discover you.
          </Tip>
        </div>
      </div>
      {showAddDish && (
        <AddDishModal close={() => setShowAddDish(false)} addDish={addDish} />
      )}
    </div>
  );
}

////////////////////////////
// SMALL COMPONENTS
////////////////////////////

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
        <img src={dish.img} className="h-48 w-full object-cover" />

        <span
          className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full
          ${dish.available ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}
        `}
        >
          {dish.available ? "AVAILABLE" : "HIDDEN"}
        </span>
      </div>

      <div className="p-6">
        <p
          className={`text-xs font-semibold
          ${dish.veg ? "text-green-600" : "text-red-600"}
        `}
        >
          {dish.veg ? "VEG" : "NON-VEG"}
        </p>

        <h3 className="font-semibold mt-1">{dish.name}</h3>

        <p className="text-orange-500 font-bold mt-2">₹{dish.price}</p>

        <div className="flex gap-2 flex-wrap mt-2 text-xs text-gray-600">
          {dish.tags.map((t) => (
            <span key={t} className="bg-gray-100 px-2 py-1 rounded">
              {t}
            </span>
          ))}
        </div>

        <div className="flex justify-between text-sm mt-4 text-gray-600">
          <span>⏱ {dish.time}</span>
          <span>📦 {dish.orders} Orders</span>
        </div>

        <button className="mt-4 border w-full py-3 rounded-xl text-sm hover:bg-gray-50">
          Edit
        </button>
      </div>
    </div>
  );
}

function Tip({ title, children }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h4 className="font-semibold">{title}</h4>
      <p className="text-gray-600 mt-2">{children}</p>
    </div>
  );
}
function AddDishModal({ close, addDish }) {
  const [dish, setDish] = useState({
    name: "",
    price: "",
    type: "veg",
    time: "",
    tags: "",
    image: null,
  });

  function handleChange(e) {
    setDish({ ...dish, [e.target.name]: e.target.value });
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

          <Input
            label="Preparation Time"
            name="time"
            placeholder="e.g. 30-40 min"
            value={dish.time}
            onChange={handleChange}
          />

          {/* DISH TYPE */}
          <div>
            <label className="text-sm font-medium">Dish Type</label>

            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={() => setDish({ ...dish, type: "veg" })}
                className={`px-4 py-2 rounded-full border text-sm
                ${
                  dish.type === "veg"
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
                ${
                  dish.type === "nonveg"
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white border-gray-300"
                }`}
              >
                Non-Veg
              </button>
            </div>
          </div>

          <Input
            label="Tags"
            name="tags"
            placeholder="Spicy, Healthy, Bestseller"
            value={dish.tags}
            onChange={handleChange}
          />

          {/* IMAGE UPLOAD */}
          <div>
            <label className="text-sm font-medium">Dish Photo</label>

            <label className="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-orange-200 rounded-xl p-6 cursor-pointer bg-orange-50 hover:bg-orange-100 transition">
              <input
                type="file"
                className="hidden"
                onChange={(e) => setDish({ ...dish, image: e.target.files[0] })}
              />

              {dish.image ? (
                <p className="text-green-600 text-sm">{dish.image.name}</p>
              ) : (
                <>
                  <p className="text-gray-600 text-sm">
                    Click to upload dish image
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    JPG / PNG up to 5MB
                  </p>
                </>
              )}
            </label>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={close}
            className="px-5 py-2 border rounded-xl text-sm hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              const user = JSON.parse(localStorage.getItem("maybhojan_user"));

              const newDish = {
                id: Date.now(),
                cookEmail: user.email,
                kitchenName: "My Home Kitchen",
                name: dish.name,
                price: dish.price,
                veg: dish.type === "veg",
                time: dish.time,
                tags: dish.tags.split(",").map((t) => t.trim()),
                image: dish.image ? URL.createObjectURL(dish.image) : "default",
                available: true,
                orders: 0,
              };

              const updatedMenu = addDish(newDish);

              setDishes(updatedMenu);

              close();
            }}
            className="bg-orange-500 text-white px-6 py-2 rounded-xl"
          >
            Add Dish
          </button>
        </div>
      </div>
    </div>
  );
}
function Input({ label, name, value, onChange, placeholder }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>

      <input
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full mt-2 px-4 py-3 border rounded-xl"
      />
    </div>
  );
}
