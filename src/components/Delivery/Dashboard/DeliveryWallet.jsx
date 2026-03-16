import { useState, useEffect } from "react";
import axios from "axios";
import { getWallet } from "../../../api/DeliveryWallet";
import { getUser } from "../../../utils/getUser";

export default function DeliveryWallet() {

  const loggedUser = getUser();
  const partnerId = loggedUser?.id;

  const [transactions, setTransactions] = useState([]);
  const [userData, setUserData] = useState(null);
  const [profile, setProfile] = useState(null);

  const [showWithdraw, setShowWithdraw] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const [tab, setTab] = useState("ALL");

  useEffect(() => {
    if (partnerId) {
      loadWallet();
      loadUser();
      loadProfile();
    }
  }, [partnerId]);

  /* ---------------- LOAD WALLET ---------------- */

  async function loadWallet() {
    try {

      const res = await getWallet(partnerId);
      setTransactions(res.data);

    } catch (err) {
      console.error("Wallet fetch error:", err);
    }
  }

  /* ---------------- USER NAME ---------------- */

  async function loadUser() {
    try {

      const res = await axios.get(
        `http://localhost:8080/api/users/${partnerId}`
      );

      setUserData(res.data);

    } catch (err) {
      console.error("User fetch error:", err);
    }
  }

  /* ---------------- DELIVERY PROFILE ---------------- */

  async function loadProfile() {
    try {

      const res = await axios.get(
        `http://localhost:8080/api/delivery-partner/profile/${partnerId}`
      );

      setProfile(res.data);

    } catch (err) {
      console.error("Profile fetch error:", err);
    }
  }

  /* ---------------- WITHDRAW ---------------- */

  async function handleWithdraw() {

    if (!withdrawAmount) return;

    try {

      setLoading(true);

      await axios.post(
        "http://localhost:8080/api/wallet/withdraw",
        null,
        {
          params: {
            partnerId: partnerId,
            amount: Number(withdrawAmount)
          }
        }
      );

      setWithdrawAmount("");
      setShowWithdraw(false);

      await loadWallet();

    } catch (err) {

      console.error("Withdraw error:", err);
      alert("Withdraw failed");

    } finally {

      setLoading(false);

    }
  }

  /* ---------------- BALANCE ---------------- */

  const balance = transactions.reduce((sum, tx) => {

    if (tx.type === "WITHDRAW") {
      return sum - tx.amount;
    }

    return sum + tx.amount;

  }, 0);

  /* ---------------- FILTER TABS ---------------- */

  const creditedTransactions = transactions.filter(
    (tx) => tx.type === "CREDIT"
  );

  const withdrawnTransactions = transactions.filter(
    (tx) => tx.type === "WITHDRAW"
  );

  const filteredTransactions =
    tab === "CREDIT"
      ? creditedTransactions
      : tab === "WITHDRAW"
      ? withdrawnTransactions
      : transactions;

  return (

    <div className="bg-[#F6F2EF] min-h-screen p-8">

      {/* PROFILE CARD */}

      <div className="bg-white rounded-2xl shadow-md p-6 mb-6 flex justify-between items-center">

        <div>

          <h2 className="text-xl font-bold">
            {userData?.name || "Delivery Partner"}
          </h2>

          <p className="text-gray-500 text-sm">
            Delivery Partner
          </p>

        </div>

        <div>

          {profile?.verified ? (

            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              Verified ✓
            </span>

          ) : (

            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
              Pending Verification
            </span>

          )}

        </div>

      </div>

      {/* WALLET CARD */}

      <div className="bg-white rounded-2xl shadow-md p-8 mb-8">

        <h1 className="text-3xl font-bold mb-4">
          My Wallet
        </h1>

        <p className="text-gray-500">
          Available Balance
        </p>

        <p className="text-5xl font-bold text-green-600 mt-2">
          ₹{balance}
        </p>

        <p className="text-sm text-gray-500 mt-2">
          From {transactions.length} transactions
        </p>

        <button
          onClick={() => setShowWithdraw(true)}
          className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-xl hover:bg-orange-600"
        >
          Withdraw
        </button>

      </div>

      {/* TRANSACTIONS */}

      <div className="bg-white rounded-2xl shadow-md p-6">

        <h2 className="text-xl font-bold mb-6">
          Transactions
        </h2>

        {/* TABS */}

        <div className="flex gap-4 mb-6">

          <button
            onClick={() => setTab("CREDIT")}
            className={`px-4 py-2 rounded-lg ${
              tab === "CREDIT"
                ? "bg-green-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Credited
          </button>

          <button
            onClick={() => setTab("WITHDRAW")}
            className={`px-4 py-2 rounded-lg ${
              tab === "WITHDRAW"
                ? "bg-red-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Withdrawn
          </button>

        </div>

        {filteredTransactions.length === 0 && (
          <p className="text-gray-500">
            No transactions yet
          </p>
        )}

        <div className="space-y-4">

          {filteredTransactions.map((tx) => (

            <div
              key={tx.id}
              className="flex justify-between items-center border rounded-xl p-4"
            >

              <div>

                <p className="font-semibold">
                  {tx.type === "CREDIT"
                    ? `Order #${tx.orderId}`
                    : "Wallet Withdrawal"}
                </p>

                <p className="text-sm text-gray-500">
                  {new Date(tx.createdAt).toLocaleDateString()}
                </p>

              </div>

              <div className="text-right">

                <p
                  className={`font-bold text-lg ${
                    tx.type === "WITHDRAW"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {tx.type === "WITHDRAW" ? "-" : "+"}₹{tx.amount}
                </p>

                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                  {tx.status}
                </span>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* WITHDRAW MODAL */}

      {showWithdraw && (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

          <div className="bg-white rounded-xl p-6 w-96">

            <h2 className="text-xl font-bold mb-4">
              Withdraw Money
            </h2>

            <input
              type="number"
              placeholder="Enter amount"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg mb-4"
            />

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setShowWithdraw(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleWithdraw}
                disabled={loading}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg"
              >
                {loading ? "Processing..." : "Withdraw"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}