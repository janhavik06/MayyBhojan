import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CookBasicDetails() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
  });

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function submit() {
    if (!form.name || !form.phone || !form.city) return;

    localStorage.setItem("cook_basic_details", JSON.stringify(form));

    const saved =
      JSON.parse(localStorage.getItem("cook_onboarding_steps")) || {};

    localStorage.setItem(
      "cook_onboarding_steps",
      JSON.stringify({ ...saved, basic: true }),
    );

    navigate("/cook/login");
  }

  return (
    <div className="min-h-screen bg-[#F6F2EF] flex justify-center items-center">
      <div className="bg-white p-10 rounded-xl shadow-sm w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6">Basic Details</h1>

        <Input label="Full Name" onChange={(v) => update("name", v)} />

        <Input label="Phone Number" onChange={(v) => update("phone", v)} />

        <Input label="City" onChange={(v) => update("city", v)} />

        <button
          onClick={submit}
          className="mt-6 w-full bg-orange-500 text-white py-3 rounded-xl"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
}

function Input({ label, onChange }) {
  return (
    <div className="mt-4">
      <p className="text-sm">{label}</p>

      <input
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 border px-4 py-3 rounded-xl"
      />
    </div>
  );
}
