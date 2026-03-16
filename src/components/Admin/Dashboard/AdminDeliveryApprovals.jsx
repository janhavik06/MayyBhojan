import { useState, useEffect } from "react";

export default function AdminDeliveryApprovals() {

  const [tab, setTab] = useState("pending");
  const [pending, setPending] = useState([]);
  const [all, setAll] = useState([]);
  const [detailsModal, setDetailsModal] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [actionFeedback, setActionFeedback] = useState(null);

  const API = "http://localhost:8080/api/admin";

  useEffect(() => { loadPending(); }, []);
  useEffect(() => { if (tab === "all") loadAll(); }, [tab]);

  async function loadPending() {
    try {
      const res = await fetch(`${API}/delivery/pending`);
      const data = await res.json();
      setPending(data || []);
    } catch (err) {
      console.error("Pending load failed", err);
    }
  }

  async function loadAll() {
    try {
      const res = await fetch(`${API}/delivery/all`);
      const data = await res.json();
      setAll(data || []);
    } catch (err) {
      console.error("All load failed", err);
    }
  }

  async function openDetails(partner) {
    try {

      setLoadingDetails(true);

      const res = await fetch(`${API}/delivery/${partner.id}/details`);
      const data = await res.json();

      setDetailsModal({
        ...data,
        accountStatus: partner.accountStatus
      });

    } catch (err) {
      console.error("Details load failed", err);
    } finally {
      setLoadingDetails(false);
    }
  }

  async function approvePartner(id) {
    try {

      await fetch(`${API}/delivery/${id}/approve`, { method: "PUT" });

      setDetailsModal(null);

      setPending(prev => prev.filter(p => p.id !== id));

      toast("approve", "Delivery Partner Approved");

    } catch (err) {
      console.error(err);
    }
  }

  async function rejectPartner(id) {
    try {

      await fetch(`${API}/delivery/${id}/reject`, { method: "PUT" });

      setDetailsModal(null);

      setPending(prev => prev.filter(p => p.id !== id));

      toast("reject", "Delivery Partner Rejected");

    } catch (err) {
      console.error(err);
    }
  }

  function toast(type, message) {

    setActionFeedback({ type, message });

    setTimeout(() => setActionFeedback(null), 3000);

  }

  const isPendingTab = tab === "pending";

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div>
        <h1 className="text-3xl font-bold">
          Delivery Partner Verification
        </h1>

        <p className="text-gray-500">
          Manage delivery partner approvals
        </p>
      </div>

      {/* TABS */}

      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">

        <TabBtn active={isPendingTab} onClick={() => setTab("pending")}>
          Pending
          {pending.length > 0 &&
            <span className="ml-1 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
              {pending.length}
            </span>}
        </TabBtn>

        <TabBtn active={!isPendingTab} onClick={() => setTab("all")}>
          All Delivery Partners
        </TabBtn>

      </div>

      {/* PENDING LIST */}

      {isPendingTab && (

        <div className="space-y-4">

          {pending.length === 0 &&
            <p className="text-gray-400 text-center py-10">
              No pending approvals
            </p>
          }

          {pending.map((p) => (

            <PartnerCard
              key={p.id}
              partner={p}
              onViewDetails={() => openDetails(p)}
              onApprove={() => approvePartner(p.id)}
              onReject={() => rejectPartner(p.id)}
              showActions
            />

          ))}

        </div>

      )}

      {/* ALL LIST */}

      {!isPendingTab && (

        <div className="space-y-4">

          {all.length === 0 &&
            <p className="text-gray-400 text-center py-10">
              No processed partners yet
            </p>
          }

          {all.map((p) => (

            <PartnerCard
              key={p.id}
              partner={p}
              onViewDetails={() => openDetails(p)}
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
          onApprove={isPendingTab ? () => approvePartner(detailsModal.id) : null}
          onReject={detailsModal.accountStatus !== "REJECTED"
            ? () => rejectPartner(detailsModal.id)
            : null}
        />
      )}

      {/* TOAST */}

      {actionFeedback && (

        <div className="fixed bottom-6 right-6 w-80 bg-white shadow-xl border rounded-2xl p-5 flex gap-3">

          <div className={`w-10 h-10 flex items-center justify-center rounded-full
            ${actionFeedback.type === "approve"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"}`}>

            {actionFeedback.type === "approve" ? "✔" : "✖"}

          </div>

          <div>
            <p className="font-semibold">Action Completed</p>
            <p className="text-sm text-gray-500">
              {actionFeedback.message}
            </p>
          </div>

        </div>

      )}

    </div>
  );
}

/* ---------------- TAB BUTTON ---------------- */

function TabBtn({ active, onClick, children }) {

  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-1
      ${active
        ? "bg-white shadow text-orange-600"
        : "text-gray-500 hover:text-gray-700"}`}
    >
      {children}
    </button>
  );

}

/* ---------------- PARTNER CARD ---------------- */

function PartnerCard({ partner, onViewDetails, onApprove, onReject, showActions }) {

  const statusStyle = {
    ACTIVE: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
    UNDER_REVIEW: "bg-yellow-100 text-yellow-700"
  };

  const statusLabel = {
    ACTIVE: "Approved",
    REJECTED: "Rejected",
    UNDER_REVIEW: "Pending"
  };

  const status = partner?.accountStatus || "UNDER_REVIEW";

  return (

    <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center justify-between border">

      <div className="flex items-center gap-4">

        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-lg">
          {partner?.name?.charAt(0) || "U"}
        </div>

        <div>

          <p className="font-semibold">{partner?.name}</p>

          <p className="text-sm text-gray-500">
            {partner?.email}
          </p>

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
            <button
              onClick={onApprove}
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-green-500 text-white hover:bg-green-600"
            >
              Approve
            </button>

            <button
              onClick={onReject}
              className="px-4 py-2 rounded-lg text-sm border border-red-200 text-red-600 hover:bg-red-50"
            >
              Reject
            </button>
          </>

        )}

      </div>

    </div>

  );

}

/* ---------------- DETAILS MODAL ---------------- */

function DetailsModal({ data, onClose, onApprove, onReject }) {

  const [tab, setTab] = useState("overview");

  const tabs = ["overview", "documents", "vehicle"];

  return (

    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">

      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white p-6 flex justify-between items-center">

          <div>
            <h2 className="text-xl font-bold">{data?.name}</h2>
            <p className="text-sm opacity-90">{data?.email}</p>
          </div>

          <button onClick={onClose} className="text-2xl font-bold">✕</button>

        </div>

        {/* TABS */}

        <div className="flex border-b">

          {tabs.map((t) => (

            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-3 font-semibold capitalize text-sm border-b-2 transition
                ${tab === t
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"}`}
            >
              {t}
            </button>

          ))}

        </div>

        {/* CONTENT */}

        <div className="p-6 min-h-[220px]">

          {tab === "overview" && (

            <div className="grid grid-cols-2 gap-4">

              <InfoCard label="Full Name" value={data?.name} />
              <InfoCard label="Email" value={data?.email} />
              <InfoCard label="Phone" value={data?.phone} />
              <InfoCard label="Address" value={data?.address} className="col-span-2" />

            </div>

          )}

          {tab === "documents" && (

            <div className="grid grid-cols-2 gap-4">

              <DocCard title="ID Proof" url={data?.idProofUrl} />
              <DocCard title="Driving License" url={data?.licenseUrl} />

            </div>

          )}

          {tab === "vehicle" && (

            <div className="space-y-3">

              <Row label="Vehicle Type" value={data?.vehicleType} />
              <Row label="Vehicle Number" value={data?.vehicleNumber} />

            </div>

          )}

        </div>

        {/* ACTIONS */}

        <div className="flex gap-3 p-6 border-t bg-gray-50">

          {onApprove && (
            <button
              onClick={onApprove}
              className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600"
            >
              ✔ Approve Partner
            </button>
          )}

          {onReject && (
            <button
              onClick={onReject}
              className="flex-1 border border-red-300 text-red-600 py-3 rounded-xl font-semibold hover:bg-red-50"
            >
              ✖ Reject
            </button>
          )}

        </div>

      </div>

    </div>

  );

}

/* ---------------- HELPERS ---------------- */

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
          <img
            src={url}
            alt={title}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <span className="text-4xl">📄</span>
        )}

      </div>

      <p className="font-semibold text-sm mb-2">{title}</p>

      {url &&
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 text-sm underline hover:text-blue-700"
        >
          View Full Size
        </a>
      }

    </div>

  );

}