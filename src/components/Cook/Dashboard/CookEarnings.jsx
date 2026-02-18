import { useState } from "react";

export default function CookEarnings() {
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  return (
    <div className=" bg-[#F6F2EF] min-h-screen p-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Financial Hub
          </h1>

          <p className="text-gray-600 mt-2">
            Monitor your earnings and manage your payouts.
          </p>
        </div>

        <div className="flex gap-4">

          <button className="border px-5 py-3 rounded-xl">
            Help
          </button>

          <button
            onClick={() => setWithdrawOpen(true)}
            className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Request Withdrawal
          </button>

        </div>

      </div>

      {/* TOP STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-[#F6DED3] p-6 rounded-2xl shadow-sm">
          <p className="text-xs text-gray-600">TOTAL LIFETIME</p>
          <p className="text-2xl font-bold mt-2">₹1,24,500</p>
          <p className="text-sm text-gray-600 mt-1">+12% from last month</p>
        </div>

        <div className="bg-[#F2DCE4] p-6 rounded-2xl shadow-sm">
          <p className="text-xs text-gray-600">AVAILABLE NOW</p>
          <p className="text-2xl font-bold mt-2">₹4,280</p>
          <p className="text-sm text-gray-600 mt-1">Ready for withdrawal</p>
        </div>

        <div className="bg-[#F4E7D2] p-6 rounded-2xl shadow-sm">
          <p className="text-xs text-gray-600">PROCESSING</p>
          <p className="text-2xl font-bold mt-2">₹1,850</p>
          <p className="text-sm text-gray-600 mt-1">Expected by Oct 30</p>
        </div>

      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-[2fr_1fr] gap-8">

        {/* LEFT COLUMN */}
        <div className="space-y-8">

          {/* CHART CARD */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">

            <h3 className="font-semibold mb-4">
              Earnings Growth
            </h3>

            <div className="h-48 flex items-center justify-center text-gray-400 border rounded-xl">
              (Chart Placeholder)
            </div>

          </div>

          {/* PAYOUT HISTORY */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">

            <h3 className="font-semibold mb-4">
              Payout History
            </h3>

            <table className="w-full text-sm">

              <thead className="text-gray-500">
                <tr>
                  <th className="text-left pb-3">Transaction</th>
                  <th className="text-left">Date</th>
                  <th className="text-left">Amount</th>
                  <th className="text-left">Method</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody className="divide-y">

                {[
                  ["TX-9021", "Oct 24", "₹8,500", "UPI", "Completed"],
                  ["TX-8842", "Oct 17", "₹7,200", "Bank", "Completed"],
                  ["TX-8299", "Oct 03", "₹6,400", "Bank", "Processing"]
                ].map(row => (
                  <tr key={row[0]}>
                    {row.map((cell, i) => (
                      <td key={i} className="py-3">{cell}</td>
                    ))}
                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-8">

          {/* INSTANT PAYOUT */}
          <div className="bg-orange-500 text-white rounded-2xl p-8 shadow-lg">

            <h3 className="font-semibold text-lg">
              Instant Payouts
            </h3>

            <p className="mt-2 text-sm opacity-90">
              Need funds immediately? Withdraw instantly to UPI.
            </p>

            <div className="bg-orange-400 mt-6 p-4 rounded-xl">
              Limit remaining today: ₹15,000
            </div>

            <button className="mt-6 bg-white text-orange-500 w-full py-3 rounded-xl font-semibold">
              Withdraw Funds
            </button>

          </div>

          {/* TIPS */}
          <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">

            <h4 className="font-semibold">
              Pro Earnings Tips
            </h4>

            <div className="bg-orange-50 p-4 rounded-xl text-sm">
              Enable subscriptions to earn 40% more.
            </div>

            <div className="bg-pink-50 p-4 rounded-xl text-sm">
              Festival meals increase visibility 2×.
            </div>

          </div>

          {/* HELP */}
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center">

            <h4 className="font-semibold">
              Earnings Query?
            </h4>

            <p className="text-gray-600 mt-2 text-sm">
              Our support team can clarify payout questions.
            </p>

            <button className="mt-4 border px-5 py-3 rounded-xl w-full">
              Contact Support
            </button>

          </div>

        </div>

      </div>

      {/* FOOTER INFO */}
      <div className="bg-white rounded-2xl p-8 shadow-sm mt-8">

        <h3 className="font-semibold">
          Understanding Your Payouts
        </h3>

        <p className="text-gray-600 mt-3">
          MayBhojan processes payouts every Tuesday. A nominal 10% platform fee
          is deducted to cover insurance and marketing for your kitchen.
        </p>

      </div>

      {/* WITHDRAW MODAL */}
      {withdrawOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">

          <div className="bg-white rounded-2xl p-8 w-[400px]">

            <h3 className="font-semibold text-lg">
              Confirm Withdrawal
            </h3>

            <p className="text-gray-600 mt-2">
              Withdraw ₹4,280 to your bank?
            </p>

            <div className="flex gap-4 mt-6">

              <button
                onClick={() => setWithdrawOpen(false)}
                className="border px-5 py-3 rounded-xl w-full"
              >
                Cancel
              </button>

              <button className="bg-orange-500 text-white px-5 py-3 rounded-xl w-full">
                Confirm
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
