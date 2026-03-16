import { useEffect, useState } from "react";
import { getUserOrders } from "../../../api/orderApi";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../utils/getUser";

export default function Profile() {

  const user = getUser();
  const userId = user?.id;

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    if (!userId) return;

    async function loadOrders() {

      try {

        const res = await getUserOrders(userId);

        // sort newest orders first
        const sortedOrders = res.data.sort((a, b) => b.id - a.id);

        setOrders(sortedOrders);

      } catch (err) {

        console.error("Orders fetch error", err);

      }

    }

    loadOrders();

  }, [userId]);

  return (

    <div className="min-h-screen bg-[#F6F2EF]">

      <main className="w-full px-6 md:px-10">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-10">

          <div>

            <h1 className="text-2xl sm:text-3xl font-bold">
              Namaste, {user?.name || "Guest"}! 👋
            </h1>

            <p className="text-gray-500 mt-1">
              Welcome back to your kitchen.
            </p>

          </div>

          <div className="flex gap-8 md:gap-10">

            <Stat label="Orders" value={orders.length} />

          </div>

        </div>


        {/* ORDERS */}

        <Section title="My Orders">

          {orders.length === 0 && (

            <p className="text-gray-500">
              No orders yet
            </p>

          )}

          {orders.map(order => (

            <OrderCard
              key={order.id}
              order={order}
              onTrack={() =>
                navigate("/confirm", {
                  state: { orderId: order.id }
                })
              }
            />

          ))}

        </Section>

      </main>

    </div>

  );

}


//////////////////////////////
// COMPONENTS
//////////////////////////////

function Stat({ label, value }) {

  return (

    <div>

      <p className="text-xl sm:text-2xl font-bold text-orange-500">
        {value}
      </p>

      <p className="text-xs text-gray-500 uppercase">
        {label}
      </p>

    </div>

  );

}


function Section({ title, children }) {

  return (

    <div className="mb-12">

      <h2 className="font-semibold text-lg mb-5">
        {title}
      </h2>

      {children}

    </div>

  );

}


function OrderCard({ order, onTrack }) {

  return (

    <div
      className="
      bg-white
      shadow-md shadow-black/5
      rounded-xl
      p-5
      flex flex-col sm:flex-row gap-4
      sm:justify-between sm:items-center
      mb-4
    "
    >

      <div className="flex gap-4 items-center">

        <img
          src={order.image || "/food-placeholder.png"}
          alt="food"
          className="w-16 h-16 rounded-lg object-cover"
        />

        <div>

          <h3 className="font-semibold">
            {order.title || "Meal Order"}
          </h3>

          <p className="text-gray-500 text-sm">
            Order ID: {order.id}
          </p>

          <p className="text-orange-500 font-semibold">
            ₹{order.total}
          </p>

          <p className="text-sm text-gray-500">
            Status: {order.status}
          </p>

        </div>

      </div>

      <button
        onClick={onTrack}
        className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full whitespace-nowrap"
      >
        Track Order
      </button>

    </div>

  );

}
