import { profileData as data } from "../../../data/profileData";
import { useState } from "react";

export default function Profile() {
  const [activeSection, setActiveSection] = useState(null);
  return (
    <div className="min-h-screen bg-[#F6F2EF]">
      {/* MAIN WRAPPER */}
      <main
        className="

          // px-4 sm:px-6 md:px-10
          // py-6 md:py-10
          w-full px-6 md:px-10

        "
      >
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Namaste, {data.name}! 👋
            </h1>
            <p className="text-gray-500 mt-1">Welcome back to your kitchen.</p>
          </div>

          <div className="flex gap-8 md:gap-10">
            <Stat label="Orders" value={data.orders} />
            <Stat label="Subscribed" value={data.subscribed} />
          </div>
        </div>

        {/* MEAL PLAN */}
        <Section title="My Meal Plans">
          <PlanCard plan={data.plan} />
        </Section>

        {/* ORDERS */}
        <Section title="Recent Orders">
          {data.recentOrders.map((o) => (
            <OrderCard key={o.id} order={o} />
          ))}
        </Section>

        {/* FAVORITES */}
        <Section title="My Favorite Kitchens">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.favorites.map((f, i) => (
              <FavoriteCard key={i} fav={f} />
            ))}
          </div>
        </Section>

        {/* MANAGE PROFILE */}
        <Section title="Manage My Profile">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ManageCard
              icon="fa-location-dot"
              title="Delivery Address"
              subtitle="Manage your home/office"
              onClick={() => setActiveSection("address")}
            />

            <ManageCard
              icon="fa-wallet"
              title="Payment Methods"
              subtitle="Manage UPI & Cards"
              onClick={() => setActiveSection("payment")}
            />

            <ManageCard
              icon="fa-language"
              title="Language Settings"
              subtitle="English / Regional"
              onClick={() => setActiveSection("language")}
            />
          </div>
        </Section>
        {/* ADDRESS MANAGER */}
        {activeSection === "address" && <ManageAddress />}

        {/* PAYMENT MANAGER */}
        {activeSection === "payment" && <ManagePayment />}

        {/* LANGUAGE SETTINGS */}
        {activeSection === "language" && <LanguageSettings />}
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
      <p className="text-xl sm:text-2xl font-bold text-orange-500">{value}</p>
      <p className="text-xs text-gray-500 uppercase">{label}</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-12">
      <h2 className="font-semibold text-lg mb-5">{title}</h2>

      {children}
    </div>
  );
}

function PlanCard({ plan }) {
  return (
    <div
      className="
      bg-orange-50
      shadow-md shadow-orange-200/40
      p-6 rounded-xl
      flex flex-col md:flex-row
      gap-6 md:justify-between
    "
    >
      <div>
        <span className="bg-orange-500 text-white px-3 py-1 text-xs rounded-full">
          Active Subscription
        </span>

        <h3 className="text-xl font-semibold mt-3">{plan.title}</h3>

        <p className="text-gray-600 mt-2">Next delivery: {plan.nextDelivery}</p>

        <p className="text-gray-500 text-sm">{plan.daysLeft} days left</p>
      </div>

      <div className="md:text-right">
        <p className="text-sm text-gray-500">This month’s savings</p>

        <p className="text-2xl font-bold text-orange-500">₹{plan.savings}</p>
      </div>
    </div>
  );
}

function OrderCard({ order }) {
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
        <img src={order.image} className="w-16 h-16 rounded-lg object-cover" />

        <div>
          <h3 className="font-semibold">{order.title}</h3>

          <p className="text-gray-500 text-sm">{order.kitchen}</p>

          <p className="text-orange-500 font-semibold">₹{order.price}</p>
        </div>
      </div>

      <button className="bg-orange-500 text-white px-5 py-2 rounded-full whitespace-nowrap">
        Track Order
      </button>
    </div>
  );
}

function FavoriteCard({ fav }) {
  return (
    <div className="bg-white shadow-md shadow-black/5 rounded-xl p-5">
      <div className="h-32 bg-gray-200 rounded-lg mb-3"></div>

      <h3 className="font-semibold">{fav.name}</h3>

      <p className="text-sm text-gray-500">⭐ {fav.rating}</p>

      <button className="mt-3 border px-4 py-2 rounded-full w-full hover:bg-gray-50">
        View Menu
      </button>
    </div>
  );
}

function ManageCard({ icon, title, subtitle, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md cursor-pointer transition flex items-start gap-4"
    >
      <div className="w-10 h-10 flex items-center justify-center bg-orange-50 text-orange-500 rounded-lg">
        <i className={`fa-solid ${icon}`}></i>
      </div>

      <div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}

function ManageAddress() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg">Delivery Addresses</h3>

        <button
          onClick={() => setShowPopup(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg"
        >
          + Add Address
        </button>
      </div>

      <div className="space-y-4">
        <AddressCard label="Home" address="B-402, Green Valley Apartments" />
        <AddressCard label="Office" address="Cyber Hub, Gurgaon" />
      </div>

      {showPopup && <AddAddressPopup close={() => setShowPopup(false)} />}
    </div>
  );
}

function ManagePayment() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg">Payment Methods</h3>

        <button
          onClick={() => setShowPopup(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg"
        >
          + Add Payment
        </button>
      </div>

      <div className="space-y-4">
        <PaymentCard type="UPI" value="rajesh@okhdfcbank" />
        <PaymentCard type="Card" value="•••• •••• •••• 4242" />
      </div>

      {showPopup && <AddPaymentPopup close={() => setShowPopup(false)} />}
    </div>
  );
}

function LanguageSettings() {
  const [language, setLanguage] = useState("en");

  return (
    <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
      <h3 className="font-semibold text-lg mb-6">Language Preferences</h3>

      <div className="grid md:grid-cols-2 gap-4">
        <button
          onClick={() => setLanguage("en")}
          className={`p-4 rounded-xl border transition ${
            language === "en"
              ? "bg-orange-50 border-orange-400"
              : "hover:bg-gray-50"
          }`}
        >
          English
        </button>

        <button
          onClick={() => setLanguage("hi")}
          className={`p-4 rounded-xl border transition ${
            language === "hi"
              ? "bg-orange-50 border-orange-400"
              : "hover:bg-gray-50"
          }`}
        >
          हिंदी
        </button>
      </div>
    </div>
  );
}

function AddressCard({ label, address }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-gray-500">{address}</p>
      </div>

      <button className="text-red-500 text-sm">Remove</button>
    </div>
  );
}
function PaymentCard({ type, value }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
      <div>
        <p className="font-medium">{type}</p>
        <p className="text-sm text-gray-500">{value}</p>
      </div>

      <button className="text-red-500 text-sm">Remove</button>
    </div>
  );
}
