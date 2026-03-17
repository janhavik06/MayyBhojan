import { useState, useEffect } from "react";

export default function StartAuditCTA({ docsReady = false }) {

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMissing, setShowMissing] = useState(false);

  // Check current account status on load
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
    if (user.accountStatus === "UNDER_REVIEW") setStatus("pending");
    if (user.accountStatus === "ACTIVE") setStatus("approved");
    if (user.accountStatus === "REJECTED") setStatus("rejected");
  }, []);

  const applyForVerification = async () => {

    if (!docsReady) {
      setShowMissing(true);
      return;
    }

    try {

      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        console.error("User not logged in");
        return;
      }

      const params = new URLSearchParams();
      params.append("userId", user.id);

      const res = await fetch(
        "http://localhost:8080/api/homemaker/submit",
        {
          method: "POST",
          body: params
        }
      );

      const msg = await res.text();
      console.log(msg);

      // Update localStorage so status persists on refresh
      user.accountStatus = "UNDER_REVIEW";
      localStorage.setItem("user", JSON.stringify(user));

      setStatus("pending");

    } catch (error) {
      console.error("Submit failed", error);
    } finally {
      setLoading(false);
    }

  };

  /* ---------- STATUS UI ---------- */

  if (status === "pending") {
    return (
      <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-5 text-sm">
        ⏳ Pending Admin Approval
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

  if (status === "rejected") {
    return (
      <div className="bg-red-50 border border-red-300 rounded-xl p-5 text-sm">
        ❌ Your verification was rejected. Please update your details.
      </div>
    );
  }

  /* ---------- MAIN BUTTON ---------- */

  return (
    <>
      <button
        onClick={applyForVerification}
        disabled={!docsReady || loading}
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
        {loading ? "Submitting..." : "📩 Apply for Verification"}
      </button>

      {!docsReady && (
        <p className="text-sm text-gray-500 mt-2">
          Please complete previous steps first.
        </p>
      )}

      {/* ---------- MODAL ---------- */}

      {showMissing && (
        <Modal
          title="Requirements not met"
          onClose={() => setShowMissing(false)}
        >
          <p className="text-gray-600">
            Please complete all steps (especially banking) before applying.
          </p>

          <button
            onClick={() => setShowMissing(false)}
            className="w-full mt-5 bg-[#F5A87A] text-white py-3 rounded-xl font-semibold"
          >
            Okay
          </button>

        </Modal>
      )}

    </>
  );
}

/* ---------- MODAL COMPONENT ---------- */

function Modal({ title, children, onClose }) {

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl">

        <h2 className="font-bold text-xl mb-4">
          {title}
        </h2>

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