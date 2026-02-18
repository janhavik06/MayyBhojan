import { useState } from "react";

export default function StartAuditCTA({
  kitchenName = "Your Kitchen",
  docsReady = false,
  onSubmit,
}) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState(null);
  const [showMissing, setShowMissing] = useState(false);

  const startVerification = async () => {
    if (!docsReady) {
      setShowMissing(true);
      return;
    }

    setSubmitting(true);

    // simulate backend call
    setTimeout(() => {
      const ref = "MBV-" + Math.floor(100 + Math.random() * 900);
      setRefId(ref);
      setSubmitted(true);
      setSubmitting(false);
      setOpenConfirm(false);

      if (onSubmit) onSubmit(ref);
    }, 1200);
  };

  // ---------- SUBMITTED STATE ----------
  if (submitted) {
    return (
      <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-5 text-sm">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-yellow-800">
            Under review
          </span>
          <span className="text-xs text-gray-600">
            Ref: {refId}
          </span>
        </div>

        <p className="mt-2 text-gray-700">
          Submitted just now • Expected review within 48 hours
        </p>
      </div>
    );
  }

  return (
    <>
      {/* CTA */}
      <button
        aria-label={`Start verification for ${kitchenName}`}
        onClick={() => setOpenConfirm(true)}
        disabled={!docsReady}
        className={`
          w-full h-14 rounded-xl font-semibold text-white text-lg
          shadow-[0_8px_20px_rgba(224,122,110,0.06)]
          flex items-center justify-center gap-3
          transition
          ${
            docsReady
              ? "bg-[#F5A87A] hover:bg-[#F08C5E]"
              : "bg-[#F5A87A]/50 cursor-not-allowed"
          }
        `}
      >
        🛡 Start verification
      </button>

      {!docsReady && (
        <p className="text-sm text-gray-500 mt-2">
          Please upload required documents to continue.
        </p>
      )}

      {/* CONFIRM MODAL */}
      {openConfirm && (
        <Modal
          title={`Start verification for ${kitchenName}?`}
          onClose={() => setOpenConfirm(false)}
        >
          <p className="text-gray-600">
            This will submit your documents to our review team.
            They may ask for clearer photos or a short call.
            You’ll receive an update within 48 hours.
          </p>

          <div className="flex gap-3 mt-6">
            <button
              onClick={startVerification}
              disabled={submitting}
              className="flex-1 bg-[#F5A87A] text-white py-3 rounded-xl font-semibold"
            >
              {submitting ? "Submitting…" : "Yes, start verification"}
            </button>

            <button
              onClick={() => setOpenConfirm(false)}
              className="flex-1 border py-3 rounded-xl"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}

      {/* MISSING DOCS */}
      {showMissing && (
        <Modal title="Documents missing" onClose={() => setShowMissing(false)}>
          <p className="text-gray-600">
            Please upload ID proof and kitchen photos before starting verification.
          </p>

          <button className="w-full mt-5 bg-[#F5A87A] text-white py-3 rounded-xl font-semibold">
            Upload now
          </button>
        </Modal>
      )}
    </>
  );
}

/////////////////////////
// GENERIC MODAL
/////////////////////////

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        role="dialog"
        aria-modal="true"
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl"
      >
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
