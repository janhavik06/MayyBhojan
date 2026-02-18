import { useState } from "react";

export default function DeliveryDashboard() {
  const orders = [
    {
      id: 1,
      kitchen: "Meera's Homestyle Kitchen",
      address: "Green Valley Apartments, Sector 4",
      distance: "1.2 km",
      earn: 45,
      status: "Ready in 5 mins",
      drop: "Student Housing Block B",
      items: "2x Paneer Butter Masala, 4x Butter Naan",
    },
    {
      id: 2,
      kitchen: "Aunty's Spice Box",
      address: "Rosewood Residency, Lane 2",
      distance: "2.8 km",
      earn: 65,
      status: "Ready in 12 mins",
      drop: "Library North Gate",
      items: "1x Special Veg Thali, 1x Mango Lassi",
    },
    {
      id: 3,
      kitchen: "Dadi's Special Rasoi",
      address: "Sunrise Villas, Block C",
      distance: "0.8 km",
      earn: 35,
      status: "Ready Now",
      drop: "Engineering Faculty Entrance",
      items: "3x Homemade Paratha, 1x Aloo Gobi",
    },
  ];

  return (
    <div className=" bg-[#F6F2EF] min-h-screen p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Available Deliveries
          </h1>
          <p className="text-gray-600 mt-2">
            Nearby orders waiting for a delivery partner.
          </p>
        </div>

        <div className="flex gap-4">

          <Stat label="Today's Pay" value="₹1,420" />
          <Stat label="Orders" value="12" />
          <Stat label="Rating" value="4.9" />

        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-[2fr_1fr] gap-8">

        {/* LEFT COLUMN — ORDERS */}
        <div className="space-y-6">

          {orders.map(o => (
            <div key={o.id}
              className="bg-white rounded-2xl p-6 shadow-sm border">

              <div className="flex justify-between">

                <div>
                  <h3 className="font-semibold">
                    {o.kitchen}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {o.address}
                  </p>
                </div>

                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                  {o.distance}
                </span>

              </div>

              {/* EARN + STATUS */}
              <div className="grid grid-cols-2 gap-4 mt-4">

                <InfoBox
                  title="You earn"
                  value={`₹${o.earn}`}
                />

                <InfoBox
                  title="Status"
                  value={o.status}
                />

              </div>

              {/* DETAILS */}
              <div className="text-sm text-gray-600 mt-4 space-y-1">

                <p>Drop-off: {o.drop}</p>
                <p>🛵 {o.items}</p>

              </div>

              {/* ACTIONS */}
              <div className="flex gap-4 mt-6">

                <button className="flex-1 border border-red-300 text-red-500 py-3 rounded-xl hover:bg-red-50">
                  Decline
                </button>

                <button className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-semibold">
                  Accept Order
                </button>

              </div>

            </div>
          ))}

        </div>

        {/* RIGHT COLUMN — SAFETY */}
        <div className="space-y-6">

          <SideCard title="Safety & Hygiene">
            <Tip text="Always wear your mask and sanitize hands before pickup." />
            <Tip text="Arrive on time to keep meals warm." />
            <Tip text="Follow customer contactless delivery preferences." />
          </SideCard>

          <SideCard title="Delivery Guidelines">
            <Accordion title="Pickup Procedure" />
            <Accordion title="Spillage Policy" />
            <Accordion title="Student Incentives" />
          </SideCard>

          <div className="bg-orange-100 rounded-2xl p-6 text-center">

            <h3 className="font-semibold">
              Top Student Partner
            </h3>

            <p className="text-sm mt-2">
              You've helped 240+ families enjoy fresh meals.
            </p>

            <button className="mt-4 bg-white px-4 py-2 rounded-xl">
              View Success Story
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

/* ---------- UI HELPERS ---------- */

function Stat({ label, value }) {
  return (
    <div className="bg-white rounded-xl px-4 py-3 shadow-sm text-center">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-bold">{value}</p>
    </div>
  );
}

function InfoBox({ title, value }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <p className="text-xs text-gray-500">{title}</p>
      <p className="font-semibold mt-1">{value}</p>
    </div>
  );
}

function SideCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="font-semibold mb-4">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Tip({ text }) {
  return (
    <div className="bg-gray-50 p-3 rounded-lg text-sm">
      {text}
    </div>
  );
}

function Accordion({ title }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-xl">

      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between px-4 py-3 text-sm font-medium"
      >
        {title}
        {open ? "−" : "+"}
      </button>

      {open && (
        <div className="px-4 pb-4 text-sm text-gray-600">
          Guideline details appear here.
        </div>
      )}

    </div>
  );
}
