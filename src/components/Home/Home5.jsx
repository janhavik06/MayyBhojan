import d1 from "../../assets/d1.jpg";
import d2 from "../../assets/d2.jpg";
import d3 from "../../assets/d3.jpg";
import d4 from "../../assets/d4.jpg";
import d5 from "../../assets/d5.jpg";
import d6 from "../../assets/d6.jpg";
import d7 from "../../assets/d7.jpg";
import d8 from "../../assets/d8.jpg";

export default function Home5() {
  const dishes = [
    {
      id: 1,
      title: "Classic Homestyle Thali",
      kitchen: "Sharma's Kitchen",
      price: 149,
      time: "35-40 min",
      img: d1,
    },
    {
      id: 2,
      title: "Dal Makhani & Jeera Rice",
      kitchen: "The Curry Pot",
      price: 120,
      time: "25-30 min",
      img: d2,
    },
    {
      id: 3,
      title: "Filter Coffee & Idli",
      kitchen: "Lakshmi's Tiffin",
      price: 85,
      time: "20 min",
      img: d3,
    },
    {
      id: 4,
      title: "Chicken Dum Biryani",
      kitchen: "Biryani House",
      price: 220,
      time: "45 min",
      img: d4,
    },
    {
      id: 5,
      title: "Poha & Jalebi Breakfast",
      kitchen: "Indore Flavors",
      price: 75,
      time: "15-20 min",
      img: d5,
    },
    {
      id: 6,
      title: "Soft Paneer Paratha",
      kitchen: "Dadi's Kitchen",
      price: 110,
      time: "30 min",
      img: d6,
    },
    {
      id: 7,
      title: "Soya Chaap Masala",
      kitchen: "Veggie Delight",
      price: 160,
      time: "35 min",
      img: d7,
    },
    {
      id: 8,
      title: "Sweet Mango Lassi",
      kitchen: "The Dairy Farm",
      price: 60,
      time: "10 min",
      img: d8,
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Top Rated Dishes
            </h2>
            <p className="text-gray-600 mt-2">
              Trending meals that our customers can't get enough of.
            </p>
          </div>

          <button className="text-orange-500 font-semibold hover:underline">
            View all →
          </button>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-4 gap-8">

          {dishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={dish.img}
                  alt={dish.title}
                  className="w-full h-75 object-cover"
                />

                <span className="absolute bottom-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-medium shadow">
                  ⏱ {dish.time}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-lg">
                  {dish.title}
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  from {dish.kitchen}
                </p>

                <div className="mt-4 flex justify-between items-center">
                  <span className="font-bold text-lg">
                    ₹{dish.price}
                  </span>

                  <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90">
                    + Add
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
