import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DeliveryIdentity() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    dob: "",
    address: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    if (!form.name || !form.phone || !form.address) {
      setError("Please fill all required fields");
      return;
    }

    // save identity data
    localStorage.setItem("delivery_identity", JSON.stringify(form));

    const user = JSON.parse(localStorage.getItem("maybhojan_user"));
    const stepsKey = `delivery_onboarding_steps_${user.email}`;

    const saved = JSON.parse(localStorage.getItem(stepsKey)) || {};

    const updated = {
      ...saved,
      identity: true,
    };

    localStorage.setItem(stepsKey, JSON.stringify(updated));

    // navigate back to onboarding
    navigate("/delivery/onboarding");
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
            Tell us about yourself to start your delivery onboarding.
          </p>

          {/* progress bar */}
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
              label="Phone Number"
              name="phone"
              value={form.phone}
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

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="button"
              onClick={handleSubmit}
              className="bg-orange-500 text-white px-6 py-3 rounded-xl"
            >
              Save & Continue →
            </button>
          </div>
        </div>

        {/* RIGHT INFO PANEL */}
        <aside className="bg-white shadow-sm rounded-2xl p-6 h-fit">
          <h3 className="font-semibold">Why do we ask this?</h3>

          <p className="text-sm text-gray-600 mt-3">
            This helps us verify delivery partners and ensure safe deliveries.
          </p>

          <div className="mt-6 text-sm">
            <p className="font-semibold">Trusted Delivery Network</p>

            <p className="text-gray-600 mt-1">
              Verified delivery partners get more delivery requests.
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mt-6 text-sm">
            “Trusted delivery partners earn more and get priority orders.”
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
