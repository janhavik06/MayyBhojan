import { useState, useEffect } from "react";

export default function StartAuditCTA({
  kitchenName = "Your Kitchen",
  docsReady = false,
  onSubmit,
}) {
  const [applied, setApplied] = useState(false);
  const [refId, setRefId] = useState(null);
  const [showMissing, setShowMissing] = useState(false);

  const user = JSON.parse(localStorage.getItem("maybhojan_user"));

  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    function checkStatus() {
      const requests =
        JSON.parse(localStorage.getItem("verification_requests")) || [];
      const existing = requests.find((r) => r.email === user?.email);

      // ✅ Check approved
      const stepsKey = `cook_onboarding_steps_${user?.email}`;
      const steps = JSON.parse(localStorage.getItem(stepsKey)) || {};

      if (steps.audit === true) {
        setStatus("approved");
        return;
      }

      if (existing) {
        setStatus(existing.status);
        setRefId(existing.refId);
        setMessage(existing.message); // 🔥 ADD THIS
      }
    }

    checkStatus();

    window.addEventListener("storage", checkStatus);

    return () => window.removeEventListener("storage", checkStatus);
  }, []);

  const applyForVerification = () => {
    if (!docsReady) {
      setShowMissing(true);
      return;
    }

    const requests =
      JSON.parse(localStorage.getItem("verification_requests")) || [];

    const ref = "MBV-" + Math.floor(100 + Math.random() * 900);

    const newRequest = {
      email: user.email,
      name: kitchenName,
      owner: user.name || "Home Chef",
      city: user.city || "Unknown",
      refId: ref,
      status: "pending",
    };

    requests.push(newRequest);

    localStorage.setItem("verification_requests", JSON.stringify(requests));

    setApplied(true);
    setRefId(ref);
  };
  if (status === "rejected") {
    return (
      <div className="bg-red-50 border border-red-300 rounded-xl p-5 text-sm space-y-3">
        <p className="text-red-700 font-semibold">
          ❌ Your verification was rejected
        </p>

        <p className="text-gray-600 text-sm">
          Please update your details and reapply.
        </p>

        <button
          onClick={handleReapply}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold"
        >
          🔁 Reapply
        </button>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-5 text-sm">
        ⏳ Pending Admin Approval (Ref: {refId})
      </div>
    );
  }

  if (status === "approved") {
    return (
      <div className="bg-green-50 border border-green-300 rounded-xl p-5 text-sm">
        ✅ Your kitchen is verified!
      </div>
    );
  }
  if (status === "info_required") {
    return (
      <div className="bg-orange-50 border border-orange-300 rounded-xl p-5 text-sm space-y-3">
        <p className="text-orange-700 font-semibold">
          ℹ Additional Information Required
        </p>

        <p className="text-gray-600 text-sm">
          {message || "Please update your details and resubmit."}
        </p>

        <button
          onClick={handleResubmit}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold"
        >
          🔁 Resubmit
        </button>
      </div>
    );
  }
  // ✅ If already applied
  if (applied) {
    return (
      <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-5 text-sm">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-yellow-800">
            ⏳ Pending Admin Approval
          </span>
          <span className="text-xs text-gray-600">Ref: {refId}</span>
        </div>

        <p className="mt-2 text-gray-700">
          Your request has been sent. Admin will review it soon.
        </p>
      </div>
    );
  }

  function handleReapply() {
    const requests =
      JSON.parse(localStorage.getItem("verification_requests")) || [];

    // remove old rejected request
    const filtered = requests.filter((r) => r.email !== user?.email);

    // create new request
    const ref = "MBV-" + Math.floor(100 + Math.random() * 900);

    const newRequest = {
      email: user.email,
      name: kitchenName,
      owner: user.name || "Home Chef",
      city: user.city || "Unknown",
      refId: ref,
      status: "pending",
    };

    filtered.push(newRequest);

    localStorage.setItem("verification_requests", JSON.stringify(filtered));

    setStatus("pending");
    setRefId(ref);

    // 🔥 notify instantly
    window.dispatchEvent(new Event("verificationUpdated"));
  }

  function handleResubmit() {
    const requests =
      JSON.parse(localStorage.getItem("verification_requests")) || [];

    const updated = requests.map((r) => {
      if (r.email === user?.email) {
        return {
          ...r,
          status: "pending",
          message: "", // clear old message
        };
      }
      return r;
    });

    localStorage.setItem("verification_requests", JSON.stringify(updated));

    setStatus("pending");

    window.dispatchEvent(new Event("verificationUpdated"));
  }
  return (
    <>
      {/* APPLY BUTTON */}
      <button
        onClick={applyForVerification}
        disabled={!docsReady}
        className={`
          w-full h-14 rounded-xl font-semibold text-white text-lg
          flex items-center justify-center gap-3
          transition
          ${
            docsReady
              ? "bg-[#F5A87A] hover:bg-[#F08C5E]"
              : "bg-[#F5A87A]/50 cursor-not-allowed"
          }
        `}
      >
        📩 Apply for Verification
      </button>

      {!docsReady && (
        <p className="text-sm text-gray-500 mt-2">
          Please complete previous steps first.
        </p>
      )}

      {/* MISSING DOCS */}
      {showMissing && (
        <Modal
          title="Requirements not met"
          onClose={() => setShowMissing(false)}
        >
          <p className="text-gray-600">
            Please complete all steps (especially banking) before applying.
          </p>

          <button className="w-full mt-5 bg-[#F5A87A] text-white py-3 rounded-xl font-semibold">
            Okay
          </button>
        </Modal>
      )}
    </>
  );
}

/////////////////////////
// MODAL
/////////////////////////

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl">
        <h2 className="font-bold text-xl mb-4">{title}</h2>
        {children}

        <button
          onClick={onClose}
          className="mt-6 text-sm text-gray-500 underline"
        >
          Close
        </button>
      </div>
    </div>
  );
}
