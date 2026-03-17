import { useState } from "react";

export default function CookMenu() {
  const [filter, setFilter] = useState("all");

  const dishes = [
    {
      id: 1,
      name: "Grandma's Special Dal Tadka",
      veg: true,
      price: 180,
      time: "30-40 min",
      orders: 142,
      available: true,
      tags: ["Comfort", "Healthy", "Protein"],
      img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
    },
    {
      id: 2,
      name: "Paneer Butter Masala",
      veg: true,
      price: 220,
      time: "45 min",
      orders: 389,
      available: true,
      tags: ["Spicy", "Rich", "Best Seller"],
      img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7",
    },
  ];

  const filtered =
    filter === "all"
      ? dishes
      : filter === "veg"
        ? dishes.filter((d) => d.veg)
        : dishes.filter((d) => !d.veg);

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

          <button className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold">
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
