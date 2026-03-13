import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CookPayoutSetup() {
  const navigate = useNavigate();

  const [upi, setUpi] = useState("");

  function submit() {
    if (!upi) return;

    localStorage.setItem("cook_payout_setup", JSON.stringify({ upi }));

    const saved =
      JSON.parse(localStorage.getItem("cook_onboarding_steps")) || {};

    localStorage.setItem(
      "cook_onboarding_steps",
      JSON.stringify({ ...saved, payout: true }),
    );

    localStorage.setItem("cook_onboarded", "true");

    navigate("/cook/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#F6F2EF] flex justify-center items-center">
      <div className="bg-white p-10 rounded-xl shadow-sm w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6">Payout Setup</h1>

        <p className="text-sm text-gray-600">Add UPI ID to receive payments</p>

        <input
          placeholder="example@upi"
          onChange={(e) => setUpi(e.target.value)}
          className="w-full mt-4 border px-4 py-3 rounded-xl"
        />

        <button
          onClick={submit}
          className="mt-6 w-full bg-orange-500 text-white py-3 rounded-xl"
        >
          Finish Setup
        </button>
      </div>
    </div>
  );
}
