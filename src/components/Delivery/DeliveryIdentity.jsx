import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUser } from "../../utils/getUser";

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

  async function handleSubmit() {
    if (!form.name || !form.phone || !form.address) {
      setError("Please fill all required fields");
      return;
    }

    try {
      const user = getUser();

      await axios.post(
        "http://localhost:8080/api/delivery-partner/identity",
        null,
        {
         params: {
  userId: user.id,
  fullName: form.name,
  phone: form.phone,
  dob: form.dob,
  address: form.address
},
        }
      );

      navigate("/delivery/verification");
    } catch (err) {
      console.error(err);
      setError("Failed to save identity");
    }
  }

  return (
    <div className="min-h-screen bg-[#F6F2EF]">
      <main className="max-w-6xl mx-auto px-8 py-10 grid lg:grid-cols-[2fr_1fr] gap-10">
        <div>
          <p className="text-xs text-orange-500 font-semibold tracking-wider">
            STEP 1 OF 3: IDENTITY
          </p>

          <h1 className="text-3xl font-bold mt-2">Identity Verification</h1>

          <div className="bg-white rounded-2xl shadow-sm p-8 mt-8 space-y-6">
            <Input label="Full Name" name="name" value={form.name} onChange={handleChange} />
            <Input label="Phone Number" name="phone" value={form.phone} onChange={handleChange} />
            <Input label="Date of Birth" name="dob" type="date" value={form.dob} onChange={handleChange} />
            <Input label="Address" name="address" value={form.address} onChange={handleChange} />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              onClick={handleSubmit}
              className="bg-orange-500 text-white px-6 py-3 rounded-xl"
            >
              Save & Continue →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

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