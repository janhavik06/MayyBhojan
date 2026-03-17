import { useState, useEffect } from "react";

export default function AdminApprovals() {

  const [tab, setTab] = useState("pending");
  const [pending, setPending] = useState([]);
  const [all, setAll] = useState([]);
  const [detailsModal, setDetailsModal] = useState(null);
  const [actionFeedback, setActionFeedback] = useState(null);
  const [selected, setSelected] = useState([]);

  useEffect(() => { loadPending(); }, []);
  useEffect(() => { if (tab === "all") loadAll(); }, [tab]);

  async function loadPending() {
    try {
      const res = await fetch("http://localhost:8080/api/admin/homemakers/pending");
      setPending(await res.json());
    } catch (e) { console.error(e); }
  }

  async function loadAll() {
    try {
      const res = await fetch("http://localhost:8080/api/admin/homemakers/all");
      setAll(await res.json());
    } catch (e) { console.error(e); }
  }

  async function openDetails(kitchen) {
    try {
      const res = await fetch(`http://localhost:8080/api/admin/homemaker/${kitchen.id}/details`);
      const data = await res.json();
      setDetailsModal({ ...data, accountStatus: kitchen.accountStatus });
    } catch (e) { console.error(e); }
  }

  async function approveKitchen(id) {
    try {
      await fetch(`http://localhost:8080/api/admin/homemaker/${id}/approve`, { method: "PUT" });
      setDetailsModal(null);
      setPending(prev => prev.filter(k => k.id !== id));
      toast("approve", "Homemaker approved successfully");
    } catch (e) { console.error(e); }
  }

  async function rejectKitchen(id) {
    try {
      await fetch(`http://localhost:8080/api/admin/homemaker/${id}/reject`, { method: "PUT" });
      setDetailsModal(null);
      setPending(prev => prev.filter(k => k.id !== id));
      if (tab === "all") loadAll();
      toast("reject", "Homemaker rejected");
    } catch (e) { console.error(e); }
  }

  async function bulkApprove() {
    const selectedKitchens = selected.map(i => pending[i]);
    for (let k of selectedKitchens) {
      await fetch(`http://localhost:8080/api/admin/homemaker/${k.id}/approve`, { method: "PUT" });
    }
    const ids = selectedKitchens.map(k => k.id);
    setPending(prev => prev.filter(k => !ids.includes(k.id)));
    setSelected([]);
    toast("approve", "Selected kitchens approved");
  }

  function toast(type, message) {
    setActionFeedback({ type, message });
    setTimeout(() => setActionFeedback(null), 3000);
  }

  function toggleSelect(index) {
    setSelected(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  }

  const isPendingTab = tab === "pending";

  return (
    <div className="space-y-6">

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

      {/* PENDING LIST */}
      {isPendingTab && (
        <div className="space-y-4">
          {pending.length === 0 && (
            <p className="text-gray-400 text-center py-10">No pending approvals</p>
          )}
          {pending.map((k, i) => (
            <KitchenCard
              key={k.id}
              kitchen={k}
              index={i}
              selected={selected.includes(i)}
              toggleSelect={toggleSelect}
              onViewDetails={() => openDetails(k)}
              onApprove={() => approveKitchen(k.id)}
              onReject={() => rejectKitchen(k.id)}
              showActions
            />
          ))}
        </div>
      )}

      {/* ALL HOMEMAKERS LIST */}
      {!isPendingTab && (
        <div className="space-y-4">
          {all.length === 0 && (
            <p className="text-gray-400 text-center py-10">No processed homemakers yet</p>
          )}
          {all.map((k) => (
            <KitchenCard
              key={k.id}
              kitchen={k}
              onViewDetails={() => openDetails(k)}
              showActions={false}
            />
          ))}
        </div>
      )}

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

// ─── Kitchen Card ─────────────────────────────────────────────────────────────

function KitchenCard({ kitchen, onViewDetails, onApprove, onReject, toggleSelect, selected, index, showActions }) {

  const statusStyle = {
    ACTIVE:   "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
    UNDER_REVIEW: "bg-yellow-100 text-yellow-700",
  };

  const statusLabel = {
    ACTIVE:   "Approved",
    REJECTED: "Rejected",
    UNDER_REVIEW: "Pending",
  };

  const status = kitchen.accountStatus || "UNDER_REVIEW";

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center justify-between border">
      <div className="flex items-center gap-4">
        {showActions && (
          <input type="checkbox" checked={selected} onChange={() => toggleSelect(index)} />
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

function DetailsModal({ data, onClose, onApprove, onReject }) {

  const [tab, setTab] = useState("overview");
  const tabs = ["overview", "identity", "documents", "banking"];

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden">

        <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white p-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
              {data.name?.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold">{data.name}</h2>
              <p className="text-sm opacity-90">{data.email}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white text-2xl font-bold hover:opacity-70">✕</button>
        </div>

        <div className="flex border-b">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-3 font-semibold capitalize text-sm border-b-2 transition
                ${tab === t ? "border-orange-500 text-orange-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="p-6 min-h-[220px]">
          {tab === "overview" && (
            <div className="grid grid-cols-2 gap-4">
              <InfoCard label="Full Name" value={data.name} />
              <InfoCard label="Email" value={data.email} />
              <InfoCard label="Phone" value={data.phone} />
              <InfoCard label="Date of Birth" value={data.dob} />
              <InfoCard label="Address" value={data.address} className="col-span-2" />
            </div>
          )}
          {tab === "identity" && (
            <div className="space-y-3">
              <Row label="Full Name" value={data.name} />
              <Row label="Phone" value={data.phone} />
              <Row label="Date of Birth" value={data.dob} />
              <Row label="Address" value={data.address} />
            </div>
          )}
          {tab === "documents" && (
            <div className="grid grid-cols-3 gap-4">
              <DocCard title="Government ID" url={data.govtIdUrl} />
              <DocCard title="FSSAI Certificate" url={data.fssaiUrl} />
              <DocCard title="Kitchen Photo" url={data.kitchenPhotoUrl} />
            </div>
          )}
          {tab === "banking" && (
            <div className="space-y-3">
              <Row label="Account Holder" value={data.accountHolderName} />
              <Row label="Account Number" value={data.accountNumber} />
              <Row label="IFSC Code" value={data.ifscCode} />
            </div>
          )}
        </div>

        <div className="flex gap-3 p-6 border-t bg-gray-50">
          {onApprove && (
            <button onClick={onApprove} className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600">
              ✔ Approve Kitchen
            </button>
          )}
          {onReject && (
            <button onClick={onReject} className="flex-1 border border-red-300 text-red-600 py-3 rounded-xl font-semibold hover:bg-red-50">
              ✖ Reject
            </button>
          )}
          {!onApprove && !onReject && (
            <p className="text-sm text-gray-400 w-full text-center py-2">View only — homemaker already processed.</p>
          )}
        </div>

      </div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function InfoCard({ label, value, className = "" }) {
  return (
    <div className={`bg-gray-50 border rounded-xl p-4 ${className}`}>
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className="font-semibold text-gray-800">{value || "—"}</p>
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
