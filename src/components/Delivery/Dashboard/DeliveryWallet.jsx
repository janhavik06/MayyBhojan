// import { useState, useEffect } from "react";
// import { getWallet } from "../../../api/DeliveryWallet.js";
// export default function DeliveryWallet() {

//   const [transactions, setTransactions] = useState([]);
//   const [showWithdraw, setShowWithdraw] = useState(false);

//   const partnerId = 1; // logged delivery partner

//   useEffect(() => {
//     loadWallet();
//   }, []);

//   async function loadWallet() {
//     try {

//       const res = await getWallet(partnerId);

//       const mapped = res.data.map((t) => ({
//         id: t.id,
//         order: "MB-" + t.orderId,
//         amount: t.amount,
//         status: t.status,
//         date: new Date(t.createdAt).toLocaleString()
//       }));

//       setTransactions(mapped);

//     } catch (err) {
//       console.error("Wallet error", err);
//     }
//   }

//   const balance = transactions.reduce((sum, t) => sum + t.amount, 0);
//   return (
//     <div className="bg-[#f7f5f3] min-h-screen p-6">

//       <div className="bg-white rounded-2xl shadow-md p-8 mb-6">

//         <h1 className="text-3xl font-bold mb-4">My Wallet</h1>

//         <p className="text-gray-500">Available balance</p>
//         <p className="text-5xl font-bold text-green-600">
//           ₹{balance}
//         </p>

//       </div>

//       <div className="bg-white rounded-2xl shadow-md p-6">

//         <h2 className="text-xl font-bold mb-4">Transactions</h2>

//         <div className="space-y-3">

//           {transactions.map((tx) => (

//             <div
//               key={tx.id}
//               className="border rounded-xl p-4 flex justify-between"
//             >

//               <div>
//                 <p className="font-semibold">{tx.order}</p>
//                 <p className="text-sm text-gray-500">{tx.date}</p>
//               </div>

//               <div className="text-right">

//                 <p className="font-bold text-green-600">
//                   +₹{tx.amount}
//                 </p>

//                 <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
//                   {tx.status}
//                 </span>

//               </div>

//             </div>

//           ))}

//         </div>

//       </div>

//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { getWallet } from "../../../api/DeliveryWallet.js";
import { getUser } from "../../../utils/getUser";
export default function DeliveryWallet() {

  const [transactions, setTransactions] = useState([]);

const user = getUser();
const partnerId = user?.id;
  useEffect(() => {
    loadWallet();
  }, []);

  async function loadWallet() {

    try {

      const res = await getWallet(partnerId);

      const mapped = res.data.map((t) => ({
        id: t.id,
        order: "MB-" + t.orderId,
        amount: t.amount,
        status: t.status,
        date: new Date(t.createdAt).toLocaleDateString()
      }));

      setTransactions(mapped);

    } catch (err) {

      console.error("Wallet error", err);

    }

  }

  const balance = transactions.reduce((sum, t) => sum + t.amount, 0);

  return (

    <div className="bg-[#F6F2EF] min-h-screen p-8">

      {/* WALLET CARD */}

      <div className="bg-white rounded-2xl shadow-md p-8 mb-8">

        <h1 className="text-3xl font-bold mb-4">
          My Wallet
        </h1>

        <p className="text-gray-500">
          Total Delivery Earnings
        </p>

        <p className="text-5xl font-bold text-green-600 mt-2">
          ₹{balance}
        </p>

        <p className="text-sm text-gray-500 mt-2">
          From {transactions.length} deliveries
        </p>

      </div>

      {/* TRANSACTIONS */}

      <div className="bg-white rounded-2xl shadow-md p-6">

        <h2 className="text-xl font-bold mb-6">
          Transactions
        </h2>

        <div className="space-y-4">

          {transactions.map(tx => (

            <div
              key={tx.id}
              className="flex justify-between items-center border rounded-xl p-4 hover:bg-gray-50 transition"
            >

              <div>

                <p className="font-semibold">
                  {tx.order}
                </p>

                <p className="text-sm text-gray-500">
                  {tx.date}
                </p>

              </div>

              <div className="text-right">

                <p className="font-bold text-green-600 text-lg">
                  +₹{tx.amount}
                </p>

                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {tx.status}
                </span>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}