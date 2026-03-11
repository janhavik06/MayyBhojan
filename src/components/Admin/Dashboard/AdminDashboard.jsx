import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useState } from "react";
export default function AdminDashboard() {
  const [showReport, setShowReport] = useState(false);

  const [reportData, setReportData] = useState({
    orders: "14,284",
    kitchens: "842",
    partners: "1,205",
    impact: "₹4.8L",
    prepTime: "32 mins",
    satisfaction: "4.8 / 5",
  });

  function generateReport() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("MayBhojan Platform Report", 14, 20);

    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

    autoTable(doc, {
      startY: 40,
      head: [["Metric", "Value"]],
      body: [
        ["Total Orders", "14,284"],
        ["Active Kitchens", "842"],
        ["Delivery Partners", "1,205"],
        ["Social Impact", "₹4.8L"],
        ["Avg Prep Time", "32 mins"],
        ["User Satisfaction", "4.8 / 5"],
      ],
    });

    doc.save("MayBhojan_Admin_Report.pdf");
  }
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

        <button
          onClick={() => setShowReport(true)}
          className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold"
        >
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
      {/* COMMUNITY GROWTH */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-gray-800">Community Growth</h2>
          <span className="text-xs text-gray-500">Last 30 days</span>
        </div>

        <div className="space-y-6">
          {/* Home Cook Onboarding */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                🍱 <span>Home Cooks Onboarded</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-800">120</span>
                <span className="text-green-500 text-xs font-medium">+12%</span>
              </div>
            </div>

            <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
              <div className="bg-orange-500 h-3 rounded-full w-[70%]"></div>
            </div>
          </div>

          {/* Student Recruitment */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                🎓 <span>Students Joined</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-800">250</span>
                <span className="text-green-500 text-xs font-medium">+18%</span>
              </div>
            </div>

            <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
              <div className="bg-green-500 h-3 rounded-full w-[85%]"></div>
            </div>
          </div>

          {/* Community Volunteers */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                🤝 <span>Community Volunteers</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-800">45</span>
                <span className="text-green-500 text-xs font-medium">+7%</span>
              </div>
            </div>

            <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-3 rounded-full w-[40%]"></div>
            </div>
          </div>
        </div>
      </div>
      {showReport && (
        <ReportPreview
          data={reportData}
          setData={setReportData}
          close={() => setShowReport(false)}
        />
      )}
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
      <span className="bg-yellow-100 text-yellow-700 px-3 py-3 rounded-full text-sm">
        Pending
      </span>
    </div>
  );
}
function ReportPreview({ data, setData, close }) {
  const [editMode, setEditMode] = useState(false);

  function update(field, value) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  function downloadReport() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("MayBhojan Platform Report", 14, 20);

    doc.setFontSize(11);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 28);

    autoTable(doc, {
      startY: 40,
      head: [["Metric", "Value"]],
      body: [
        ["Total Orders", data.orders],
        ["Active Kitchens", data.kitchens],
        ["Delivery Partners", data.partners],
        ["Social Impact", data.impact],
        ["Average Prep Time", data.prepTime],
        ["User Satisfaction", data.satisfaction],
      ],
    });

    doc.save("MayBhojan_Admin_Report.pdf");
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-start justify-center pt-28 px-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[80vh] overflow-y-auto p-8 shadow-xl">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Report Preview</h2>

          <button onClick={close} className="text-gray-500 text-xl">
            ✕
          </button>
        </div>
        {/* DOCUMENT PREVIEW */}
        <div className="border p-8 rounded-lg bg-gray-50">
          <h1 className="text-2xl font-bold text-center mb-2">
            MayBhojan Platform Report
          </h1>

          <p className="text-center text-sm text-gray-500 mb-6">
            Generated on {new Date().toLocaleDateString()}
          </p>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-3 text-left">Metric</th>
                <th className="border p-3 text-left">Value</th>
              </tr>
            </thead>

            <tbody>
              <ReportRow
                label="Total Orders"
                field="orders"
                data={data}
                editMode={editMode}
                update={update}
              />

              <ReportRow
                label="Active Kitchens"
                field="kitchens"
                data={data}
                editMode={editMode}
                update={update}
              />

              <ReportRow
                label="Delivery Partners"
                field="partners"
                data={data}
                editMode={editMode}
                update={update}
              />

              <ReportRow
                label="Social Impact"
                field="impact"
                data={data}
                editMode={editMode}
                update={update}
              />

              <ReportRow
                label="Average Prep Time"
                field="prepTime"
                data={data}
                editMode={editMode}
                update={update}
              />

              <ReportRow
                label="User Satisfaction"
                field="satisfaction"
                data={data}
                editMode={editMode}
                update={update}
              />
            </tbody>
          </table>
        </div>
        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={() => setEditMode(!editMode)}
            className="border px-5 py-2 rounded-xl"
          >
            {editMode ? "Save Changes" : "Edit"}
          </button>

          <button
            onClick={downloadReport}
            className="bg-orange-500 text-white px-6 py-2 rounded-xl"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
function ReportRow({ label, field, data, editMode, update }) {
  return (
    <tr>
      <td className="border p-3 font-medium">{label}</td>

      <td className="border p-3">
        {editMode ? (
          <input
            value={data[field]}
            onChange={(e) => update(field, e.target.value)}
            className="border px-2 py-1 rounded w-full"
          />
        ) : (
          data[field]
        )}
      </td>
    </tr>
  );
}
function ReportField({ label, value, onChange }) {
  return (
    <div>
      <p className="text-sm text-gray-600 mb-1">{label}</p>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-xl px-4 py-2"
      />
    </div>
  );
}
