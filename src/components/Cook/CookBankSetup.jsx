// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function CookBankSetup() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     account: "",
//     confirm: "",
//     ifsc: "",
//     bank: "",
//     branch: "",
//     consent: false,
//   });

//   const [file, setFile] = useState(null);
//   const [status, setStatus] = useState("idle");
//   const [error, setError] = useState("");

//   function update(field, value) {
//     setForm(prev => ({ ...prev, [field]: value }));
//   }

//   function validate() {
//     if (!form.name) return "Enter account holder name";
//     if (!form.account) return "Enter account number";
//     if (form.account !== form.confirm) return "Account numbers don’t match";
//     if (!form.ifsc) return "Enter IFSC / routing code";
//     if (!file) return "Upload proof document";
//     if (!form.consent) return "You must confirm details are correct";
//     return "";
//   }

//   function handleSubmit() {
//     const err = validate();
//     if (err) {
//       setError(err);
//       return;
//     }

//     setError("");
//     setStatus("pending");

//     // mark onboarding complete
//     const saved =
//       JSON.parse(localStorage.getItem("cook_onboarding_steps")) || {};

//     localStorage.setItem(
//       "cook_onboarding_steps",
//       JSON.stringify({ ...saved, banking: true })
//     );

//     // simulate verification
//     setTimeout(() => {
//       setStatus("verified");

//       setTimeout(() => {
//         navigate("/cookdashboard"); // change route if needed
//       }, 1500);

//     }, 2000);
//   }

//   return (
//     <div className="min-h-screen bg-[#F6F2EF]">
//       <main className="max-w-6xl mx-auto px-8 py-10 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">

//         {/* LEFT FORM */}
//         <div>

//           <h1 className="text-3xl font-bold">
//             Set up bank details
//           </h1>

//           <p className="text-gray-600 mt-2">
//             So we can pay you for meals you sell. We keep your data safe.
//           </p>

//           <div className="bg-white shadow-sm border rounded-2xl p-8 mt-8 space-y-6">

//             <Input
//               label="Account holder name"
//               value={form.name}
//               onChange={v => update("name", v)}
//               placeholder="As on your bank account"
//             />

//             <Input
//               label="Account number"
//               value={form.account}
//               onChange={v => update("account", v)}
//               placeholder="Enter account number"
//               numeric
//             />

//             <Input
//               label="Confirm account number"
//               value={form.confirm}
//               onChange={v => update("confirm", v)}
//               placeholder="Re-enter account number"
//               numeric
//             />

//             <Input
//               label="IFSC / Routing code"
//               value={form.ifsc}
//               onChange={v => update("ifsc", v)}
//               placeholder="Find on cheque or bank site"
//             />

//             <Input
//               label="Bank name"
//               value={form.bank}
//               onChange={v => update("bank", v)}
//             />

//             <Input
//               label="Branch (optional)"
//               value={form.branch}
//               onChange={v => update("branch", v)}
//             />

//             {/* upload */}
//             <div>
//               <p className="font-semibold">
//                 Upload cancelled cheque / passbook
//               </p>

//               <label className="block mt-3 cursor-pointer">
//                 <input
//                   type="file"
//                   className="hidden"
//                   onChange={e => setFile(e.target.files[0])}
//                 />

//                 <div className="border-2 border-dashed rounded-xl p-6 text-center bg-orange-50">
//                   {file
//                     ? <p className="text-green-600">{file.name}</p>
//                     : <p className="text-gray-600">Click to upload proof</p>}
//                 </div>
//               </label>
//             </div>

//             {/* consent */}
//             <label className="flex gap-3 items-start text-sm">
//               <input
//                 type="checkbox"
//                 checked={form.consent}
//                 onChange={e => update("consent", e.target.checked)}
//               />
//               I confirm these details are correct and allow MayBhojan to deposit payments.
//             </label>

//             {error && <p className="text-red-500">{error}</p>}

//             {status === "pending" && (
//               <p className="text-orange-600 font-semibold">
//                 Verification pending…
//               </p>
//             )}

//             {status === "verified" && (
//               <p className="text-green-600 font-semibold">
//                 ✅ Bank verified — payouts enabled
//               </p>
//             )}

//             <button
//               onClick={handleSubmit}
//               disabled={status === "pending"}
//               className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold disabled:opacity-50"
//             >
//               Save & verify
//             </button>

