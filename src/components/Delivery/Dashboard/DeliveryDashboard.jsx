import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../utils/getUser";
export default function DeliveryDashboard() {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [toast, setToast] = useState(null);
const user = getUser();
const partnerId = user?.id;
  const API = "http://localhost:8080/api/delivery";

  /* LOAD AVAILABLE ORDERS */
  useEffect(() => {

    loadOrders();

    const interval = setInterval(() => {
      loadOrders();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  async function loadOrders() {

    try {

      const res = await axios.get(`${API}/orders`);

      const mapped = res.data.map((o) => ({

        id: o.id,

        kitchen: "Homemaker Kitchen", // temporary hardcoded

        pickup:
          o.house + ", " +
          o.area + ", " +
          o.landmark + " - " +
          o.pincode,

        earn: o.deliveryFee || 40,

        status: o.status,

        total: o.total

      }));

      setOrders(mapped);

    } catch (err) {

      console.error("Error loading orders", err);

    }

  }

  /* ACCEPT ORDER */
  async function acceptOrder(order) {

  try {

    await axios.put(`${API}/accept/${order.id}?partnerId=${partnerId}`);

    setOrders(prev => prev.filter(o => o.id !== order.id));

    setToast("Order Accepted");

    setTimeout(() => setToast(null), 2000);

    navigate("/delivery/active");

  } catch (err) {

    console.error("Accept order error", err);

  }

}
  function declineOrder(orderId) {

    setOrders(prev => prev.filter(o => o.id !== orderId));

    setToast("Order declined");

    setTimeout(() => setToast(null), 2000);

  }

  return (

    <div className="bg-[#F6F2EF] min-h-screen p-8">

      <h1 className="text-3xl font-bold mb-6">
        Available Deliveries
      </h1>

      <div className="space-y-6">

        {orders.map(o => (

          <div key={o.id} className="bg-white p-6 rounded-xl shadow border">

            <h3 className="font-semibold text-lg">
              Order #{o.id}
            </h3>

            <p className="text-sm text-gray-500">
              Kitchen: {o.kitchen}
            </p>

            <p className="text-sm text-gray-500">
              Pickup Address: {o.pickup}
            </p>

            <p className="text-sm text-gray-500">
              Delivery Fee: ₹{o.earn}
            </p>

            <p className="text-sm text-gray-500">
              Order Total: ₹{o.total}
            </p>

            <p className="text-sm text-gray-500">
              Status: {o.status}
            </p>

            <div className="flex gap-4 mt-4">

              <button
                onClick={() => declineOrder(o.id)}
                className="flex-1 border border-red-400 text-red-500 py-2 rounded"
              >
                Decline
              </button>

              <button
                onClick={() => acceptOrder(o)}
                className="flex-1 bg-orange-500 text-white py-2 rounded"
              >
                Accept Order
              </button>

            </div>

          </div>

        ))}

      </div>

      {toast && (

        <div className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded">

          {toast}

        </div>

      )}

    </div>

  );

}