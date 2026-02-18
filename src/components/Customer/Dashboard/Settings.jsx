import { useState } from "react";

export default function Settings() {
  const [profile, setProfile] = useState({
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "+91 98765 43210",
  });

  const [highContrast, setHighContrast] = useState(false);
  const [textSize, setTextSize] = useState("standard");
  const [language, setLanguage] = useState("en");

  const addresses = [
    {
      id: 1,
      label: "Home",
      text: "B-402, Green Valley Apartments, Sector 12, Dwarka, Delhi - 110075",
      default: true,
    },
    {
      id: 2,
      label: "Office",
      text: "Tower C, Cyber Hub, Gurgaon, Haryana - 122002",
    },
  ];

  const payments = [
    { id: 1, type: "UPI", label: "rajesh.kumar@okhdfcbank" },
    { id: 2, type: "Card", label: "•••• •••• •••• 4242" },
  ];

  const saveProfile = () => {
    alert("Profile saved!");
  };

  const logout = () => {
    alert("Logged out!");
  };

  return (
    <div className="min-h-screen bg-[#F6F2EF] p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Your Profile & Settings</h1>
            <p className="text-gray-500 mt-1">
              Manage your personal information and preferences.
            </p>
          </div>

          <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium">
            ✓ Verified User
          </span>
        </div>

        {/* PERSONAL INFO */}
        <Card title="Personal Information">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <img
              src="https://i.pravatar.cc/120"
              className="w-28 h-28 rounded-full object-cover"
            />

            <div className="md:col-span-2 grid md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={profile.name}
                onChange={(v) =>
                  setProfile({ ...profile, name: v })
                }
              />
              <Input
                label="Email Address"
                value={profile.email}
                onChange={(v) =>
                  setProfile({ ...profile, email: v })
                }
              />
              <Input
                label="Phone Number"
                value={profile.phone}
                onChange={(v) =>
                  setProfile({ ...profile, phone: v })
                }
              />
            </div>
          </div>

          <button
            onClick={saveProfile}
            className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Save Profile Changes
          </button>
        </Card>

        {/* ACCESSIBILITY + LANGUAGE */}
        <div className="grid md:grid-cols-2 gap-6">

          <Card title="Accessibility">
            <Toggle
              label="High Contrast Mode"
              value={highContrast}
              onChange={() => setHighContrast(!highContrast)}
            />

            <div className="mt-6">
              <p className="font-medium mb-3">Text Size Preference</p>
              <div className="flex gap-4">
                <ButtonSelect
                  active={textSize === "standard"}
                  onClick={() => setTextSize("standard")}
                  label="Standard (A)"
                />
                <ButtonSelect
                  active={textSize === "large"}
                  onClick={() => setTextSize("large")}
                  label="Large (A+)"
                />
              </div>
            </div>
          </Card>

          <Card title="Language Switch">
            <LanguageOption
              label="English"
              active={language === "en"}
              onClick={() => setLanguage("en")}
            />
            <LanguageOption
              label="हिंदी (Hindi)"
              active={language === "hi"}
              onClick={() => setLanguage("hi")}
            />
          </Card>

        </div>

        {/* ADDRESSES */}
        <Card title="Saved Addresses">
          <div className="grid md:grid-cols-2 gap-6">
            {addresses.map((a) => (
              <div
                key={a.id}
                className="bg-white shadow-sm rounded-xl p-5 border"
              >
                <p className="font-semibold">{a.label}</p>
                <p className="text-gray-600 text-sm mt-2">{a.text}</p>
                {a.default && (
                  <span className="text-orange-500 text-xs">
                    Default delivery address
                  </span>
                )}
              </div>
            ))}

            <div className="border-dashed border-2 rounded-xl p-10 text-center text-gray-500">
              + Add New Address
            </div>
          </div>
        </Card>

        {/* PAYMENTS */}
        <Card title="Payment Methods">
          {payments.map((p) => (
            <div
              key={p.id}
              className="bg-white border rounded-xl p-4 mb-4 flex justify-between"
            >
              <span>{p.label}</span>
              <button className="text-red-500">Remove</button>
            </div>
          ))}

          <div className="border-dashed border-2 rounded-xl p-6 text-center">
            + Add Payment Method
          </div>
        </Card>

        {/* LOGOUT */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex justify-between items-center">
          <div>
            <p className="font-semibold text-red-600">
              Sign Out of MayBhojan
            </p>
            <p className="text-gray-600 text-sm">
              You can log back in anytime.
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Logout Now
          </button>
        </div>

      </div>
    </div>
  );
}

////////////////////////////
// REUSABLE COMPONENTS
////////////////////////////

function Card({ title, children }) {
  return (
    <div className="bg-white shadow-sm rounded-2xl p-6 border">
      <h2 className="font-semibold text-lg mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div>
      <p className="text-sm mb-1">{label}</p>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-xl px-4 py-2"
      />
    </div>
  );
}

function Toggle({ label, value, onChange }) {
  return (
    <div className="flex justify-between items-center">
      <span>{label}</span>
      <button
        onClick={onChange}
        className={`w-12 h-6 rounded-full ${
          value ? "bg-orange-500" : "bg-gray-300"
        }`}
      />
    </div>
  );
}

function ButtonSelect({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl border ${
        active
          ? "bg-orange-100 border-orange-400"
          : "bg-white"
      }`}
    >
      {label}
    </button>
  );
}

function LanguageOption({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border mb-3 ${
        active ? "bg-orange-50 border-orange-400" : ""
      }`}
    >
      {label}
    </button>
  );
}