//           </div>
//         </div>

//         {/* RIGHT HELP */}
//         <aside className="bg-white border shadow-sm rounded-2xl p-6 h-fit">
//           <h3 className="font-semibold">Why we ask this</h3>

//           <p className="text-sm text-gray-600 mt-3">
//             Your earnings will be safely deposited into this account.
//           </p>

//           <p className="text-sm mt-6">
//             Approval usually takes 24–48 hours.
//           </p>

//           <button className="mt-6 text-orange-500 font-semibold">
//             Set up with help
//           </button>
//         </aside>

//       </main>
//     </div>
//   );
// }

// function Input({ label, value, onChange, placeholder, numeric }) {
//   return (
//     <div>
//       <p className="text-sm text-gray-600">{label}</p>
//       <input
//         type={numeric ? "number" : "text"}
//         value={value}
//         onChange={e => onChange(e.target.value)}
//         placeholder={placeholder}
//         className="w-full mt-1 px-4 py-3 border rounded-xl"
//       />
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CookBankSetup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    account: "",
    ifsc: "",
    consent: false,
  });

  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle");

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate() {
    if (!form.name) return "Enter account holder name";
    if (!form.account) return "Enter account number";
    if (!form.ifsc) return "Enter IFSC code";
    if (!form.consent) return "Please confirm details are correct";
    return "";
  }
  function handleSubmit() {
    const err = validate();

    if (err) {
      setError(err);
      return;
    }

    setError("");
    setStatus("pending");

    const user = JSON.parse(localStorage.getItem("maybhojan_user"));
    const stepsKey = `cook_onboarding_steps_${user?.email}`;

    const saved = JSON.parse(localStorage.getItem(stepsKey)) || {};

    localStorage.setItem(stepsKey, JSON.stringify({ ...saved, banking: true }));

    setTimeout(() => {
      setStatus("verified");

      setTimeout(() => {
        navigate("/cook/login"); // ✅ go back to onboarding page
      }, 1200);
    }, 1500);
  }
  return (
    <div className="min-h-screen bg-[#F6F2EF]">
      <main className="max-w-6xl mx-auto px-8 py-10 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
        {/* LEFT FORM */}
        <div>
          <h1 className="text-3xl font-bold">Set up bank details</h1>

          <p className="text-gray-600 mt-2">
            Add your bank account so we can send your earnings.
          </p>

          <div className="bg-white shadow-sm border rounded-2xl p-8 mt-8 space-y-6">
            <Input
              label="Account Holder Name"
              value={form.name}
              onChange={(v) => update("name", v)}
            />

            <Input
              label="Account Number"
              value={form.account}
              onChange={(v) => update("account", v)}
              numeric
            />

            <Input
              label="IFSC Code"
              value={form.ifsc}
              onChange={(v) => update("ifsc", v)}
            />

            {/* CONSENT */}
            <label className="flex gap-3 items-start text-sm">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => update("consent", e.target.checked)}
              />
              I confirm these bank details are correct.
            </label>

            {error && <p className="text-red-500">{error}</p>}

            {status === "pending" && (
              <p className="text-orange-600 font-semibold">
                Verifying bank details...
              </p>
            )}

            {status === "verified" && (
              <p className="text-green-600 font-semibold">
                ✅ Bank account verified
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={status === "pending"}
              className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold disabled:opacity-50"
            >
              Save & Continue
            </button>
          </div>
        </div>

        {/* RIGHT HELP */}
        <aside className="bg-white border shadow-sm rounded-2xl p-6 h-fit">
          <h3 className="font-semibold">Why we ask this</h3>

          <p className="text-sm text-gray-600 mt-3">
            Your earnings from customer orders will be transferred directly to
            this bank account.
          </p>

          <p className="text-sm mt-6">Payments are usually processed weekly.</p>

          <button className="mt-6 text-orange-500 font-semibold">
            Need help?
          </button>
        </aside>
      </main>
    </div>
  );
}

function Input({ label, value, onChange, numeric }) {
  return (
    <div>
      <p className="text-sm text-gray-600">{label}</p>

      <input
        type={numeric ? "number" : "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 px-4 py-3 border rounded-xl"
      />
    </div>
  );
}
