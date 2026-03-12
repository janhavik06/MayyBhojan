import { useState } from "react";
export default function AdminApprovals() {
  const [selected, setSelected] = useState([]);
  const [toast, setToast] = useState(null);
  const [actionFeedback, setActionFeedback] = useState(null);
  const [kitchens, setKitchens] = useState([
    {
      name: "Dadi's Desi Tadka",
      owner: "Smt. Kamala Devi",
      city: "Indore",
      urgent: true,
    },
    {
      name: "The Healthy Pot",
      owner: "Mrs. Reena Sharma",
      city: "Pune",
      urgent: false,
    },
    {
      name: "Annapurna Rasoi",
      owner: "Smt. Shanti Iyer",
      city: "Chennai",
      urgent: false,
    },
    {
      name: "Pind Di Khushboo",
      owner: "Smt. Gurpreet Kaur",
      city: "Amritsar",
      urgent: false,
    },
  ]);
  function toggleSelect(index) {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  }
  function approveKitchen(index) {
    const kitchen = kitchens[index];

    setKitchens((prev) => prev.filter((_, i) => i !== index));

    setActionFeedback({
      type: "approve",
      message: `${kitchen.name} approved successfully`,
    });

    setTimeout(() => setActionFeedback(null), 3000);
  }
  function rejectKitchen(index) {
    const kitchen = kitchens[index];

    setKitchens((prev) => prev.filter((_, i) => i !== index));

    setActionFeedback({
      type: "reject",
      message: `${kitchen.name} rejected`,
    });

    setTimeout(() => setActionFeedback(null), 3000);
  }
  function requestInfo(index) {
    const kitchen = kitchens[index];

    setActionFeedback({
      type: "info",
      message: `Information requested from ${kitchen.owner}`,
    });

    setTimeout(() => setActionFeedback(null), 3000);
  }
  function bulkApprove() {
    setKitchens((prev) => prev.filter((_, i) => !selected.includes(i)));

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
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 grid grid-cols-4 gap-6">
      {/* INFO */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => toggleSelect(index)}
          className="mt-1"
        />

        <div>
          <p className="font-bold text-lg">{kitchen.name}</p>
          <p className="text-orange-600">{kitchen.owner}</p>
          <p className="text-sm text-gray-500">{kitchen.city}</p>

          {kitchen.urgent && (
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">
              Urgent
            </span>
          )}
        </div>
      </div>

      {/* DOCUMENTS */}
      <div>
        <p className="font-semibold mb-2">Document Status</p>
        <Checklist item="FSSAI Certificate" />
        <Checklist item="Aadhar ID" />
        <Checklist item="Kitchen Photos" />
        <Progress />
      </div>

      {/* ADMIN CHECKLIST */}
      <div>
        <p className="font-semibold mb-2">Admin Safety Checklist</p>
        <Checklist item="License matches name" />
        <Checklist item="Photos show separation" />
        <Checklist item="Owner ID verified" />
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col gap-3">
        <button
          onClick={() => onApprove(index)}
          className="bg-green-500 text-white py-2 rounded-xl"
        >
          Approve
        </button>

        <button
          onClick={() => onRequest(index)}
          className="border py-2 rounded-xl"
        >
          Request Info
        </button>

        <button
          onClick={() => onReject(index)}
          className="text-red-500 border border-red-200 py-2 rounded-xl"
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
