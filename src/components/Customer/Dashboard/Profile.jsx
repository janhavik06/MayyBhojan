import { profileData as data } from "../../../data/profileData";

export default function Profile() {
  return (
    <div className="min-h-screen bg-[#F6F2EF] flex">

      {/* SIDEBAR — DESKTOP ONLY */}
      <aside className="
        hidden md:flex
        w-64 bg-white shadow-md shadow-black/5
        fixed left-0 top-18 bottom-0 z-50
        flex-col
      ">
        {/* TOP MENU */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto scrollbar-hide">
          <SidebarItem label="My Orders" active />
          <SidebarItem label="Favorites" />
          <SidebarItem label="Settings" />
        </div>

        {/* LOGOUT */}
        <div className="p-6 shadow-[0_-2px_8px_rgba(0,0,0,0.05)]">
          <SidebarItem label="Logout" danger />
        </div>
      </aside>

      {/* MAIN */}
      <main className="
        flex-1 w-full
        p-4 sm:p-6 md:p-10
        md:ml-64
        overflow-y-auto
      ">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Namaste, {data.name}! 👋
            </h1>
            <p className="text-gray-500 mt-1">
              Welcome back to your kitchen.
            </p>
          </div>

          <div className="flex gap-6 sm:gap-10 text-left md:text-right">
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
          {data.recentOrders.map(o => (
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
            <ManageCard title="Delivery Address" />
            <ManageCard title="Payment Methods" />
            <ManageCard title="Language Settings" />
          </div>
        </Section>

      </main>
    </div>
  );
}

//////////////////////////////
// COMPONENTS
//////////////////////////////

function SidebarItem({ label, active, danger }) {
  return (
    <div
      className={`
        p-3 rounded-lg cursor-pointer transition
        ${active ? "bg-orange-100 text-orange-600" : ""}
        ${danger ? "text-red-500" : "hover:bg-orange-50"}
      `}
    >
      {label}
    </div>
  );
}

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
    <div className="mt-10 sm:mt-12">
      <h2 className="font-semibold text-lg mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}

function PlanCard({ plan }) {
  return (
    <div className="
      bg-orange-50 shadow-md shadow-orange-200/40
      p-6 rounded-xl
      flex flex-col md:flex-row
      gap-6 md:justify-between
    ">

      <div>
        <span className="bg-orange-500 text-white px-3 py-1 text-xs rounded-full">
          Active Subscription
        </span>

        <h3 className="text-xl font-semibold mt-3">
          {plan.title}
        </h3>

        <p className="text-gray-600 mt-2">
          Next delivery: {plan.nextDelivery}
        </p>

        <p className="text-gray-500 text-sm">
          {plan.daysLeft} days left
        </p>
      </div>

      <div className="text-left md:text-right">
        <p className="text-sm text-gray-500">
          This month’s savings
        </p>

        <p className="text-2xl font-bold text-orange-500">
          ₹{plan.savings}
        </p>
      </div>
    </div>
  );
}

function OrderCard({ order }) {
  return (
    <div className="
      bg-white shadow-md shadow-black/5 rounded-xl p-5
      flex flex-col sm:flex-row gap-4
      sm:justify-between sm:items-center
      mb-4
    ">

      <div className="flex gap-4 items-center">
        <img
          src={order.image}
          className="w-16 h-16 rounded-lg object-cover"
        />

        <div>
          <h3 className="font-semibold">
            {order.title}
          </h3>

          <p className="text-gray-500 text-sm">
            {order.kitchen}
          </p>

          <p className="text-orange-500 font-semibold">
            ₹{order.price}
          </p>
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

      <div className="h-32 w-full bg-gray-200 rounded-lg mb-3"></div>

      <h3 className="font-semibold">
        {fav.name}
      </h3>

      <p className="text-sm text-gray-500">
        ⭐ {fav.rating}
      </p>

      <button className="mt-3 border px-4 py-2 rounded-full w-full hover:bg-gray-50">
        View Menu
      </button>
    </div>
  );
}

function ManageCard({ title }) {
  return (
    <div className="bg-white shadow-md shadow-black/5 rounded-xl p-6 text-center">
      <h3 className="font-semibold">
        {title}
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        Manage settings
      </p>
    </div>
  );
}
