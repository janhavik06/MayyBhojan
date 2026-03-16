import { useState, useEffect } from "react";
import { useCart } from "../Cart/CartContext";
import { useFavorites } from "./Dashboard/FavoriteContext";
import { Link, useNavigate } from "react-router-dom";
import { getFoods } from "../../api/food";
import { getUser } from "../../utils/getUser";
import { HiCheckCircle } from "react-icons/hi";
import { BsCartPlus } from "react-icons/bs";

export default function CustALogin() {

  const navigate = useNavigate();

  const user = getUser();

  const { addToCart, count } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const [meals, setMeals] = useState([]);
  const [visible, setVisible] = useState(8);
  const [toast, setToast] = useState(false);

  // Protect customer route
  useEffect(() => {

    if (!user || user.role !== "CUSTOMER") {
      navigate("/login");
    }

  }, []);

  // Fetch foods
  useEffect(() => {

    async function loadFoods() {

      try {

        const res = await getFoods();

        const foods = res.data.map(food => ({
          id: food.id,
          name: food.name,
          chef: food.chef,
          price: food.price,
          time: food.time,
          veg: food.category === "Veg",
          image: food.image
        }));

        setMeals(foods);

      } catch (err) {

        console.error("Food fetch error", err);

      }

    }

    loadFoods();

  }, []);

  const loadMore = () => setVisible(v => v + 8);

  return (

    <div className="min-h-screen bg-[#F4EFEA]">

      {/* NAVBAR */}

      <div className="bg-white border-b shadow-sm">

        <div className="max-w-7xl mx-auto px-10 py-4 flex justify-between items-center">

          {/* LOGO */}

          <h1 className="text-xl font-bold text-orange-500">
            MayBhojan
          </h1>

          {/* ICONS */}

          <div className="flex items-center gap-6 text-xl">

            {/* CART */}

            <Link to="/cart" className="relative">

              <i className="fa-solid fa-cart-shopping"></i>

              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 rounded-full">
                  {count}
                </span>
              )}

            </Link>

            {/* ACCOUNT */}

            <Link to="/orders">

              <i className="fa-solid fa-user"></i>

            </Link>

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


      {/* FOOD GRID */}

      <div className="max-w-[1400px] mx-auto px-10 mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {meals.slice(0, visible).map(meal => (

          <Link to={`/food/${meal.id}`} key={meal.id}>

            <div className="bg-white rounded-2xl border border-[#E5DAD3] shadow-sm hover:shadow-md hover:-translate-y-1 transition flex flex-col h-full">

              <img
                src={`http://localhost:8080/${meal.image}`}
                alt={meal.name}
                className="w-full h-44 object-cover rounded-t-2xl"
              />
              {/* FAVORITE */}

              <div className="relative p-3">

                <button
                  onClick={(e) => {

                    e.preventDefault();
                    e.stopPropagation();

                    toggleFavorite(meal);

                  }}
                  className="absolute top-3 right-3 text-xl"
                >

                  <i className={`fa-heart ${isFavorite(meal.id)
                      ? "fa-solid text-red-500"
                      : "fa-regular text-gray-400"
                    }`} />

                </button>

              </div>

              {/* CONTENT */}

              <div className="p-5 flex flex-col flex-1">



                <span className={`text-xs px-2 py-1 rounded-full border w-fit ${meal.veg
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-red-50 text-red-600 border-red-200"
                  }`}>
                  {meal.veg ? "Veg" : "Non-Veg"}
                </span>

                <h3 className="font-semibold text-lg mt-3">
                  {meal.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  by {meal.chef}
                </p>

                <div className="flex justify-between text-sm mt-4 text-gray-700">
                  <span>⏱ {meal.time} min</span>
                  <span>₹ {meal.price}</span>
                </div>

                <button
                  onClick={(e) => {

                    e.preventDefault();
                    e.stopPropagation();

                    addToCart(meal);

                    setToast(true);
                    setTimeout(() => setToast(false), 2000);

                  }}
                  className="w-full mt-7 bg-orange-500 text-white py-3 rounded-xl font-semibold"
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

      {visible < meals.length && (

        <div className="text-center mt-14 pb-14">

          <button
            onClick={loadMore}
            className="px-8 py-4 border border-[#E5DAD3] rounded-2xl hover:bg-orange-50 font-medium text-gray-700"
          >
            Load more delicious meals
          </button>

        </div>

      )}


      {/* TOAST */}

      {toast && (

        <div className="fixed bottom-6 right-6 bg-black text-white px-6 py-3 rounded-xl shadow-lg">
          ✅ Item added to cart
        </div>

      )}

    </div>

  );

}