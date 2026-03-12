import { useState, useEffect } from "react";
import { useCart } from "../Cart/CartContext";
import { useFavorites } from "../Customer/Dashboard/FavoriteContext";
import { moods } from "../../data/constants";

import { Link } from "react-router-dom";
import { meals } from "../../data/CustMeals";
import { FiSearch } from "react-icons/fi";
import { FaLeaf } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { MdCurrencyRupee } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { BsCartPlus } from "react-icons/bs";
import { HiCheckCircle } from "react-icons/hi";

export default function CustALogin() {
  const [visible, setVisible] = useState(8);
  const [activeMood, setActiveMood] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("popular");
  const [fastOnly, setFastOnly] = useState(false);
  const [budgetOnly, setBudgetOnly] = useState(false);
  const { addToCart } = useCart();
  const [vegOnly, setVegOnly] = useState(false);
  const [toast, setToast] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorites();

  const loadMore = () => setVisible((v) => v + 8);
  let filteredMeals = meals.filter((meal) => {
    const matchesSearch = meal.name.toLowerCase().includes(query.toLowerCase());

    const matchesVeg = vegOnly ? meal.veg : true;

    const matchesTime = fastOnly ? parseInt(meal.time) <= 30 : true;

    const matchesPrice = budgetOnly ? meal.price <= 200 : true;

    const matchesMood = activeMood === "All" ? true : meal.mood === activeMood;

    return (
      matchesSearch && matchesVeg && matchesTime && matchesPrice && matchesMood
    );
  });

  if (sort === "rating") {
    filteredMeals.sort((a, b) => b.rating - a.rating);
  }

  if (sort === "priceLow") {
    filteredMeals.sort((a, b) => a.price - b.price);
  }

  if (sort === "priceHigh") {
    filteredMeals.sort((a, b) => b.price - a.price);
  }

  useEffect(() => {
    setVisible(8);
  }, [query, vegOnly, fastOnly, budgetOnly, sort, activeMood]);

  return (
    <div className="min-h-screen bg-[#F4EFEA]">
      {/* TOP HERO */}
      <div className="bg-[#EFE4DD] border-b border-[#E4D7CF]">
        <div className="max-w-7xl mx-auto px-10 py-8">
          {/* Search */}
          <div className="flex gap-4">
            <div className="flex-1 bg-white rounded-2xl shadow-sm border border-[#E5DAD3] px-6 py-4 flex items-center gap-3">
              <FiSearch className="text-gray-400 text-lg" />
              <input
                placeholder="Search for 'Dadi's Daal' or 'Spicy Chicken'..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full outline-none bg-transparent text-gray-700"
              />
            </div>
            <button className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-sm hover:opacity-95">
              Find Food
            </button>
          </div>

          {/* Mood */}
          <h3 className="mt-6 text-sm font-semibold text-gray-700">
            How are you feeling today?
          </h3>

          <div className="flex gap-3 mt-3 flex-wrap">
            {moods.map((m) => (
              <button
                key={m}
                onClick={() => setActiveMood(m)}
                className={`px-5 py-2 rounded-full text-sm border transition
                  ${
                    activeMood === m
                      ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                      : "bg-white border-[#E5DAD3] hover:bg-orange-50"
                  }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white border-b border-[#E5DAD3] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-10 py-4 flex flex-wrap justify-between gap-4 items-center text-sm">
          {/* Left filters */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* Veg toggle */}
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`px-4 py-2 rounded-full border transition
          ${
            vegOnly
              ? "bg-green-100 text-green-700 border-green-300"
              : "bg-white border-[#E5DAD3]"
          }`}
            >
              <div className="flex items-center gap-2">
                <FaLeaf className="text-green-600" />
                Veg Only
              </div>{" "}
            </button>

            {/* Fast delivery */}
            <button
              onClick={() => setFastOnly(!fastOnly)}
              className={`px-4 py-2 rounded-full border transition
          ${
            fastOnly
              ? "bg-orange-100 text-orange-700 border-orange-300"
              : "bg-white border-[#E5DAD3]"
          }`}
            >
              <div className="flex items-center gap-2">
                <IoTimeOutline />
                Under 30 mins
              </div>{" "}
            </button>

            {/* Budget */}
            <button
              onClick={() => setBudgetOnly(!budgetOnly)}
              className={`px-4 py-2 rounded-full border transition
          ${
            budgetOnly
              ? "bg-orange-100 text-orange-700 border-orange-300"
              : "bg-white border-[#E5DAD3]"
          }`}
            >
              <div className="flex items-center gap-2">
                <MdCurrencyRupee />
                Under ₹200
              </div>{" "}
            </button>

            {/* Clear filters */}
            <button
              onClick={() => {
                setVegOnly(false);
                setFastOnly(false);
                setBudgetOnly(false);
              }}
              className="text-gray-500 underline ml-2"
            >
              Clear
            </button>
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Sort:</span>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-[#E5DAD3] rounded-full px-4 py-2 bg-white"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Top Rated</option>
              <option value="priceLow">Price: Low → High</option>
              <option value="priceHigh">Price: High → Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-10 mt-10 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Explore Home Kitchens
          </h2>
          <p className="text-gray-600 mt-1">
            Showing authentic homemade meals near you
          </p>
        </div>

        <div className="text-sm bg-gray-100 px-4 py-2 rounded-full border border-gray-200">
          <div className="flex items-center gap-2">
            <HiCheckCircle className="text-green-500" />
            All kitchens are 100% hygiene certified
          </div>{" "}
        </div>
      </div>

      {/* GRID */}
      <div className="max-w-[1400px] mx-auto px-10 mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredMeals.slice(0, visible).map((meal) => (
          <Link to={`/food/${meal.id}`} key={meal.id} className="block">
            <div className="bg-white rounded-2xl border border-[#E5DAD3] shadow-smhover:shadow-lg hover:-translate-y-1.5 transition cursor-pointer flex flex-col h-full">
              {/* Fixed image box */}
              <div className="relative">
                {/* Heart button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavorite(meal);
                  }}
                  className="absolute top-3 right-3 text-xl"
                >
                  <FaHeart
                    className={`text-lg transition ${
                      isFavorite(meal.id) ? "text-red-500" : "text-gray-300"
                    }`}
                  />
                </button>

                <div className="h-60 w-full overflow-hidden rounded-t-2xl">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <span
                  className={`text-xs px-2 py-1 rounded-full border w-fit
          ${
            meal.veg
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-red-50 text-red-600 border-red-200"
          }`}
                >
                  {meal.veg ? "Veg" : "Non-Veg"}
                </span>

                {/* Fixed title height */}
                <h3 className="font-semibold text-lg mt-3 leading-tight line-clamp-2 min-h-[35px]">
                  {meal.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">by {meal.chef}</p>

                <div className="flex justify-between text-sm mt-4 text-gray-700">
                  <span className="flex items-center gap-1">
                    <IoTimeOutline />
                    {meal.time}
                  </span>{" "}
                  <span className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    {meal.rating}
                  </span>{" "}
                  <span className="flex items-center gap-1">
                    <MdCurrencyRupee />
                    {meal.price}
                  </span>{" "}
                </div>

                {/* Push button to bottom */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart(meal);

                    setToast(true);
                    setTimeout(() => setToast(false), 2000);
                  }}
                  className="w-full mt-7 bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition flex items-center justify-center gap-2"
                >
                  <div className="flex items-center justify-center gap-2">
                    <BsCartPlus />
                    Add to Cart
                  </div>{" "}
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* LOAD MORE */}
      {visible < filteredMeals.length && (
        <div className="text-center mt-14 pb-14">
          <button
            onClick={loadMore}
            className="px-8 py-4 border border-[#E5DAD3] rounded-2xl hover:bg-orange-50 font-medium text-gray-700"
          >
            Load more delicious meals
          </button>
        </div>
      )}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2">
          <HiCheckCircle className="text-green-400 text-lg" />
          Item added to cart
        </div>
      )}
    </div>
  );
}
