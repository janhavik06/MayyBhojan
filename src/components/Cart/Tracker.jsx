export default function Tracker({ step }) {
    const steps = [
      { id: 1, label: "Cart" },
      { id: 2, label: "Address" },
      { id: 3, label: "Payment" },
      { id: 4, label: "Confirm" },
    ];
  
    return (
      <div className="flex justify-center gap-16 py-8 text-sm">
        {steps.map((s) => (
          <div key={s.id} className="flex flex-col items-center">
  
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full border
                ${
                  step === s.id
                    ? "bg-orange-500 text-white border-orange-500"
                    : step > s.id
                    ? "bg-green-100 text-green-600 border-green-300"
                    : "bg-gray-100 text-gray-500"
                }
              `}
            >
              {s.id}
            </div>
  
            <span
              className={`mt-2 ${
                step === s.id ? "text-orange-500 font-semibold" : ""
              }`}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    );
  }
  