import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUser } from "../../utils/getUser";
export default function VehicleSetup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    vehicleType: "",
    number: "",
  });

  const [error, setError] = useState("");

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {

  if (!form.vehicleType || !form.number) {
    setError("Please fill all fields");
    return;
  }

  try {

    const user = getUser();

    await axios.put(
      "http://localhost:8080/api/delivery-partner/vehicle",
      null,
      {
        params: {
          userId: user.id,
          vehicleType: form.vehicleType,
          vehicleNumber: form.number
        }
      }
    );

    navigate("/delivery/onboarding");

  } catch (err) {

    console.error(err);
    setError("Vehicle setup failed");

  }

}

  return (
    <div className="min-h-screen bg-[#F6F2EF]">
      <main className="max-w-6xl mx-auto px-8 py-10 grid lg:grid-cols-[2fr_1fr] gap-10">
        {/* LEFT FORM */}
        <div>
          {/* ✅ STEP LABEL */}
          <p className="text-xs text-orange-500 font-semibold tracking-wider">
            STEP 3 OF 3: VEHICLE DETAILS
          </p>

          <h1 className="text-3xl font-bold mt-2">Vehicle Information</h1>

          <p className="text-gray-600 mt-2">
            Add your vehicle details to start delivering orders.
          </p>

          {/* ✅ PROGRESS BAR */}
          <div className="mt-6 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full w-full bg-orange-500"></div>
          </div>

          {/* FORM */}
          <div className="bg-white shadow-sm border rounded-2xl p-8 mt-8 space-y-6">
            <Input
              label="Vehicle Type (Bike / Scooter)"
              value={form.vehicleType}
              onChange={(v) => update("vehicleType", v)}
            />

            <Input
              label="Vehicle Number"
              value={form.number}
              onChange={(v) => update("number", v)}
            />

            {error && <p className="text-red-500">{error}</p>}

            <button
              onClick={handleSubmit}
              className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold"
            >
              Save & Continue →
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <aside className="bg-white border shadow-sm rounded-2xl p-6 h-fit">
          <h3 className="font-semibold">Why we need this</h3>

          <p className="text-sm text-gray-600 mt-3">
            Your vehicle details help us assign suitable delivery orders and
            ensure smooth operations.
          </p>

          <div className="mt-6 text-sm">
            <p className="font-semibold">Better Matching</p>
            <p className="text-gray-600 mt-1">
              Orders are assigned based on your vehicle type.
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mt-6 text-sm">
            “Delivery partners with complete profiles get more orders.”
          </div>

          <button className="mt-6 text-orange-500 font-semibold">
            Need help?
          </button>
        </aside>
      </main>
    </div>
  );
}

//////////////////////
// Input component
//////////////////////

function Input({ label, value, onChange }) {
  return (
    <div>
      <p className="text-sm text-gray-600">{label}</p>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 px-4 py-3 border rounded-xl"
      />
    </div>
  );
}
