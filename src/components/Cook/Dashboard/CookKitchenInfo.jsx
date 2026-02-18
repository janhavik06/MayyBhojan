import { useState } from "react";

export default function CookKitchenInfo() {
  const [published, setPublished] = useState(false);
  const [name, setName] = useState("Savita’s Kitchen");
  const [tagline, setTagline] = useState("");
  const [story, setStory] = useState("");
  const [photos, setPhotos] = useState([]);
  const [cuisines, setCuisines] = useState(["Gujarati"]);
  const [pincode, setPincode] = useState("");
  const [hours, setHours] = useState("Mon–Fri 10am–2pm");

  function uploadPhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    setPhotos(prev => [...prev, file.name]);
  }

  function toggleCuisine(c) {
    setCuisines(prev =>
      prev.includes(c)
        ? prev.filter(x => x !== c)
        : [...prev, c]
    );
  }

  return (
    <div className=" bg-[#F6F2EF] min-h-screen p-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Kitchen Info
          </h1>
          <p className="text-gray-600 mt-2">
            Share the details customers see before ordering.
          </p>
        </div>

        <div className="flex gap-4">

          <button className="border px-6 py-3 rounded-xl">
            Preview
          </button>

          <button className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold">
            Save Draft
          </button>

        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-[2fr_1fr] gap-8">

        {/* LEFT COLUMN */}
        <div className="space-y-8">

          {/* BASIC INFO */}
          <Card title="Basic Details">

            <Input label="Kitchen name"
              value={name}
              onChange={setName}
              required
            />

            <Input label="Tag line"
              value={tagline}
              onChange={setTagline}
              placeholder="Home-cooked Gujarati thalis"
            />

            <p className="text-sm text-gray-600 mt-6 mb-2">
              Primary cuisine
            </p>

            <div className="flex gap-3 flex-wrap">
              {["Gujarati", "North Indian", "South Indian", "Bengali"].map(c => (
                <Chip
                  key={c}
                  active={cuisines.includes(c)}
                  onClick={() => toggleCuisine(c)}
                >
                  {c}
                </Chip>
              ))}
            </div>

          </Card>

          {/* ADDRESS */}
          <Card title="Location & Hours">

            <Input
              label="Pincode"
              value={pincode}
              onChange={setPincode}
              placeholder="411001"
              required
            />

            <Input
              label="Working hours"
              value={hours}
              onChange={setHours}
              placeholder="Mon–Fri 10am–2pm"
            />

          </Card>

          {/* STORY */}
          <Card title="Your Story">

            <textarea
              value={story}
              onChange={e => setStory(e.target.value)}
              placeholder="Tell customers about your kitchen..."
              className="w-full h-32 border rounded-xl p-4 mt-2"
            />

            <p className="text-xs text-gray-500 mt-2">
              {story.length}/250 characters
            </p>

          </Card>

          {/* PHOTOS */}
          <Card title="Photos & Media">

            <label className="block border-2 border-dashed rounded-xl p-6 text-center bg-orange-50 cursor-pointer">
              <input type="file" hidden onChange={uploadPhoto} />
              Upload kitchen & dish photos
            </label>

            <div className="flex gap-3 mt-4 flex-wrap">
              {photos.map((p, i) => (
                <div key={i}
                  className="bg-white border px-3 py-2 rounded-lg text-sm">
                  {p}
                </div>
              ))}
            </div>

          </Card>

          {/* HYGIENE */}
          <Card title="Hygiene Commitments">

            {[
              "Fresh ingredients daily",
              "No cross-contamination",
              "Sanitized cooking area"
            ].map(item => (
              <label key={item}
                className="flex gap-3 items-center mt-2">
                <input type="checkbox" />
                {item}
              </label>
            ))}

          </Card>

        </div>

        {/* RIGHT COLUMN — LIVE PREVIEW */}
        <div className="space-y-8">

          <div className="bg-white rounded-2xl p-8 shadow-sm">

            <h3 className="font-semibold mb-4">
              Live Preview
            </h3>

            <h2 className="text-xl font-bold">
              {name || "Kitchen Name"}
            </h2>

            <p className="text-gray-600 mt-2">
              {tagline || "Tagline preview"}
            </p>

            <div className="flex gap-2 mt-3 flex-wrap">
              {cuisines.map(c => (
                <span key={c}
                  className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs">
                  {c}
                </span>
              ))}
            </div>

            <p className="text-sm text-gray-600 mt-4">
              {story || "Story preview appears here..."}
            </p>

          </div>

          {/* PUBLISH */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">

            <h3 className="font-semibold mb-2">
              Publish Status
            </h3>

            <button
              onClick={() => setPublished(!published)}
              className={`w-full py-4 rounded-xl font-semibold
                ${published
                  ? "bg-green-500 text-white"
                  : "bg-gray-300"}
              `}
            >
              {published ? "Published" : "Draft"}
            </button>

            <p className="text-sm text-gray-600 mt-3">
              When published, customers can see your kitchen.
            </p>

          </div>

          {/* HELP */}
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">

            <h3 className="font-semibold">
              Need Help?
            </h3>

            <button className="mt-4 border w-full py-3 rounded-xl">
              Request Assisted Setup
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

/* ---------- UI Helpers ---------- */

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <h3 className="font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Input({ label, value, onChange, placeholder, required }) {
  return (
    <div className="mt-4">
      <p className="text-sm text-gray-600">
        {label} {required && "*"}
      </p>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full mt-1 px-4 py-3 border rounded-xl"
      />
    </div>
  );
}

function Chip({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full border text-sm
        ${active
          ? "bg-orange-500 text-white"
          : "bg-white hover:bg-orange-50"}
      `}
    >
      {children}
    </button>
  );
}
