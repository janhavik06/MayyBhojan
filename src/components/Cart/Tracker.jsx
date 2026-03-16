export default function Tracker({ status }) {

  const steps = [
    { key: "PLACED", label: "Order Placed" },
    { key: "ACCEPTED", label: "Delivery Partner Assigned" },
    { key: "DELIVERED", label: "Delivered" }
  ];

  const statusIndex = steps.findIndex(s => s.key === status);

  return (

    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow">

      <h2 className="font-semibold text-lg mb-6">
        Delivery Progress
      </h2>

      <div className="space-y-6">

        {steps.map((step, index) => {

          const active = index <= statusIndex;

          return (

            <div key={step.key} className="flex items-center gap-4">

              <div
                className={`w-4 h-4 rounded-full ${
                  active ? "bg-green-500" : "bg-gray-300"
                }`}
              />

              <span
                className={`${
                  active
                    ? "text-green-600 font-semibold"
                    : "text-gray-500"
                }`}
              >
                {step.label}
              </span>

            </div>

          );

        })}

      </div>

    </div>

  );

}