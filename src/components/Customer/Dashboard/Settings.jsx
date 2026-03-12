import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Settings() {
  const navigate = useNavigate();

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
    // remove stored login data if any
    localStorage.removeItem("user");

    // redirect to login page
    navigate("/login");
  };
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
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
          <div className="flex items-start gap-10">
            {/* PROFILE ICON */}
            <div className="flex flex-col items-center w-40">
              <div className="w-30 h-30 mt-5 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-white flex items-center justify-center text-3xl font-bold shadow-md">
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>

              <p className="text-sm text-gray-500 mt-3 text-center">
                {profile.name}
              </p>
            </div>

            {/* FORM FIELDS */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-5 flex-1 max-w-3xl">
              <Input
                label="Full Name"
                value={profile.name}
                onChange={(v) => setProfile({ ...profile, name: v })}
              />

              <Input
                label="Email Address"
                value={profile.email}
                onChange={(v) => setProfile({ ...profile, email: v })}
              />

              <Input
                label="Phone Number"
                value={profile.phone}
                onChange={(v) => setProfile({ ...profile, phone: v })}
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={saveProfile}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-sm transition"
            >
              Save Profile Changes
            </button>
          </div>
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
            <div
              onClick={() => setShowAddressModal(true)}
              className="border-2 border-dashed rounded-xl p-10 text-center text-gray-500 cursor-pointer hover:bg-gray-50 transition"
            >
              + Add New Address
            </div>
          </div>
        </Card>

        {/* PAYMENTS */}
        <Card title="Payment Methods">
          <div className="space-y-4">
            {payments.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between bg-gray-50 rounded-xl px-5 py-4 hover:bg-gray-100 transition"
              >
                {/* PAYMENT INFO */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                    {p.type === "UPI" ? "📱" : "💳"}
                  </div>

                  <div>
                    <p className="font-medium text-gray-800">{p.type}</p>

                    <p className="text-sm text-gray-500">{p.label}</p>
                  </div>
                </div>

                {/* REMOVE BUTTON */}
                <button className="text-sm text-red-500 hover:text-red-600">
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* ADD PAYMENT */}
          <div
            onClick={() => setShowPaymentModal(true)}
            className="mt-5 bg-gray-50 rounded-xl p-6 text-center cursor-pointer hover:bg-gray-100 transition"
          >
            + Add Payment Method
          </div>
        </Card>

        {/* LOGOUT */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex justify-between items-center">
          <div>
            <p className="font-semibold text-red-600">Sign Out of MayBhojan</p>
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
      {showPaymentModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[200] px-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative animate-fadeIn">
            {/* CLOSE */}
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-5">Add Payment Method</h2>

            <div className="space-y-4">
              <Input label="Card Holder Name" />

              <Input label="Card Number" />

              <div className="grid grid-cols-2 gap-3">
                <Input label="Expiry Date" />
                <Input label="CVV" />
              </div>

              <Input label="UPI ID (Optional)" />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
              >
                Cancel
              </button>

              <button className="px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 text-sm">
                Save Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddressModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[200] px-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative animate-fadeIn mt-10">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setShowAddressModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4">Add New Address</h2>

            <div className="space-y-3">
              <Input label="Full Name" />
              <Input label="Phone Number" />

              <Input label="House / Flat / Building" />
              <Input label="Area / Street" />

              <div className="grid grid-cols-2 gap-3">
                <Input label="City" />
                <Input label="Postal Code" />
              </div>

              <Input label="State" />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowAddressModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
              >
                Cancel
              </button>

              <button className="px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 text-sm">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

////////////////////////////
// REUSABLE COMPONENTS
////////////////////////////
function Card({ title, children }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">{title}</h2>
      {children}
    </div>
  );
}
function Input({ label, value, onChange }) {
  return (
    <div className="flex flex-col gap-1 max-w-md">
      <label className="text-sm text-gray-600">{label}</label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-gray-100 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
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
        active ? "bg-orange-100 border-orange-400" : "bg-white"
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
