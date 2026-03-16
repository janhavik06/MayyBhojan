import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUser } from "../../utils/getUser";

export default function DeliveryOnboarding() {

  const navigate = useNavigate();
  const user = getUser();

  const [steps, setSteps] = useState({
    identity: false,
    documents: false,
    vehicle: false,
  });

  const stepsKey = `delivery_onboarding_steps_${user?.email}`;

  useEffect(() => {

    const saved = localStorage.getItem(stepsKey);

    if (saved) {
      setSteps(JSON.parse(saved));
    }

  }, []);

  const completed = Object.values(steps).filter(Boolean).length;

  /* CHECK IF ADMIN APPROVED */

  useEffect(() => {

    async function checkStatus() {

      try {

        const res = await axios.get(
          `http://localhost:8080/api/users/${user.id}`
        );

        if (res.data.accountStatus === "ACTIVE") {

          navigate("/delivery/dashboard");

        }

      } catch (err) {

        console.log("Waiting for admin approval");

      }

    }

    const interval = setInterval(checkStatus, 5000);

    return () => clearInterval(interval);

  }, []);

  return (

    <div className="min-h-screen bg-[#F6F2EF] py-12">

      <div className="max-w-4xl mx-auto px-6">

        <header className="text-center mb-10">

          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">
            🚚 Welcome, Delivery Partner!
          </span>

          <h1 className="text-4xl font-bold mt-4">
            Start Your Journey with
            <span className="text-blue-500"> Flexible Earnings</span>
          </h1>

          <p className="text-gray-600 mt-3">
            Complete these steps to start delivering happiness.
          </p>

        </header>

        <ProgressBar completed={completed} />

        <section className="mt-8">

          <ChecklistCard
            title="Identity Verification"
            desc="Confirm your personal details"
            done={steps.identity}
            button="Verify Identity"
            onClick={() => navigate("/delivery/identity")}
          />

          <ChecklistCard
            title="Document Upload"
            desc="Upload Aadhaar / Driving License"
            done={steps.documents}
            button="Upload Documents"
            onClick={() => navigate("/delivery/verification")}
          />

          <ChecklistCard
            title="Vehicle Details"
            desc="Add your vehicle"
            done={steps.vehicle}
            button="Add Vehicle"
            onClick={() => navigate("/delivery/vehicle")}
          />

          <div className="mt-6 bg-white p-6 rounded-xl border">

            <h3 className="font-semibold">
              Delivery Partner Verification
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Your profile is under admin review.
            </p>

            <p className="text-sm mt-2 text-orange-500">
              Approval usually takes 24–48 hours.
            </p>

          </div>

        </section>

      </div>

    </div>

  );

}

function ProgressBar({ completed }) {

  return (

    <div className="bg-white rounded-xl p-6 shadow-sm mt-6">

      <div className="h-2 bg-gray-200 rounded">

        <div
          className="h-full bg-blue-500"
          style={{ width: `${(completed / 3) * 100}%` }}
        ></div>

      </div>

    </div>

  );

}

function ChecklistCard({ title, desc, done, button, onClick }) {

  return (

    <div className="bg-white p-6 rounded-xl shadow-sm mt-4 border">

      <div className="flex justify-between items-center">

        <div>

          <h3 className="font-semibold">{title}</h3>

          <p className="text-sm text-gray-500">{desc}</p>

        </div>

        {done ? (

          <span className="text-green-600">✔ Done</span>

        ) : (

          <button
            onClick={onClick}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {button}
          </button>

        )}

      </div>

    </div>

  );

}