import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StartAuditCTA from "./StartAuditCTA";

export default function CookALogin() {
  const [steps, setSteps] = useState(() => {
    const saved = localStorage.getItem("cook_onboarding_steps");
    return saved
      ? JSON.parse(saved)
      : {
          identity: false, // ✅ FIXED (was true before)
          documents: false,
          audit: false,
          banking: false,
        };
  });

  useEffect(() => {
    // ✅ detect new signup (you can customize condition)
    const isNewUser = localStorage.getItem("new_signup");

    if (isNewUser === "true") {
      localStorage.removeItem("cook_onboarding_steps");
      localStorage.removeItem("audit_requests");
      localStorage.removeItem("my_audit_id");

      // reset flag
      localStorage.setItem("new_signup", "false");

      // reset steps state
      setSteps({
        identity: false,
        documents: false,
        audit: false,
        banking: false,
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cook_onboarding_steps", JSON.stringify(steps));
  }, [steps]);

  const navigate = useNavigate();

  // ✅ STEP ORDER (NEW)
  const stepOrder = ["identity", "documents", "banking", "audit"];
  // ✅ CURRENT STEP INDEX (NEW)
  const currentStepIndex = stepOrder.findIndex((step) => !steps[step]);

  // ✅ COMPLETED COUNT (FIXED)
  const completed = currentStepIndex === -1 ? 4 : currentStepIndex;

  function completeStep(key) {
    setSteps((prev) => {
      const updated = { ...prev, [key]: true };
      localStorage.setItem("cook_onboarding_steps", JSON.stringify(updated));
      return updated;
    });
  }

  return (
    <div className="min-h-screen bg-[#F6F2EF] py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* HERO */}
        <header className="text-center mb-10">
          <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs">
            👩‍🍳 Welcome, Home Chef!
          </span>

          <h1 className="text-4xl font-bold mt-4">
            Start Your Journey to
            <span className="text-orange-500"> Financial Independence</span>
          </h1>

          <p className="text-gray-600 mt-3">
            Complete these steps to open your kitchen to thousands of hungry
            neighbors.
          </p>
        </header>

        {/* PROGRESS */}
        <ProgressBar completed={completed} />

        {/* CHECKLIST */}
        <section className="mt-8">
          <div className="flex justify-between text-sm text-gray-600 mb-3">
            <h2 className="font-semibold">Registration Checklist</h2>
            <span>{completed} of 4 Completed</span>
          </div>

          {/* ✅ STEP 1 */}
          <ChecklistCard
            title="Identity Verification"
            desc="Confirm your account details securely."
            done={steps.identity}
            active={currentStepIndex === 0}
            button="Start"
            onClick={() => currentStepIndex === 0 && navigate("/cook/identity")}
          />

          {/* ✅ STEP 2 */}
          <ChecklistCard
            title="Document Upload"
            desc="Upload Aadhaar / Voter ID"
            done={steps.documents}
            active={currentStepIndex === 1}
            button="Upload Documents"
            onClick={() =>
              currentStepIndex === 1 && navigate("/cook/verification")
            }
          />

          {/* ✅ STEP 3 → BANKING */}
          <ChecklistCard
            title="Banking & Payouts"
            desc="Add bank details for payments"
            done={steps.banking}
            active={currentStepIndex === 2}
            button="Setup Bank"
            onClick={() => currentStepIndex === 2 && navigate("/cook/bank")}
          />

          {/* ✅ STEP 4 → AUDIT */}
          <div className="mt-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-200">
              <h3 className="font-semibold">Hygiene & Safety Audit</h3>

              <p className="text-gray-500 text-sm mt-1 mb-4">
                Kitchen self-tour to maintain quality
              </p>

              <StartAuditCTA
                kitchenName="Your Kitchen"
                docsReady={steps.documents && steps.banking} // ✅ BOTH REQUIRED
                onSubmit={() => completeStep("audit")}
                disabled={currentStepIndex !== 3} // ✅ NOW STEP 4
              />
            </div>
          </div>
        </section>

        {/* HELP SECTION */}
        <HelpSection />

        {/* TESTIMONIAL */}
        <Testimonial />
      </div>
    </div>
  );
}

function ProgressBar({ completed }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
      <h3 className="text-center text-sm font-semibold mb-4">
        ONBOARDING PROGRESS
      </h3>

      <div className="flex justify-between items-center text-xs">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`w-8 h-8 flex items-center justify-center rounded-full
                ${
                  step <= completed
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}

function ChecklistCard({ title, desc, done, active, button, onClick }) {
  return (
    <div
      className={`bg-white rounded-xl p-6 shadow-sm mt-4 border
        ${active ? "border-orange-300" : "border-gray-200"}
      `}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-gray-500 text-sm mt-1">{desc}</p>
        </div>

        {done ? (
          <span className="text-green-600 text-sm">✔ Done</span>
        ) : (
          <button
            onClick={onClick}
            disabled={!active} // ✅ PREVENT SKIP
            className="bg-orange-500 text-white px-5 py-2 rounded-full text-sm disabled:opacity-50"
          >
            {button}
          </button>
        )}
      </div>
    </div>
  );
}

function HelpSection() {
  return (
    <section className="mt-12">
      <h3 className="font-semibold mb-4">Need a Helping Hand?</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {["Community", "Video Guide", "Support Chat"].map((label) => (
          <div
            key={label}
            className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition"
          >
            <div className="text-2xl mb-2">💬</div>
            <h4 className="font-semibold">{label}</h4>
            <button className="text-orange-500 text-sm mt-2 underline">
              Learn More
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="mt-12 bg-[#F2DED3] rounded-xl p-8 text-center">
      <h3 className="font-semibold">You're in great company!</h3>

      <p className="text-gray-700 mt-3 italic">
        “Joining MayBhojan changed my family’s life.”
      </p>

      <p className="text-sm mt-2">— Sunita Sharma, Top Partner since 2023</p>
    </section>
  );
}
