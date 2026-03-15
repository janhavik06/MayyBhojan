import { useState, useEffect } from "react";
import { useCart } from "../Cart/CartContext";
import { useNavigate } from "react-router-dom";
import { saveAddress, getUserAddresses } from "../../api/addressApi";
  import { getUser } from "../../utils/getUser";

export default function Address() {

  const { total } = useCart();
  const navigate = useNavigate();


const user = getUser();
const userId = user?.id;

  const [addresses, setAddresses] = useState([]);
  const [selected, setSelected] = useState(null);

 const [address, setAddress] = useState({
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
      console.error("Load address error", err);
    }
  }

  function handleChange(e) {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit() {

    try {

      const res = await saveAddress(address);

      setSelected(res.data.id);

      navigate("/payment", {
        state: { addressId: res.data.id }
      });

    } catch (err) {
      console.error("Address save error", err);
    }

  }

  function continueWithAddress() {

    if(!selected){
      alert("Select an address");
      return;
    }

    navigate("/payment", {
      state: { addressId: selected }
    });

  }

  return (
    <div className="min-h-screen bg-[#F6F2EF]">

      <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

        <div className="lg:col-span-2">

          {/* EXISTING ADDRESSES */}
          <div className="bg-white rounded-2xl border p-6 mb-6">

            <h2 className="text-xl font-bold mb-4">
              Saved Addresses
            </h2>

            {addresses.map(a => (

              <div
                key={a.id}
                onClick={() => setSelected(a.id)}
                className={`p-4 border rounded-xl cursor-pointer mb-3
                ${selected === a.id ? "border-orange-500 bg-orange-50" : ""}`}
              >

                <p className="font-semibold">{a.fullName}</p>
                <p>{a.house}, {a.area}</p>
                <p>{a.landmark}</p>
                <p>{a.pincode}</p>

              </div>

            ))}

            {addresses.length > 0 && (

              <button
                onClick={continueWithAddress}
                className="w-full mt-4 bg-orange-500 text-white py-3 rounded-xl"
              >
                Continue with Selected Address
              </button>

            )}

          </div>

          {/* ADD NEW ADDRESS */}
          <div className="bg-white rounded-2xl border p-8">

            <h1 className="text-2xl font-bold">
              Add New Address
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

              <input name="fullName" placeholder="Full Name"
              onChange={handleChange} className="border rounded-xl px-4 py-3"/>

              <input name="phone" placeholder="Mobile Number"
              onChange={handleChange} className="border rounded-xl px-4 py-3"/>

              <input name="house" placeholder="Flat / House No."
              onChange={handleChange} className="border rounded-xl px-4 py-3"/>

              <input name="area" placeholder="Area"
              onChange={handleChange} className="border rounded-xl px-4 py-3"/>

              <input name="landmark" placeholder="Landmark"
              onChange={handleChange} className="border rounded-xl px-4 py-3"/>

              <input name="pincode" placeholder="Pincode"
              onChange={handleChange} className="border rounded-xl px-4 py-3"/>

            </div>

            <button
              onClick={handleSubmit}
              className="w-full mt-8 bg-orange-500 text-white py-4 rounded-xl"
            >
              Save & Continue
            </button>

          </div>

        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-white rounded-2xl border p-6 h-fit">

          <h2 className="font-semibold text-lg mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between">
            <span>Total Pay</span>
            <span>₹{total}</span>
          </div>

        </div>

      </div>

    </div>
  );
}