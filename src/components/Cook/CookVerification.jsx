import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function CookVerification() {
  const navigate = useNavigate();

  const [files, setFiles] = useState({
    id: null,
    fssai: null,
    kitchen: null,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleUpload(type, file) {
    setFiles((prev) => ({ ...prev, [type]: file }));
  }

  // ✅ mark onboarding step complete
  

  //  submit handler
  async function handleSubmit() {

  if (!files.id || !files.fssai || !files.kitchen) {
    setError("Please upload all required documents.");
    return;
  }

  try {

    const user = JSON.parse(localStorage.getItem("user"));

    const formData = new FormData();
    formData.append("userId", user.id);
    formData.append("govtId", files.id);
    formData.append("fssai", files.fssai);
    formData.append("kitchenPhoto", files.kitchen);

    const response = await fetch(
      "http://localhost:8080/api/homemaker/documents",
      {
        method: "POST",
        body: formData
      }
    );

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    console.log("✅ Documents uploaded successfully");



    const result = await response.text();

console.log(result);

if(result.includes("already")){
    setError("Documents already submitted");
}else{
    setSuccess(true);
}

    setTimeout(() => {
      navigate("/cook/login");
    }, 1500);

  } catch (error) {
    console.error(error);
    setError("Upload failed");
  }
}
  return (
    <div className="min-h-screen bg-[#F6F2EF]">
      <main className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
        {/* LEFT SIDE */}
        <div>
          <p className="text-xs text-orange-500 font-semibold tracking-wider">
            STEP 2 OF 4: VERIFICATION
          </p>

          <h1 className="text-3xl font-bold mt-2">
            Kitchen Verification & Security
          </h1>

          <p className="text-gray-600 mt-2">
            We take safety seriously. Please upload clear documents to help us
            verify your kitchen.
          </p>

          {/* progress */}
          <div className="mt-6 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full w-2/3 bg-orange-500"></div>
          </div>

          {/* uploads */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <UploadBox
              title="Government ID Proof"
              required
              file={files.id}
              onUpload={(f) => handleUpload("id", f)}
            />

            <UploadBox
              title="FSSAI Certificate"
              required
              file={files.fssai}
              onUpload={(f) => handleUpload("fssai", f)}
            />
          </div>

          <div className="mt-6">
            <UploadBox
              title="Kitchen Photos"
              required
              file={files.kitchen}
              onUpload={(f) => handleUpload("kitchen", f)}
            />
          </div>

          {/* error */}
          {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}

          {/* success */}
          {success && (
            <p className="text-green-600 mt-4 font-semibold">
              ✅ Documents submitted successfully!
            </p>
          )}

          {/* buttons */}
          <div className="flex justify-between mt-8">
            <button className="text-gray-600">Save as Draft</button>

            <button
              onClick={handleSubmit}
              className="bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:opacity-95"
            >
              Submit for Review →
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <aside className="bg-white border shadow-sm rounded-2xl p-6 h-fit">
          <h3 className="font-semibold">Quick Help</h3>

          <p className="text-sm text-gray-600 mt-3">
            Verification helps us maintain safety standards and build customer
            trust in your kitchen.
          </p>

          <div className="mt-6 text-sm">
            <p className="font-semibold">Timeline</p>
            <p className="text-gray-600 mt-1">
              Approval usually takes <b>24–48 hours</b>
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mt-6 text-sm">
            “A clear photo of your kitchen makes customers trust you more.”
          </div>

          <button className="mt-6 text-orange-500 font-semibold">
            Chat with Support
          </button>
        </aside>
      </main>
    </div>
  );
}

////////////////////////////
// Upload component
////////////////////////////

function UploadBox({ title, required, file, onUpload }) {
  return (
    <div className="border-2 border-dashed border-orange-200 rounded-2xl p-8 text-center bg-white">
      <p className="font-medium">
        {title}
        {required && <span className="text-red-500 ml-1">*</span>}
      </p>

      <label className="block mt-4 cursor-pointer">
        <input
          type="file"
          className="hidden"
          onChange={(e) => onUpload(e.target.files[0])}
        />

        <div className="bg-orange-50 border border-orange-200 px-6 py-4 rounded-xl">
          {file ? (
            <p className="text-green-600">{file.name}</p>
          ) : (
            <p className="text-gray-600">Click to upload or drag & drop</p>
          )}
        </div>
      </label>

      <p className="text-xs text-gray-400 mt-2">PDF / JPG / PNG (Max 5MB)</p>
    </div>
  );
}
