import { profileData as data } from "../../../data/profileData";

export default function Profile() {
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
            <p className="text-gray-500 mt-1">
              Welcome back to your kitchen.
            </p>
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
    />

    <ManageCard
      icon="fa-wallet"
      title="Payment Methods"
      subtitle="Manage UPI & Cards"
    />

    <ManageCard
      icon="fa-language"
      title="Language Settings"
      subtitle="English / Regional"
    />
  </div>
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

function PlanCard({ plan }) {
  return (
    <div className="
      bg-orange-50
      shadow-md shadow-orange-200/40
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

      <div className="md:text-right">
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
      bg-white
      shadow-md shadow-black/5
      rounded-xl
      p-5
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

      <div className="h-32 bg-gray-200 rounded-lg mb-3"></div>

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

function ManageCard({ icon, title, subtitle }) {
  return (
    <div className="
      bg-white
      shadow-md shadow-black/5
      rounded-2xl
      p-8
      text-center
      hover:shadow-lg
      transition
      cursor-pointer
    ">
      
      {/* Icon circle */}
      <div className="
        w-14 h-14
        mx-auto mb-4
        rounded-full
        bg-orange-50
        flex items-center justify-center
        text-orange-500 text-xl
      ">
        <i className={`fa-solid ${icon}`}></i>
      </div>

      <h3 className="font-semibold text-lg">
        {title}
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        {subtitle}
      </p>

    </div>
  );
}

