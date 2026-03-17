import { useState, useEffect } from "react";

export default function AdminApprovals() {
  const [kitchens, setKitchens] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("audit_requests")) || [];

    // ✅ only pending
    const pending = data.filter((k) => k.status === "pending");

    setKitchens(pending);
  }, []);

  function updateStatus(id, status) {
    const data = JSON.parse(localStorage.getItem("audit_requests")) || [];

    const updated = data.map((k) => (k.id === id ? { ...k, status } : k));

    // update storage
    localStorage.setItem("audit_requests", JSON.stringify(updated));

    // ✅ keep only pending in UI
    const pending = updated.filter((k) => k.status === "pending");
    setKitchens(pending);
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Kitchen Verification</h1>
          <p className="text-gray-500">Manage homemaker approvals</p>
        </div>
        {isPendingTab && (
          <button
            onClick={bulkApprove}
            className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600"
          >
            Bulk Approve Selected
          </button>
        )}
      </div>

      {/* TABS */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        <TabBtn active={isPendingTab} onClick={() => setTab("pending")}>
          Pending {pending.length > 0 && <span className="ml-1 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">{pending.length}</span>}
        </TabBtn>
        <TabBtn active={!isPendingTab} onClick={() => setTab("all")}>
          All Homemakers
        </TabBtn>
      </div>

      {/* FILTERS */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4 font-semibold">
          <span className="text-orange-600 border-b-2 border-orange-600">
            ALL
          </span>
          <span className="text-gray-500">urgent</span>
          <span className="text-gray-500">reviewing</span>
          <span className="text-gray-500">flagged</span>
        </div>
      )}

        <input
          placeholder="Search by kitchen or owner..."
          className="border px-4 py-2 rounded-xl w-72"
        />
      </div>

      {/* LIST */}
      <div className="space-y-6">
        {kitchens.map((k, i) => (
          <KitchenCard key={i} kitchen={k} updateStatus={updateStatus} />
        ))}
      </div>

      {/* DETAILS MODAL */}
      {detailsModal && (
        <DetailsModal
          data={detailsModal}
          onClose={() => setDetailsModal(null)}
          onApprove={isPendingTab ? () => approveKitchen(detailsModal.id) : null}
          onReject={detailsModal.accountStatus !== "REJECTED" ? () => rejectKitchen(detailsModal.id) : null}
        />
      )}

      {/* TOAST */}
      {actionFeedback && (
        <div className="fixed bottom-6 right-6 w-80 bg-white shadow-xl border rounded-2xl p-5 flex gap-3 items-start z-50">
          <div className={`w-10 h-10 flex items-center justify-center rounded-full
            ${actionFeedback.type === "approve" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
            {actionFeedback.type === "approve" ? "✔" : "✖"}
          </div>
          <div>
            <p className="font-semibold">Action Completed</p>
            <p className="text-sm text-gray-500">{actionFeedback.message}</p>
          </div>
        </div>
      )}

      {/* GUIDELINES */}
      <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl">
        <h3 className="font-bold mb-2">Administrator Trust Guidelines</h3>
        <p className="text-gray-600 text-sm">
          Every kitchen approved is a promise of safety and quality. Verify
          FSSAI documents carefully and match photos with owner ID. Use “Request
          Info” when unsure.
        </p>
      </div>
    </div>
  );
}

// ─── Tab Button ───────────────────────────────────────────────────────────────

function TabBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-1
        ${active ? "bg-white shadow text-orange-600" : "text-gray-500 hover:text-gray-700"}`}
    >
      {children}
    </button>
  );
}

function KitchenCard({ kitchen, updateStatus }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 grid grid-cols-4 gap-6">
      {/* INFO */}
      <div>
        <p className="font-bold text-lg">{kitchen.name}</p>
        <p className="text-orange-600">{kitchen.owner}</p>
        <p className="text-sm text-gray-500">{kitchen.city}</p>
        {kitchen.urgent && (
          <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">
            Urgent
          </span>
        )}
        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-lg">
          {kitchen.name?.charAt(0)}
        </div>
        <div>
          <p className="font-semibold">{kitchen.name}</p>
          <p className="text-sm text-gray-500">{kitchen.email}</p>
          <span className={`px-2 py-1 rounded-full text-xs mt-1 inline-block ${statusStyle[status]}`}>
            {statusLabel[status]}
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onViewDetails}
          className="px-4 py-2 rounded-lg text-sm font-semibold bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100"
        >
          View Details
        </button>
        {showActions && (
          <>
            <button onClick={onApprove} className="px-4 py-2 rounded-lg text-sm font-semibold bg-green-500 text-white hover:bg-green-600">
              Approve
            </button>
            <button onClick={onReject} className="px-4 py-2 rounded-lg text-sm border border-red-200 text-red-600 hover:bg-red-50">
              Reject
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Details Modal ────────────────────────────────────────────────────────────

      {/* ACTIONS */}
      <div className="flex flex-col gap-3">
        <button
          onClick={() => updateStatus(kitchen.id, "approved")}
          className="bg-green-500 text-white py-2 rounded-xl"
        >
          Approve
        </button>

        <button
          onClick={() => updateStatus(kitchen.id, "rejected")}
          className="text-red-500 border border-red-200 py-2 rounded-xl"
        >
          Reject
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between border-b pb-3">
      <span className="text-gray-500 text-sm">{label}</span>
      <span className="font-semibold text-sm text-gray-800">{value || "—"}</span>
    </div>
  );
}

function DocCard({ title, url }) {
  return (
    <div className="border rounded-xl p-4 text-center">
      <div className="h-24 flex items-center justify-center bg-gray-100 rounded-lg mb-3 overflow-hidden">
        {url ? (
          <img src={url} alt={title} className="w-full h-full object-cover rounded-lg"
            onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
        ) : (
          <span className="text-4xl">📄</span>
        )}
        <div className="hidden w-full h-full items-center justify-center text-4xl">📄</div>
      </div>
      <p className="font-semibold text-sm mb-2">{title}</p>
      {url ? (
        <a href={url} target="_blank" rel="noreferrer" className="text-blue-500 text-sm underline hover:text-blue-700">
          View Full Size
        </a>
      ) : (
        <p className="text-gray-400 text-xs">Not uploaded</p>
      )}
    </div>
  );
}
