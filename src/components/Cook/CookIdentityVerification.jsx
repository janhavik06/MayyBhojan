import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CookIdentityVerification() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    aadhaar: "",
    otp: "",
    consent: false,
  });

  const [file, setFile] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function sendOtp() {
    if (!form.phone) {
      setError("Enter phone number");
      return;
    }
    setError("");
    setOtpSent(true);
  }

  function validate() {
    if (!form.name) return "Enter full name";
    if (!form.phone) return "Enter phone number";
    if (!form.email) return "Enter email";
    if (!form.aadhaar) return "Enter Aadhaar number";
    if (!file) return "Upload ID proof";
    if (!form.consent) return "Accept consent";
    if (!otpSent || form.otp !== "1234") return "Verify OTP first";
    return "";
  }

  function handleSubmit() {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    const saved =
      JSON.parse(localStorage.getItem("cook_onboarding_steps")) || {};

    localStorage.setItem(
      "cook_onboarding_steps",
      JSON.stringify({ ...saved, identity: true }),
    );

    navigate("/cook");
  }

  return (
    <div className="min-h-screen bg-[#F6F2EF]">
      <main className="max-w-6xl mx-auto px-8 py-10 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
        {/* LEFT FORM */}
        <div>
          <h1 className="text-3xl font-bold">Identity Verification</h1>

          <p className="text-gray-600 mt-2">
            Verify your identity to start selling on MayBhojan.
          </p>

          <div className="bg-white shadow-sm border rounded-2xl p-8 mt-8 space-y-6">
            <Input
              label="Full Name"
              value={form.name}
              onChange={(v) => update("name", v)}
            />

            <Input
              label="Phone Number"
              value={form.phone}
              onChange={(v) => update("phone", v)}
              numeric
            />

            {!otpSent ? (
              <button
                onClick={sendOtp}
                className="bg-orange-500 text-white px-5 py-2 rounded-xl"
              >
                Send OTP
              </button>
            ) : (
              <Input
                label="Enter OTP"
                value={form.otp}
                onChange={(v) => update("otp", v)}
              />
            )}

            <Input
              label="Email Address"
              value={form.email}
              onChange={(v) => update("email", v)}
            />

            <Input
              label="Aadhaar Number"
              value={form.aadhaar}
              onChange={(v) => update("aadhaar", v)}
              numeric
            />

            {/* Upload */}
            <div>
              <p className="font-semibold">Upload ID Proof</p>

              <label className="block mt-3 cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                />

                <div className="border-2 border-dashed rounded-xl p-6 text-center bg-orange-50">
                  {file ? (
                    <p className="text-green-600">{file.name}</p>
                  ) : (
                    <p className="text-gray-600">Click to upload ID</p>
                  )}
                </div>
              </label>
            </div>

            {/* Consent */}
            <label className="flex gap-3 text-sm">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => update("consent", e.target.checked)}
              />
              I confirm my details are correct.
            </label>

            {error && <p className="text-red-500">{error}</p>}

            <button
              onClick={handleSubmit}
              className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold"
            >
              Verify & Continue
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <aside className="bg-white border shadow-sm rounded-2xl p-6 h-fit">
          <h3 className="font-semibold">Why verification?</h3>

          <p className="text-sm text-gray-600 mt-3">
            This helps us build trust and ensure safety for customers.
          </p>

          <p className="text-sm mt-6">
            Your data is securely stored and protected.
          </p>

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
