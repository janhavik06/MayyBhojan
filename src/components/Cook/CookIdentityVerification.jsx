import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CookIdentityVerification() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    dob: "",
    address: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function sendOTP() {
    if (!form.phone) {
      setError("Enter phone number to continue");
      return;
    }

    setError("");
    setOtpSent(true);
  }

  function verifyOTP() {
    if (otp !== "1234") {
      setError("Invalid OTP");
      return;
    }

    // mark step complete
    const saved =
      JSON.parse(localStorage.getItem("cook_onboarding_steps")) || {};

    const updated = {
      ...saved,
      identity: true,
    };

    localStorage.setItem("cook_onboarding_steps", JSON.stringify(updated));

    navigate("/cook/verification");
  }

  return (
    <div className="min-h-screen bg-[#F6F2EF]">
      <main className="max-w-6xl mx-auto px-8 py-10 grid lg:grid-cols-[2fr_1fr] gap-10">
        {/* LEFT FORM */}
        <div>
          <p className="text-xs text-orange-500 font-semibold tracking-wider">
            STEP 1 OF 3: IDENTITY
          </p>

          <h1 className="text-3xl font-bold mt-2">Identity Verification</h1>

          <p className="text-gray-600 mt-2">
            Confirm your identity to start onboarding your kitchen.
          </p>

          {/* progress */}
          <div className="mt-6 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-orange-500"></div>
          </div>

          {/* FORM */}
          <div className="bg-white rounded-2xl shadow-sm p-8 mt-8 space-y-6">
            <Input
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            <Input
              label="Date of Birth"
              name="dob"
              type="date"
              value={form.dob}
              onChange={handleChange}
            />

            <Input
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
            />

            {/* PHONE */}
            {!otpSent && (
              <div>
                <label className="text-sm font-medium">Phone Number *</label>

                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full mt-2 px-4 py-3 border rounded-xl"
                />

                <button
                  onClick={sendOTP}
                  className="mt-3 bg-orange-500 text-white px-6 py-2 rounded-xl"
                >
                  Send OTP
                </button>
              </div>
            )}

            {/* OTP */}
            {otpSent && (
              <div>
                <label className="text-sm font-medium">Enter OTP</label>

                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="1234"
                  className="w-full mt-2 px-4 py-3 border rounded-xl text-center tracking-widest"
                />

                <button
                  onClick={verifyOTP}
                  className="mt-3 bg-orange-500 text-white px-6 py-2 rounded-xl"
                >
                  Verify & Continue →
                </button>
              </div>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </div>

        {/* RIGHT INFO PANEL */}
        <aside className="bg-white shadow-sm rounded-2xl p-6 h-fit">
          <h3 className="font-semibold">Why do we verify identity?</h3>

          <p className="text-sm text-gray-600 mt-3">
            Identity verification helps ensure that every kitchen on MayBhojan
            is trustworthy and safe for customers.
          </p>

          <div className="mt-6 text-sm">
            <p className="font-semibold">Secure & Private</p>
            <p className="text-gray-600 mt-1">
              Your data is encrypted and used only for verification.
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mt-6 text-sm">
            “Verified kitchens receive up to 2× more orders.”
          </div>

          <button className="mt-6 text-orange-500 font-semibold">
            Chat with Support
          </button>
        </aside>
      </main>
    </div>
  );
}

//////////////////////
// Input component
//////////////////////

function Input({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full mt-2 px-4 py-3 border rounded-xl"
      />
    </div>
  );
}
