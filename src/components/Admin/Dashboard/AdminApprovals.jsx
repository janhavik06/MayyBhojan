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
  const [tab, setTab] = useState("overview");
  const [infoMsg, setInfoMsg] = useState("");
  const [showInfoInput, setShowInfoInput] = useState(false);

  if (!kitchen) return null;

  const identity = JSON.parse(localStorage.getItem("cook_identity")) || {};
  const bank = JSON.parse(localStorage.getItem("cook_bank_setup")) || {};
  const stepsKey = `cook_onboarding_steps_${kitchen.email}`;
  const steps = JSON.parse(localStorage.getItem(stepsKey)) || {};

  const tabs = ["overview", "identity", "documents", "banking"];

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    rejected: "bg-red-100 text-red-600",
    info_required: "bg-orange-100 text-orange-600",
    approved: "bg-green-100 text-green-700",
  };

  function handleRequestInfo() {
    if (!infoMsg.trim()) return;
    const requests = JSON.parse(localStorage.getItem("verification_requests")) || [];
    const updated = requests.map((r) =>
      r.email === kitchen.email ? { ...r, status: "info_required", message: infoMsg } : r
    );
    localStorage.setItem("verification_requests", JSON.stringify(updated));
    window.dispatchEvent(new Event("verificationUpdated"));
    onRequest(kitchen.index);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl relative flex flex-col">

        {/* TOP BANNER */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-t-2xl p-6 text-white">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white text-xl"><i className="fa-solid fa-xmark"></i></button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
              {kitchen.name?.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{kitchen.name}</h2>
              <p className="text-orange-100 text-sm">{kitchen.owner} • {kitchen.city}</p>
              <p className="text-orange-200 text-xs mt-1">{kitchen.email}</p>
            </div>
            <div className="ml-auto text-right">
              <span className={`text-xs px-3 py-1 rounded-full font-semibold bg-white/20`}>
                Ref: {kitchen.refId}
              </span>
              <p className={`mt-2 text-xs px-3 py-1 rounded-full font-semibold inline-block capitalize
                ${kitchen.status === "pending" ? "bg-yellow-200 text-yellow-800" : "bg-red-200 text-red-800"}`}>
                {kitchen.status}
              </p>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="flex border-b px-6 bg-white">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-3 text-sm font-semibold capitalize border-b-2 transition
                ${tab === t ? "border-orange-500 text-orange-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <div className="p-6 flex-1">

          {/* OVERVIEW */}
          {tab === "overview" && (
            <div className="space-y-5">
              <div className="grid grid-cols-3 gap-4">
                <InfoTile icon="fa-house" label="Kitchen Name" value={kitchen.name} />
                <InfoTile icon="fa-user" label="Owner" value={kitchen.owner} />
                <InfoTile icon="fa-location-dot" label="City" value={kitchen.city} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <InfoTile icon="fa-envelope" label="Email" value={kitchen.email} />
                <InfoTile icon="fa-tag" label="Ref ID" value={kitchen.refId} />
                <InfoTile icon="fa-clipboard" label="Status" value={<span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${statusColors[kitchen.status] || ""}`}>{kitchen.status}</span>} />
              </div>

              {/* ONBOARDING STEPS */}
              <div className="bg-gray-50 rounded-xl p-5">
                <p className="font-semibold text-sm mb-4">Onboarding Checklist</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: "identity", label: "Identity Verified", icon: "fa-id-card" },
                    { key: "documents", label: "Documents Uploaded", icon: "fa-file-arrow-up" },
                    { key: "banking", label: "Banking Setup", icon: "fa-building-columns" },
                    { key: "audit", label: "Final Audit", icon: "fa-shield-halved" },
                  ].map(({ key, label, icon }) => (
                    <div key={key} className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm
                      ${steps[key] ? "bg-green-50 border-green-200 text-green-700" : "bg-white border-gray-200 text-gray-400"}`}>
                      <i className={`fa-solid ${icon}`}></i>
                      <span className="font-medium">{label}</span>
                      {steps[key] && <i className="fa-solid fa-circle-check ml-auto"></i>}
                    </div>
                  ))}
                </div>
              </div>

              {kitchen.message && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-sm text-orange-700">
                  <p className="font-semibold mb-1">Previous Admin Note:</p>
                  <p>{kitchen.message}</p>
                </div>
              )}
            </div>
          )}

          {/* IDENTITY */}
          {tab === "identity" && (
            <div className="space-y-4">
              <SectionHeader title="Identity Details" badge={steps.identity ? "Verified" : "Not Submitted"} ok={steps.identity} />
              {steps.identity ? (
                <div className="grid grid-cols-2 gap-4">
                  <InfoTile icon="fa-user" label="Full Name" value={identity.name || kitchen.owner} />
                  <InfoTile icon="fa-phone" label="Phone" value={identity.phone || "—"} />
                  <InfoTile icon="fa-cake-candles" label="Date of Birth" value={identity.dob || "—"} />
                  <InfoTile icon="fa-house" label="Address" value={identity.address || "—"} />
                </div>
              ) : (
                <EmptyState msg="Cook has not submitted identity details yet." />
              )}
            </div>
          )}

          {/* DOCUMENTS */}
          {tab === "documents" && (
            <div className="space-y-4">
              <SectionHeader title="Uploaded Documents" badge={steps.documents ? "Uploaded" : "Not Uploaded"} ok={steps.documents} />
              {steps.documents ? (
                <div className="grid grid-cols-3 gap-4">
                  <DocCard icon="fa-id-card" title="Government ID" url={kitchen.govtIdUrl} />
                  <DocCard icon="fa-file-shield" title="FSSAI Certificate" url={kitchen.fssaiUrl} />
                  <DocCard icon="fa-camera" title="Kitchen Photo" url={kitchen.kitchenPhotoUrl} />
                </div>
              ) : (
                <EmptyState msg="No documents uploaded yet." />
              )}
            </div>
          )}

          {/* BANKING */}
          {tab === "banking" && (
            <div className="space-y-4">
              <SectionHeader title="Banking Details" badge={steps.banking ? "Submitted" : "Not Submitted"} ok={steps.banking} />
              {steps.banking ? (
                <div className="grid grid-cols-2 gap-4">
                  <InfoTile icon="fa-user" label="Account Holder" value={bank.name || "—"} />
                  <InfoTile icon="fa-building-columns" label="Account Number" value={bank.account ? `••••${String(bank.account).slice(-4)}` : "—"} />
                  <InfoTile icon="fa-hashtag" label="IFSC Code" value={bank.ifsc || "—"} />
                </div>
              ) : (
                <EmptyState msg="Cook has not submitted banking details yet." />
              )}
            </div>
          )}
        </div>

        {/* ACTION BAR */}
        <div className="border-t px-6 py-4 bg-gray-50 rounded-b-2xl">
          {showInfoInput ? (
            <div className="space-y-3">
              <textarea
                value={infoMsg}
                onChange={(e) => setInfoMsg(e.target.value)}
                placeholder="Describe what information is needed from the cook..."
                rows={3}
                className="w-full border rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <div className="flex gap-3">
                <button
                  onClick={handleRequestInfo}
                  className="bg-orange-500 text-white px-6 py-2 rounded-xl text-sm font-semibold"
                >
                  Send Request
                </button>
                <button
                  onClick={() => setShowInfoInput(false)}
                  className="border px-6 py-2 rounded-xl text-sm text-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => { onApprove(kitchen.index); onClose(); }}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold text-sm transition"
              >
                <i className="fa-solid fa-circle-check mr-2"></i>Approve Kitchen
              </button>
              <button
                onClick={() => setShowInfoInput(true)}
                className="flex-1 bg-orange-100 hover:bg-orange-200 text-orange-700 py-3 rounded-xl font-semibold text-sm transition"
              >
                <i className="fa-solid fa-circle-info mr-2"></i>Request Info
              </button>
              <button
                onClick={() => { onReject(kitchen.index); onClose(); }}
                className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 py-3 rounded-xl font-semibold text-sm transition"
              >
                <i className="fa-solid fa-circle-xmark mr-2"></i>Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoTile({ icon, label, value }) {
  return (
    <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
      <p className="text-xs text-gray-400 mb-1"><i className={`fa-solid ${icon} mr-1`}></i>{label}</p>
      <p className="text-sm font-semibold text-gray-800 truncate">{value || "—"}</p>
    </div>
  );
}

function SectionHeader({ title, badge, ok }) {
  return (
    <div className="flex items-center justify-between mb-2">
      <p className="font-semibold text-gray-800">{title}</p>
      <span className={`text-xs px-3 py-1 rounded-full font-semibold ${ok ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
        <i className={`fa-solid ${ok ? "fa-circle-check" : "fa-triangle-exclamation"} mr-1`}></i>{badge}
      </span>
    </div>
  );
}

function DocCard({ icon, title, url }) {
  const [preview, setPreview] = useState(false);

  const isImage = url && /\.(jpg|jpeg|png|webp|gif)$/i.test(url);

  return (
    <>
      <div className="rounded-xl border bg-white border-gray-200 p-4 flex flex-col gap-3">
        {/* PREVIEW AREA */}
        <div
          onClick={() => url && setPreview(true)}
          className={`h-32 rounded-lg flex items-center justify-center overflow-hidden border
            ${url ? "bg-gray-50 cursor-pointer hover:opacity-80 transition" : "bg-gray-100"}`}
        >
          {url ? (
            isImage ? (
              <img src={url} alt={title} className="h-full w-full object-cover rounded-lg" />
            ) : (
              <div className="text-center">
                <i className={`fa-solid ${icon} text-4xl text-gray-400`}></i>
                <p className="text-xs text-gray-500 mt-1">Click to view</p>
              </div>
            )
          ) : (
            <i className={`fa-solid ${icon} text-4xl text-gray-300`}></i>
          )}
        </div>

        <p className="text-sm font-semibold text-gray-700">{title}</p>

        {url ? (
          <div className="flex gap-2">
            <button
              onClick={() => setPreview(true)}
              className="flex-1 text-xs bg-orange-50 hover:bg-orange-100 text-orange-600 font-semibold py-2 rounded-lg transition"
            >
              <i className="fa-solid fa-eye mr-1"></i>View
            </button>
            <a
              href={url}
              download
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg text-center transition"
            >
              <i className="fa-solid fa-download mr-1"></i>Download
            </a>
          </div>
        ) : (
          <span className="text-xs text-center text-gray-400">Not uploaded</span>
        )}
      </div>

      {/* LIGHTBOX */}
      {preview && (
        <div
          className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-6"
          onClick={() => setPreview(false)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b">
              <p className="font-semibold text-gray-800">{title}</p>
              <div className="flex gap-3 items-center">
                <a
                  href={url}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm bg-orange-500 text-white px-4 py-1.5 rounded-lg font-semibold hover:bg-orange-600 transition"
                >
                  <i className="fa-solid fa-download mr-1"></i>Download
                </a>
                <button onClick={() => setPreview(false)} className="text-gray-400 hover:text-gray-700 text-xl"><i className="fa-solid fa-xmark"></i></button>
              </div>
            </div>
            <div className="p-4 flex items-center justify-center min-h-[300px] bg-gray-50">
              {isImage ? (
                <img src={url} alt={title} className="max-h-[60vh] max-w-full rounded-lg object-contain" />
              ) : (
                <div className="text-center space-y-4">
                  <i className={`fa-solid ${icon} text-6xl text-gray-400`}></i>
                  <p className="text-gray-600 text-sm">This file cannot be previewed directly.</p>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block bg-orange-500 text-white px-6 py-2 rounded-xl text-sm font-semibold"
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square mr-1"></i>Open in new tab
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function EmptyState({ msg }) {
  return (
    <div className="text-center py-10 text-gray-400 text-sm">
      <i className="fa-solid fa-inbox text-3xl mb-3 block"></i>
      <p>{msg}</p>
    </div>
  );
}
