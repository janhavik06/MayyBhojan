import k1 from "../../assets/k1.jpg";
import k2 from "../../assets/k2.jpg";
import k3 from "../../assets/k3.jpg";
import k4 from "../../assets/k4.jpg";
import k5 from "../../assets/k5.jpg";
import k6 from "../../assets/k6.jpg";
import k7 from "../../assets/k7.jpg";
import k8 from "../../assets/k8.jpg";
export default function Home4() {
  const kitchens = [
    {
      id: 1,
      title: "Annapurna's Kitchen",
      chef: "Mrs. Sharma",
      tag: "North Indian",
      rating: 4.9,
      img: k1,
    },
    {
      id: 2,
      title: "South Spice Home",
      chef: "Mrs. Lakshmi",
      tag: "South Indian",
      rating: 4.8,
      img: k2,
    },
    {
      id: 3,
      title: "Bong Cravings",
      chef: "Mrs. Banerjee",
      tag: "Bengali",
      rating: 4.7,
      img: k3,
    },
    {
      id: 4,
      title: "Mom's Gujarati Meals",
      chef: "Mrs. Patel",
      tag: "Gujarati",
      rating: 5.0,
      img: k4,
    },
    {
        id: 5,
        title: "Punjabi Tadka House",
        chef: "Mrs. Kaur",
        tag: "Punjabi",
        rating: 4.9,
        img: k5,
      },
      {
        id: 6,
        title: "Hyderabadi Dastarkhan",
        chef: "Mrs. Begum",
        tag: "Hyderabadi",
        rating: 4.8,
        img: k6,
      },
      {
        id: 7,
        title: "Kerala Coconut Kitchen",
        chef: "Mrs. Nair",
        tag: "Kerala",
        rating: 4.7,
        img: k7,
      },
      {
        id: 8,
        title: "Rajasthani Rasoi",
        chef: "Mrs. Rathore",
        tag: "Rajasthani",
        rating: 4.9,
        img: k8,
      },
      
  ];

  return (
    <section className=" py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Kitchens
            </h2>
            <p className="text-gray-600 mt-2">
              The most loved kitchens in your neighborhood this week.
            </p>
          </div>

          <button className="text-orange-500 font-semibold hover:underline">
            View all →
          </button>
        </div>

        {/* Cards */}
        <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide">

          {kitchens.map((kitchen) => (
            <div
              key={kitchen.id}
              className="min-w-[320px] bg-white rounded-2xl shadow-sm hover:shadow-md transition"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={kitchen.img}
                  alt={kitchen.title}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />

                {/* Tag */}
                <span className="absolute top-3 left-3 bg-white/90 text-orange-500 text-xs px-3 py-1 rounded-full font-semibold">
                  {kitchen.tag}
                </span>

                {/* Chef Badge */}
                <div className="absolute bottom-3 left-3 bg-white px-3 py-2 rounded-full shadow text-sm font-medium">
                  👩‍🍳 Chef {kitchen.chef}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">
                    {kitchen.title}
                  </h3>

                  <button className="text-gray-400 hover:text-red-500">
                    ♡
                  </button>
                </div>

                <p className="mt-2 text-gray-600 text-sm">
                  ⭐ {kitchen.rating} (120+ reviews)
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
