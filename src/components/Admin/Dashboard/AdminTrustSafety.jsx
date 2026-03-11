import { useState } from "react";

export default function AdminTrustSafety() {
  const [selectedCase, setSelectedCase] = useState(0);

  const cases = [
    {
      title: "Hygiene flag — Savita’s Kitchen",
      priority: "High",
      status: "New",
      time: "5 mins ago",
    },
    {
      title: "Possible fraud — Order #MB2031",
      priority: "Medium",
      status: "In Progress",
      time: "1 hr ago",
    },
    {
      title: "User complaint — cold food",
      priority: "Low",
      status: "Waiting",
      time: "Yesterday",
    },
  ];

  return (
    <div className="h-screen flex bg-[#F6F2EF] gap-5">
      {/* COLUMN A */}
      <div className="w-[300px] bg-white rounded-2xl shadow-sm flex flex-col">
        <div className="p-4">
          <input
            placeholder="Search cases..."
            className="w-full bg-gray-100 px-3 py-2 rounded-xl outline-none"
          />
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 px-3 pb-4">
          {cases.map((c, i) => (
            <CaseRow
              key={i}
              c={c}
              active={i === selectedCase}
              onClick={() => setSelectedCase(i)}
            />
          ))}
        </div>
      </div>

      {/* COLUMN B */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden">
        {/* HEADER */}
        <div className="p-6 flex justify-between items-center bg-white/70 backdrop-blur">
          <div>
            <h2 className="font-bold text-xl">{cases[selectedCase].title}</h2>
            <div className="flex gap-3 mt-1">
              <Chip label={cases[selectedCase].priority} color="red" />
              <Chip label={cases[selectedCase].status} color="orange" />
            </div>
          </div>

          <div className="flex gap-3">
            <ActionBtn text="Assign" />
            <ActionBtn text="Request Info" />
            <ActionBtn text="Suspend" red />
            <ActionBtn text="Close Case" />
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <Card title="Evidence">
            <div className="grid grid-cols-3 gap-4">
              <EvidenceTile />
              <EvidenceTile />
              <EvidenceTile />
            </div>
          </Card>

          <Card title="Structured Details">
            <p className="text-gray-600 text-sm">
              Kitchen: Savita’s Kitchen • Previous flags: 2 • Verified: No
            </p>
          </Card>
        </div>
      </div>

      {/* COLUMN C */}
      <div className="w-[380px] bg-white rounded-2xl shadow-sm flex flex-col">
        <div className="p-5">
          <h3 className="font-bold">Case Context</h3>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-6">
          <Panel title="Assignment">
            Assigned to: <b>Raj Sharma</b>
          </Panel>

          <Panel title="Templates">
            <button className="w-full bg-gray-100 py-2 rounded-xl hover:bg-gray-200">
              Request more info
            </button>
          </Panel>

          <Panel title="Audit Timeline">
            <Timeline text="Anita opened case — 10:45 AM" />
            <Timeline text="Raj annotated evidence — 10:50 AM" />
          </Panel>
        </div>
      </div>
    </div>
  );
}

/* COMPONENTS */

function CaseRow({ c, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-xl cursor-pointer transition ${
        active ? "bg-orange-50 shadow-inner" : "hover:bg-gray-50"
      }`}
    >
      <p className="font-semibold text-sm">{c.title}</p>
      <div className="flex justify-between text-xs text-gray-500 mt-3">
        <span>{c.priority}</span>
        <span>{c.time}</span>
      </div>
    </div>
  );
}
function Chip({ label, priority, color }) {
  const styles = {
    red: "bg-red-100 text-red-600",
    orange: "bg-orange-100 text-orange-600",
    green: "bg-green-100 text-green-600",
  };

  return (
    <div className="flex items-center gap-2">
      {priority && (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[color]}`}
        >
          {priority}
        </span>
      )}

      {label && (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600  ${styles[color]}`}
        >
          {label}
        </span>
      )}
    </div>
  );
}

function ActionBtn({ text, red }) {
  return (
    <button
      className={`px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm ${
        red ? "text-red-500" : ""
      }`}
    >
      {text}
    </button>
  );
}

function EvidenceTile() {
  return (
    <div className="bg-gray-100 h-32 rounded-xl flex items-center justify-center text-gray-400 text-sm">
      Evidence
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-gray-50 p-5 rounded-2xl shadow-inner">
      <h3 className="font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div>
      <h4 className="font-semibold mb-2">{title}</h4>
      <div className="bg-gray-50 p-4 rounded-xl shadow-inner text-sm">
        {children}
      </div>
    </div>
  );
}

function Timeline({ text }) {
  return <p className="text-sm text-gray-600">• {text}</p>;
}
