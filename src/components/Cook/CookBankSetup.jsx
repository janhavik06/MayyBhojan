

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CookBankSetup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    account: "",
    ifsc: "",
    consent: false,
  });

  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle");

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate() {
    if (!form.name) return "Enter account holder name";
    if (!form.account) return "Enter account number";
    if (!form.ifsc) return "Enter IFSC code";
    if (!form.consent) return "Please confirm details are correct";
    return "";
  }
  function handleSubmit() {
    const err = validate();

    if (err) {
      setError(err);
      return;
    }

    setError("");
    setStatus("pending");

    const user = JSON.parse(localStorage.getItem("maybhojan_user"));
    const stepsKey = `cook_onboarding_steps_${user?.email}`;

    const saved = JSON.parse(localStorage.getItem(stepsKey)) || {};

    localStorage.setItem(stepsKey, JSON.stringify({ ...saved, banking: true }));

    setTimeout(() => {
      setStatus("verified");

      setTimeout(() => {
        navigate("/cook/login"); // ✅ go back to onboarding page
      }, 1200);
    }, 1500);
  }
  return (
    <div className="min-h-screen bg-[#F6F2EF]">
      <main className="max-w-6xl mx-auto px-8 py-10 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
        {/* LEFT FORM */}
        <div>
          <h1 className="text-3xl font-bold">Set up bank details</h1>

          <p className="text-gray-600 mt-2">
            Add your bank account so we can send your earnings.
          </p>

          <div className="bg-white shadow-sm border rounded-2xl p-8 mt-8 space-y-6">
            <Input
              label="Account Holder Name"
              value={form.name}
              onChange={(v) => update("name", v)}
            />

            <Input
              label="Account Number"
              value={form.account}
              onChange={(v) => update("account", v)}
              numeric
            />

            <Input
              label="IFSC Code"
              value={form.ifsc}
              onChange={(v) => update("ifsc", v)}
            />

            {/* CONSENT */}
            <label className="flex gap-3 items-start text-sm">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => update("consent", e.target.checked)}
              />
              I confirm these bank details are correct.
            </label>

            {error && <p className="text-red-500">{error}</p>}

            {status === "pending" && (
              <p className="text-orange-600 font-semibold">
                Verifying bank details...
              </p>
            )}

            {status === "verified" && (
              <p className="text-green-600 font-semibold">
                ✅ Bank account verified
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={status === "pending"}
              className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold disabled:opacity-50"
            >
              Save & Continue
            </button>
          </div>
        </div>

        {/* RIGHT HELP */}
        <aside className="bg-white border shadow-sm rounded-2xl p-6 h-fit">
          <h3 className="font-semibold">Why we ask this</h3>

          <p className="text-sm text-gray-600 mt-3">
            Your earnings from customer orders will be transferred directly to
            this bank account.
          </p>

          <p className="text-sm mt-6">Payments are usually processed weekly.</p>

          <button className="mt-6 text-orange-500 font-semibold">
            Need help?
          </button>
        </aside>
      </main>
    </div>
  );
}

function Input({ label, value, onChange, numeric }) {
  return (
    <div>
      <p className="text-sm text-gray-600">{label}</p>

      <input
        type={numeric ? "number" : "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 px-4 py-3 border rounded-xl"
      />
    </div>
  );
}
