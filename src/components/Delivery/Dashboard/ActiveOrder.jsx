// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function ActiveOrder() {

//   const [orders, setOrders] = useState([]);

//   const API = "http://localhost:8080/api/delivery";

//   useEffect(() => {

//     loadActiveOrders();

//     const interval = setInterval(() => {
//       loadActiveOrders();
//     }, 5000);

//     return () => clearInterval(interval);

//   }, []);

//   async function loadActiveOrders() {

//     try {

//       const res = await axios.get(`${API}/active`);

//       setOrders(res.data);

//     } catch (err) {

//       console.error("Error loading active deliveries", err);

//     }

//   }

//   async function markDelivered(orderId) {

//     try {

//       await axios.put(`${API}/deliver/${orderId}`);

//       setOrders(prev =>
//         prev.filter(o => o.id !== orderId)
//       );

//     } catch (err) {

//       console.error("Deliver error", err);

//     }

//   }

//   return (

//     <div className="bg-[#F6F2EF] min-h-screen p-8">

//       <h1 className="text-3xl font-bold mb-6">
//         Active Deliveries
//       </h1>

//       {orders.length === 0 && (
//         <p className="text-gray-500">
//           No active deliveries
//         </p>
//       )}

//       <div className="space-y-6">

//         {orders.map(order => (

//           <div key={order.id} className="bg-white p-6 rounded-xl shadow border">

//             <h3 className="font-semibold text-lg">
//               Order #{order.id}
//             </h3>

//             <p className="text-sm text-gray-500">
//               Kitchen: Homemaker Kitchen
//             </p>

//             <p className="text-sm text-gray-600 mt-1">
//               Pickup Address: {order.house}, {order.area}, {order.landmark} - {order.pincode}
//             </p>

//             <p className="text-sm mt-1">
//               Delivery Fee: ₹{order.deliveryFee}
//             </p>

//             <p className="text-sm">
//               Order Total: ₹{order.total}
//             </p>

//             <p className="text-sm mt-1">
//               Status: {order.status}
//             </p>

//             <button
//               onClick={() => markDelivered(order.id)}
//               className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
//             >
//               Mark Delivered
//             </button>

//           </div>

//         ))}

//       </div>

//     </div>

//   );

// }

import { useState, useEffect } from "react";
import axios from "axios";
import { getUser } from "../../../utils/getUser";
export default function ActiveOrder() {

  const [orders, setOrders] = useState([]);
const user = getUser();
const partnerId = user?.id;
  const API = "http://localhost:8080/api/delivery";

  useEffect(() => {

    loadActiveOrders();

    const interval = setInterval(() => {
      loadActiveOrders();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  async function loadActiveOrders() {

  try {

    const res = await axios.get(`${API}/active?partnerId=${partnerId}`);

    setOrders(res.data);

  } catch (err) {

    console.error("Error loading active deliveries", err);

  }

}

  async function markDelivered(orderId) {

    try {

      await axios.put(`${API}/deliver/${orderId}`);

      setOrders(prev =>
        prev.filter(o => o.id !== orderId)
      );

    } catch (err) {

      console.error("Deliver error", err);

    }

  }

  return (

    <div className="bg-[#F6F2EF] min-h-screen p-8">

      <h1 className="text-3xl font-bold mb-8">
        Active Deliveries
      </h1>

      {orders.length === 0 && (
        <p className="text-gray-500">
          No active deliveries
        </p>
      )}

      <div className="space-y-6">

        {orders.map(order => (

          <div
            key={order.id}
            className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transition"
          >

            <div className="flex justify-between items-start">

              <div>

                <h3 className="font-semibold text-lg">
                  Order #{order.id}
                </h3>

                <p className="text-sm text-gray-500">
                  Kitchen: Homemaker Kitchen
                </p>

                <p className="text-sm text-gray-600 mt-2">
                  Pickup: {order.house}, {order.area}
                </p>

                <p className="text-sm text-gray-500">
                  {order.landmark} - {order.pincode}
                </p>

              </div>

              <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-medium">
                {order.status}
              </span>

            </div>

            <div className="flex justify-between items-center mt-4">

              <div className="text-sm">

                <p>
                  Delivery Fee
                  <span className="font-semibold text-green-600 ml-2">
                    ₹{order.deliveryFee}
                  </span>
                </p>

                <p>
                  Order Total
                  <span className="font-semibold ml-2">
                    ₹{order.total}
                  </span>
                </p>

              </div>

              <button
                onClick={() => markDelivered(order.id)}
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl text-sm font-semibold transition"
              >
                Mark Delivered
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}