import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUser } from "../../utils/getUser";

export default function DeliveryVerification() {

  const navigate = useNavigate();
  const user = getUser();

  const [files, setFiles] = useState({
    id: null,
    license: null,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleUpload(type, file) {
    setFiles((prev) => ({ ...prev, [type]: file }));
  }

  function markDocumentsComplete() {

    const stepsKey = `delivery_onboarding_steps_${user.email}`;

    const saved = JSON.parse(localStorage.getItem(stepsKey)) || {};

    const updated = {
      ...saved,
      documents: true,
    };

    localStorage.setItem(stepsKey, JSON.stringify(updated));
  }

  async function handleSubmit() {

    if (!files.id || !files.license) {
      setError("Please upload all required documents.");
      return;
    }

    try {

      const formData = new FormData();

      formData.append("userId", user.id);
      formData.append("idProof", files.id);
      formData.append("license", files.license);

      await axios.post(
        "http://localhost:8080/api/delivery-partner/documents",
        formData
      );

      markDocumentsComplete();

      setSuccess(true);

      setTimeout(() => {
        navigate("/delivery/vehicle");
      }, 1500);

    } catch (err) {

      console.error(err);
      setError("Document upload failed");

    }

  }

  return (
    <div className="min-h-screen bg-[#F6F2EF]">
      <main className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">

        <div>

          <p className="text-xs text-orange-500 font-semibold tracking-wider">
            STEP 2 OF 3: VERIFICATION
          </p>

          <h1 className="text-3xl font-bold mt-2">
            Delivery Verification & Safety
          </h1>

          <p className="text-gray-600 mt-2">
            Upload your documents to verify your identity as a delivery partner.
          </p>

          <div className="mt-6 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full w-2/3 bg-orange-500"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">

            <UploadBox
              title="Government ID Proof"
              required
              file={files.id}
              onUpload={(f) => handleUpload("id", f)}
            />

            <UploadBox
              title="Driving License"
              required
              file={files.license}
              onUpload={(f) => handleUpload("license", f)}
            />

          </div>

          {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}

          {success && (
            <p className="text-green-600 mt-4 font-semibold">
              ✅ Documents submitted successfully!
            </p>
          )}

          <div className="flex justify-between mt-8">

            <button className="text-gray-600">
              Save as Draft
            </button>

            <button
              onClick={handleSubmit}
              className="bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold"
            >
              Submit for Review →
            </button>

          </div>

        </div>

        <aside className="bg-white border shadow-sm rounded-2xl p-6 h-fit">

          <h3 className="font-semibold">Quick Help</h3>

          <p className="text-sm text-gray-600 mt-3">
            Verification ensures safe and trusted deliveries for customers.
          </p>

          <div className="mt-6 text-sm">

            <p className="font-semibold">Timeline</p>

            <p className="text-gray-600 mt-1">
              Approval usually takes <b>24–48 hours</b>
            </p>

          </div>

        </aside>

      </main>
    </div>
  );
}

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

      <p className="text-xs text-gray-400 mt-2">
        PDF / JPG / PNG (Max 5MB)
      </p>

    </div>

  );
}