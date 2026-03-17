import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CookKitchenSetup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    cuisine: "",
    vegOnly: false,
    meals: "",
  });

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function submit() {
    localStorage.setItem("cook_kitchen_setup", JSON.stringify(form));

    const saved =
      JSON.parse(localStorage.getItem("cook_onboarding_steps")) || {};

    localStorage.setItem(
      "cook_onboarding_steps",
      JSON.stringify({ ...saved, kitchen: true }),
    );

    navigate("/cook/login");
  }

  return (
    <div className="min-h-screen bg-[#F6F2EF] flex justify-center items-center">
      <div className="bg-white p-10 rounded-xl shadow-sm w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6">Kitchen Setup</h1>

        <Input label="Cuisine Type" onChange={(v) => update("cuisine", v)} />

        <Input label="Meals per day" onChange={(v) => update("meals", v)} />

        <label className="flex gap-2 mt-4">
          <input
            type="checkbox"
            onChange={(e) => update("vegOnly", e.target.checked)}
          />
          Veg Only Kitchen
        </label>

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
