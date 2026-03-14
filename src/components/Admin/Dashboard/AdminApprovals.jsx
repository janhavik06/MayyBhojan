import { useState, useEffect } from "react";
export default function AdminApprovals() {
  const [selected, setSelected] = useState([]);
  const [toast, setToast] = useState(null);
  const [actionFeedback, setActionFeedback] = useState(null);
  const [kitchens, setKitchens] = useState([]);
  const [selectedKitchen, setSelectedKitchen] = useState(null);
  useEffect(() => {
    const requests =
      JSON.parse(localStorage.getItem("verification_requests")) || [];

    setKitchens(requests);
  }, []);
  function toggleSelect(index) {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  }

  function approveKitchen(index) {
    const kitchen = kitchens[index];

    const stepsKey = `cook_onboarding_steps_${kitchen.email}`;
    const steps = JSON.parse(localStorage.getItem(stepsKey)) || {};

    steps.audit = true;
    localStorage.setItem(stepsKey, JSON.stringify(steps));

    const updated = kitchens.filter((_, i) => i !== index);
    setKitchens(updated);

    localStorage.setItem("verification_requests", JSON.stringify(updated));

    // 🔥 ADD THIS
    window.dispatchEvent(new Event("verificationUpdated"));
  }

  function rejectKitchen(index) {
    const updated = [...kitchens];

    updated[index].status = "rejected"; // ✅ keep it

    setKitchens(updated);
    localStorage.setItem("verification_requests", JSON.stringify(updated));

    window.dispatchEvent(new Event("verificationUpdated"));

    setActionFeedback({
      type: "reject",
      message: `Request rejected`,
    });

    setTimeout(() => setActionFeedback(null), 3000);
  }
  function requestInfo(index) {
    const updated = [...kitchens];

    updated[index].status = "info_required";
    updated[index].message = "Please upload clear FSSAI certificate"; // 🔥 dynamic later

    setKitchens(updated);
    localStorage.setItem("verification_requests", JSON.stringify(updated));

    window.dispatchEvent(new Event("verificationUpdated"));

    setActionFeedback({
      type: "info",
      message: `Information requested from ${updated[index].owner}`,
    });

    setTimeout(() => setActionFeedback(null), 3000);
  }

  function bulkApprove() {
    selected.forEach((i) => {
      const kitchen = kitchens[i];
      const stepsKey = `cook_onboarding_steps_${kitchen.email}`;
      const steps = JSON.parse(localStorage.getItem(stepsKey)) || {};
      steps.audit = true;
      localStorage.setItem(stepsKey, JSON.stringify(steps));
    });

    const updated = kitchens.filter((_, i) => !selected.includes(i));

    setKitchens(updated);
    localStorage.setItem("verification_requests", JSON.stringify(updated));

    // 🔥 ADD THIS
    window.dispatchEvent(new Event("verificationUpdated"));

    setActionFeedback({
      type: "approve",
      message: `${selected.length} kitchens approved`,
    });

    setSelected([]);
    setTimeout(() => setActionFeedback(null), 3000);
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Kitchen Verification</h1>
          <p className="text-gray-500">
            Manage pending approvals and maintain platform safety standards.
          </p>
        </div>

        <button
          onClick={bulkApprove}
          className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold"
        >
          Bulk Approve Selected
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-6">
        <Stat title="Pending Approvals" value="24" />
        <Stat title="Urgent Action" value="08" />
        <Stat title="Verified Today" value="12" />
        <Stat title="Avg Wait Time" value="2.4 Days" />
      </div>

      {/* FILTERS */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4 font-semibold">
          <span className="text-orange-600 border-b-2 border-orange-600">
            ALL
          </span>
          <span className="text-gray-500">Urgent</span>
          <span className="text-gray-500">Reviewing</span>
          <span className="text-gray-500">Flagged</span>
        </div>

        <input
          placeholder="Search by kitchen or owner..."
          className="border px-4 py-2 rounded-xl w-72"
        />
      </div>

      {/* LIST */}
      <div className="space-y-6">
        {kitchens.map((k, i) => (
          <KitchenCard
            key={i}
            index={i}
            kitchen={k}
            onApprove={approveKitchen}
            onReject={rejectKitchen}
            onRequest={requestInfo}
            toggleSelect={toggleSelect}
            selected={selected.includes(i)}
            openModal={() => setSelectedKitchen({ ...k, index: i })} // 🔥 ADD THIS
          />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <p>Showing 4 of 24 pending applications</p>

        <div className="flex gap-2">
          <button className="border px-4 py-2 rounded-lg">Previous</button>
          <button className="bg-orange-100 px-4 py-2 rounded-lg">1</button>
          <button className="border px-4 py-2 rounded-lg">2</button>
          <button className="border px-4 py-2 rounded-lg">3</button>
          <button className="border px-4 py-2 rounded-lg">Next</button>
        </div>
      </div>

      {/* GUIDELINES */}
      <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl">
        <h3 className="font-bold mb-2">Administrator Trust Guidelines</h3>
        <p className="text-gray-600 text-sm">
          Every kitchen approved is a promise of safety and quality. Verify
          FSSAI documents carefully and match photos with owner ID. Use “Request
          Info” when unsure.
        </p>
      </div>
      {toast && (
        <div className="fixed bottom-6 right-6 bg-black text-white px-6 py-3 rounded-xl shadow-lg">
          {toast}
        </div>
      )}

      {actionFeedback && (
        <div className="fixed bottom-6 right-6 w-80 bg-white shadow-xl border rounded-2xl p-5 flex gap-3 items-start">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full
        ${
          actionFeedback.type === "approve"
            ? "bg-green-100 text-green-600"
            : actionFeedback.type === "reject"
              ? "bg-red-100 text-red-600"
              : "bg-orange-100 text-orange-600"
        }
      `}
          >
            {actionFeedback.type === "approve" && "✔"}
            {actionFeedback.type === "reject" && "✖"}
            {actionFeedback.type === "info" && "ℹ"}
          </div>

          <div>
            <p className="font-semibold">Action Completed</p>

            <p className="text-sm text-gray-500">{actionFeedback.message}</p>
          </div>
        </div>
      )}
      {selectedKitchen && (
        <KitchenModal
          kitchen={selectedKitchen}
          onClose={() => setSelectedKitchen(null)}
          onApprove={approveKitchen}
          onReject={rejectKitchen}
          onRequest={requestInfo}
        />
      )}
    </div>
  );
}

/* COMPONENTS */

function Stat({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <p className="text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  );
}

function KitchenCard({
  kitchen,
  onApprove,
  onReject,
  onRequest,
  toggleSelect,
  selected,
  index,
  openModal, // ✅ ADD
}) {
  return (
    <div
      onClick={kitchen.status === "rejected" ? undefined : openModal}
      className={`bg-white rounded-2xl shadow-sm p-5 flex items-center justify-between border transition
    ${
      kitchen.status === "rejected"
        ? "opacity-50 cursor-not-allowed"
        : "hover:shadow-md cursor-pointer"
    }
  `}
    >
      {" "}
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => toggleSelect(index)}
        />

        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-lg">
          {kitchen.name?.charAt(0)}
        </div>

        {/* Info */}
        <div>
          <p className="font-semibold">{kitchen.name}</p>
          <p className="text-sm text-gray-500">
            {kitchen.owner} • {kitchen.city}
          </p>

          {/* Status */}
          <div className="mt-1">
            {kitchen.status === "pending" && (
              <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                ⏳ Pending
              </span>
            )}

            {kitchen.status === "rejected" && (
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">
                ❌ Rejected
              </span>
            )}
          </div>
        </div>
      </div>
      {/* ACTIONS */}
      <div className="flex gap-2">
        <button
          disabled={kitchen.status === "rejected"}
          onClick={(e) => {
            e.stopPropagation();
            onApprove(index);
          }}
          className={`px-4 py-2 rounded-lg text-sm font-semibold
    ${
      kitchen.status === "rejected"
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : "bg-green-500 text-white hover:bg-green-600"
    }
  `}
        >
          Approve
        </button>

        <button
          disabled={kitchen.status === "rejected"}
          onClick={(e) => {
            e.stopPropagation();
            onRequest(index);
          }}
          className={`px-4 py-2 rounded-lg text-sm border
    ${
      kitchen.status === "rejected"
        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
        : ""
    }
  `}
        >
          Request
        </button>

        <button
          disabled={kitchen.status === "rejected"}
          onClick={(e) => {
            e.stopPropagation();
            onReject(index);
          }}
          className={`px-4 py-2 rounded-lg text-sm border border-red-200
    ${
      kitchen.status === "rejected"
        ? "text-gray-400 cursor-not-allowed"
        : "text-red-600"
    }
  `}
        >
          Reject
        </button>
      </div>
    </div>
  );
}

function Checklist({ item }) {
  return (
    <label className="flex gap-2 text-sm text-gray-600">
      <input type="checkbox" /> {item}
    </label>
  );
}

function Progress() {
  return (
    <div className="mt-3 h-2 bg-gray-200 rounded-full">
      <div className="h-2 bg-orange-500 w-2/3 rounded-full"></div>
    </div>
  );
}
function KitchenModal({ kitchen, onClose, onApprove, onReject, onRequest }) {
  if (!kitchen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[700px] max-h-[90vh] overflow-y-auto rounded-2xl p-6 shadow-xl relative">
        {/* CLOSE */}
        <button onClick={onClose} className="absolute top-4 right-4 text-xl">
          ✖
        </button>

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-xl font-bold">
            {kitchen.name?.charAt(0)}
          </div>

          <div>
            <h2 className="text-xl font-bold">{kitchen.name}</h2>
            <p className="text-gray-500">{kitchen.city}</p>
            <p className="text-sm text-gray-400">{kitchen.email}</p>
          </div>
        </div>

        {/* DETAILS */}
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="font-semibold mb-2">Owner Details</h3>
            <p>
              <b>Name:</b> {kitchen.owner}
            </p>
            <p>
              <b>Email:</b> {kitchen.email}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Status</h3>
            <p className="capitalize">{kitchen.status}</p>
            {kitchen.message && (
              <p className="text-orange-500 mt-2">{kitchen.message}</p>
            )}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => {
              onApprove(kitchen.index);
              onClose();
            }}
            className="bg-green-500 text-white px-6 py-2 rounded-lg"
          >
            Approve
          </button>

          <button
            onClick={() => {
              onReject(kitchen.index);
              onClose();
            }}
            className="bg-red-500 text-white px-6 py-2 rounded-lg"
          >
            Reject
          </button>

          <button
            onClick={() => {
              onRequest(kitchen.index);
              onClose();
            }}
            className="border px-6 py-2 rounded-lg"
          >
            Request Info
          </button>
        </div>
      </div>
    </div>
  );
}
