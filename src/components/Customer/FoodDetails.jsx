import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../Cart/CartContext";
import { meals } from "../../data/CustMeals";
import { FiMinus, FiPlus, FiShoppingCart, FiArrowLeft } from "react-icons/fi";
export default function FoodDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  // find meal by id
  const food = meals.find((m) => m.id === Number(id));

  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState(false);

  if (!food) {
    return <div className="p-10 text-center">Food not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#F4EFEA]">
      <div className="max-w-7xl mx-auto px-10 py-12">
        <Link
          to="/cust"
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-400 mb-6"
        >
          <FiArrowLeft />
          Back to search
        </Link>

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* IMAGE */}
          <img
            src={food.image}
            alt={food.name}
            className="rounded-3xl shadow-md border border-[#E5DAD3] w-full h-[530px] object-cover"
          />

          {/* INFO */}
          <div>
            <h1 className="text-4xl font-bold leading-tight">{food.name}</h1>

            <p className="mt-4 text-gray-600">{food.desc}</p>

            <div className="mt-6 text-3xl font-bold text-orange-500">
              ₹{food.price}
            </div>

            {/* Tags */}
            <div className="flex gap-3 mt-6 flex-wrap">
              {food.dietary.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 bg-orange-50 border border-orange-200 rounded-full text-sm text-orange-600"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Ingredients */}
            <h3 className="mt-8 font-semibold text-lg">What's Inside?</h3>

            <div className="flex flex-wrap gap-3 mt-3">
              {food.ingredients.map((i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-white border border-[#E5DAD3] rounded-xl text-sm"
                >
                  {i}
                </span>
              ))}
            </div>

            {/* Quantity + Cart */}
            <div className="flex gap-4 mt-8 items-center">
              <div className="flex border border-[#E5DAD3] rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-2"
                >
                  <FiMinus />
                </button>

                <div className="px-6 py-2">{qty}</div>

                <button onClick={() => setQty(qty + 1)} className="px-4 py-2">
                  <FiPlus />
                </button>
              </div>

              <button
                onClick={() => {
                  addToCart({
                    ...food,
                    qty: qty,
                  });

                  setToast(true);
                  setTimeout(() => setToast(false), 2000);
                }}
                className="flex items-center justify-center gap-2 flex-1 bg-orange-500 text-white py-3 rounded-xl font-semibold shadow-sm hover:opacity-95"
              >
                <FiShoppingCart />
                Add to Cart
              </button>
            </div>

            <button className="mt-4 w-full border border-[#E5DAD3] py-3 rounded-xl text-gray-700">
              Ask Kitchen a Question
            </button>
          </div>
        </div>

        {/* ABOUT */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white border border-[#E5DAD3] rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg">About the Kitchen</h3>
            <p className="text-gray-600 mt-2">
              Prepared by {food.chef} using homemade recipes and
              hygiene-certified kitchens.
            </p>
          </div>

          <div className="bg-[#F0E2D7] border border-[#E5DAD3] rounded-2xl p-6">
            <h3 className="font-bold">MayBhojan Safety Shield</h3>
            <p className="text-gray-700 mt-2 text-sm">
              This kitchen passed hygiene certification.
            </p>
          </div>
        </div>

        {/* SIDES */}
        <h3 className="mt-16 text-2xl font-bold">Enjoy it With</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          {food.sides.map((side) => (
            <div
              key={side.name}
              className="bg-white border border-[#E5DAD3] rounded-2xl shadow-sm p-5"
            >
              <div className="h-32 bg-gray-200 rounded-xl mb-4" />
              <h4 className="font-semibold">{side.name}</h4>
              <p className="text-sm text-gray-600">₹{side.price}</p>
              <button className="mt-4 w-full border rounded-xl py-2 text-sm">
                + Add Side
              </button>
            </div>
          ))}
        </div>
      </div>
      {toast && (
        <div className="fixed bottom-6 right-6 bg-black text-white px-6 py-3 rounded-xl shadow-lg">
          Item added to cart
        </div>
      )}
    </div>
  );
}
