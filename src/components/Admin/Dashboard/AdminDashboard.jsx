export default function AdminDashboard() {
    return (
      <div className="space-y-8">
  
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Platform Overview</h1>
            <p className="text-gray-500">
              Welcome back, Administrator. Here’s a summary of platform health.
            </p>
          </div>
  
          <button className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold">
            Generate Report
          </button>
        </div>
  
        {/* KPI CARDS */}
        <div className="grid grid-cols-4 gap-6">
  
          <Card title="Total Orders" value="14,284" stat="+12.5%" />
          <Card title="Active Kitchens" value="842" stat="+4.2%" />
          <Card title="Delivery Partners" value="1,205" stat="+2.1%" />
          <Card title="Social Impact" value="₹4.8L" stat="+18.9%" />
  
        </div>
  
        {/* GROWTH + SIDEBAR */}
        <div className="grid grid-cols-3 gap-6">
  
          <div className="col-span-2 bg-white rounded-2xl p-6 shadow">
            <h2 className="font-bold mb-4">Growth Trends</h2>
  
            <div className="h-64 flex items-center justify-center text-gray-400">
              Chart Placeholder
            </div>
          </div>
  
          <div className="bg-white rounded-2xl p-6 shadow space-y-4">
            <h2 className="font-bold">Weekly Pulse</h2>
  
            <Pulse label="Kitchen Health" value="98% Normal" />
            <Pulse label="Avg Prep Time" value="32 mins" />
            <Pulse label="User Satisfaction" value="4.8 / 5" />
  
            <button className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold">
              View Detailed Feedback
            </button>
          </div>
        </div>
  
        {/* APPROVAL + SAFETY */}
        <div className="grid grid-cols-3 gap-6">
  
          <div className="col-span-2 bg-white rounded-2xl p-6 shadow space-y-4">
            <h2 className="font-bold">Kitchen Approval Queue</h2>
  
            <QueueItem name="Asha's Kitchen" time="2 hours ago" />
            <QueueItem name="Grandma's Spices" time="5 hours ago" />
            <QueueItem name="Healthy Bowl" time="1 day ago" />
          </div>
  
          <div className="bg-white rounded-2xl p-6 shadow space-y-4">
            <h2 className="font-bold">Trust & Safety</h2>
  
            <div className="bg-red-50 p-4 rounded-xl">
              Delivery dispute reported
            </div>
  
            <button className="w-full border py-3 rounded-xl font-semibold">
              Review Safety Dashboard
            </button>
          </div>
        </div>
  
        {/* COMMUNITY GROWTH */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="font-bold mb-4">
            Community Growth (Onboarding vs Recruitment)
          </h2>
  
          <div className="h-48 flex items-center justify-center text-gray-400">
            Chart Placeholder
          </div>
        </div>
  
      </div>
    );
  }
  
  /* Reusable components */
  
  function Card({ title, value, stat }) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow">
        <p className="text-gray-500">{title}</p>
        <h3 className="text-3xl font-bold">{value}</h3>
        <p className="text-green-600 text-sm">{stat} vs last month</p>
      </div>
    );
  }
  
  function Pulse({ label, value }) {
    return (
      <div className="bg-gray-50 p-4 rounded-xl flex justify-between">
        <span>{label}</span>
        <span className="font-semibold">{value}</span>
      </div>
    );
  }
  
  function QueueItem({ name, time }) {
    return (
      <div className="border p-4 rounded-xl flex justify-between">
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-gray-500">{time}</p>
        </div>
        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
          Pending
        </span>
      </div>
    );
  }
  