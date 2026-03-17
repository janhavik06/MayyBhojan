import { useState, useEffect } from "react";
import { saveAddress, getUserAddresses } from "../../../api/addressApi";
import { getUser } from "../../../utils/getUser";


export default function Settings() {


const user = getUser();
const userId = user?.id;
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: ""
  });

  useEffect(() => {

    if(user){
      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || ""
      });
    }

  }, [user]);

  const [addresses, setAddresses] = useState([]);

  const [showAddressModal, setShowAddressModal] = useState(false);

  const [newAddress, setNewAddress] = useState({
  userId: userId,
  fullName: "",
  phone: "",
  house: "",
  area: "",
  landmark: "",
  pincode: "",
  type: "HOME"
});

  useEffect(() => {
    loadAddresses();
  }, []);

  async function loadAddresses() {
    try {
      const res = await getUserAddresses(userId);
      setAddresses(res.data);
    } catch (err) {
      console.error("Address fetch error", err);
    }
  }

  async function handleSaveAddress() {

    try {

      await saveAddress(newAddress);

      setShowAddressModal(false);

      setNewAddress({
        userId: 1,
        fullName: "",
        phone: "",
        house: "",
        area: "",
        landmark: "",
        pincode: "",
        type: "HOME"
      });

      loadAddresses();

    } catch (err) {
      console.error("Address save error", err);
    }

  }

  const payments = [
    { id: 1, type: "UPI", label: "rajesh.kumar@okhdfcbank" },
    { id: 2, type: "Card", label: "•••• •••• •••• 4242" },
  ];

  const saveProfile = () => {
    alert("Profile saved!");
  };

 const logout = () => {

  localStorage.removeItem("user");

  window.location.href = "/login";

};
  return (
    <div className="min-h-screen bg-[#F6F2EF] p-6 md:p-10">

      <div className="max-w-6xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="flex justify-between items-center">

          <div>
            <h1 className="text-3xl font-bold">
              Your Profile & Settings
            </h1>

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


        {/* SAVED ADDRESSES */}
        <Card title="Saved Addresses">

          <div className="grid md:grid-cols-2 gap-6">

            {addresses.map((a) => (

              <div
                key={a.id}
                className="bg-white shadow-sm rounded-xl p-5 border"
              >

                <p className="font-semibold">
                  {a.fullName}
                </p>

                <p className="text-gray-600 text-sm mt-2">
                  {a.house}, {a.area}
                </p>

                <p className="text-gray-500 text-sm">
                  {a.landmark} - {a.pincode}
                </p>

                <p className="text-gray-500 text-sm">
                  {a.phone}
                </p>

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

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                    {p.type === "UPI" ? "📱" : "💳"}
                  </div>

                  <div>
                    <p className="font-medium text-gray-800">
                      {p.type}
                    </p>

                    <p className="text-sm text-gray-500">
                      {p.label}
                    </p>
                  </div>

                </div>

                <button className="text-sm text-red-500 hover:text-red-600">
                  Remove
                </button>

              </div>

            ))}

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


      {/* ADDRESS MODAL */}
      {showAddressModal && (

        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[200] px-4">

          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative">

            <button
              onClick={() => setShowAddressModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4">
              Add New Address
            </h2>

            <div className="space-y-3">

              <Input
                label="Full Name"
                value={newAddress.fullName}
                onChange={(v) =>
                  setNewAddress({ ...newAddress, fullName: v })
                }
              />

              <Input
                label="Phone Number"
                value={newAddress.phone}
                onChange={(v) =>
                  setNewAddress({ ...newAddress, phone: v })
                }
              />

              <Input
                label="House / Flat"
                value={newAddress.house}
                onChange={(v) =>
                  setNewAddress({ ...newAddress, house: v })
                }
              />

              <Input
                label="Area"
                value={newAddress.area}
                onChange={(v) =>
                  setNewAddress({ ...newAddress, area: v })
                }
              />

              <Input
                label="Landmark"
                value={newAddress.landmark}
                onChange={(v) =>
                  setNewAddress({ ...newAddress, landmark: v })
                }
              />

              <Input
                label="Pincode"
                value={newAddress.pincode}
                onChange={(v) =>
                  setNewAddress({ ...newAddress, pincode: v })
                }
              />

            </div>

            <div className="flex justify-end gap-2 mt-6">

              <button
                onClick={() => setShowAddressModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveAddress}
                className="px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 text-sm"
              >
                Save
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}



function Card({ title, children }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div className="flex flex-col gap-1 max-w-md">

      <label className="text-sm text-gray-600">
        {label}
      </label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-gray-100 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
      />

    </div>
  );
}