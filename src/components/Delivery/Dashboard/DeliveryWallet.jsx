import { useState } from "react";

export default function DeliveryWallet() {
  const [showWithdraw, setShowWithdraw] = useState(false);

  const transactions = [
    { id: "MB-12345", type: "Delivery Fee", amount: 120, status: "Completed", date: "Today 10:42 AM" },
    { id: "MB-12346", type: "Tip", amount: 40, status: "Pending", date: "Yesterday" },
    { id: "MB-12347", type: "Delivery Fee", amount: 95, status: "Completed", date: "Feb 14" },
  ];

  return (
    <div className="bg-[#f7f5f3] min-h-screen p-6">

      {/* HERO BALANCE CARD */}
      <div className="bg-white rounded-2xl shadow-md p-8 mb-6">
        <h1 className="text-3xl font-bold mb-4">My Wallet</h1>

        <div className="flex items-end gap-10 flex-wrap">
          <div>
            <p className="text-gray-500">Available balance</p>
            <p className="text-5xl font-bold text-green-600">₹1,820.00</p>
          </div>

          <div>
            <p className="text-gray-500">Pending (on-hold)</p>
            <p className="text-xl font-semibold">₹500.00</p>
          </div>

          <div>
            <p className="text-gray-500">Total earned (month)</p>
            <p className="text-xl font-semibold">₹5,320.00</p>
          </div>
        </div>

        <div className="flex gap-4 mt-6 flex-wrap">
          <button
            onClick={() => setShowWithdraw(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold"
          >
            Withdraw
          </button>

          <button className="border px-8 py-3 rounded-xl font-semibold hover:bg-gray-100">
            View earnings
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-3">
          Withdrawals processed in 1–2 business days. Min ₹200.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">

        {/* LEFT: TRANSACTIONS */}
        <div className="col-span-2 bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-xl font-bold mb-4">Transactions</h2>

          <div className="space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="border rounded-xl p-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer"
              >
                <div>
                  <p className="font-semibold">{tx.id}</p>
                  <p className="text-sm text-gray-500">{tx.type} • {tx.date}</p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-green-600">+₹{tx.amount}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      tx.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT: PAYOUT SIDEBAR */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-5">

          <h3 className="font-bold text-lg">Payout Method</h3>

          <div className="border rounded-xl p-4">
            <p className="font-semibold">Bank Transfer</p>
            <p className="text-sm text-gray-500">**** 1234</p>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              Verified
            </span>

            <button className="block mt-3 text-orange-500 font-semibold">
              Change
            </button>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Pending Payouts</h4>
            <p className="text-sm text-gray-600">
              ₹500 requested • Arrives Feb 20
            </p>
          </div>

          <button
            onClick={() => setShowWithdraw(true)}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold"
          >
            Request Payout
          </button>

          <div className="bg-gray-50 rounded-xl p-4 text-sm">
            <p className="font-semibold">Need help?</p>
            <p className="text-gray-600">
              Contact support for payout issues.
            </p>
          </div>

        </div>
      </div>

      {/* WITHDRAW MODAL */}
      {showWithdraw && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white rounded-2xl p-8 w-[420px]">
            <h3 className="text-xl font-bold mb-4">Request Withdrawal</h3>

            <label className="text-sm text-gray-600">Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full border rounded-lg p-3 mt-1 mb-3"
            />

            <p className="text-sm text-gray-500 mb-4">
              Min ₹200 • Fee ₹10 • Arrival 1–2 business days
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowWithdraw(false)}
                className="flex-1 border py-3 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={() => setShowWithdraw(false)}
                className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-semibold"
              >
                Confirm
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
