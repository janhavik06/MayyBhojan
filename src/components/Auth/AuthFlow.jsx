import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const roles = [
  { id: "customer", label: "Customer", desc: "Order food" },
  { id: "cook", label: "Homemaker", desc: "Cook for community" },
  { id: "delivery", label: "Delivery Student", desc: "Deliver meals" },
  { id: "admin", label: "Admin", desc: "Platform admin" },
];

export default function AuthFlow({ mode="login", setLoggedIn }) {
  const navigate = useNavigate();

  const [role, setRole] = useState("customer");
  const [method, setMethod] = useState("otp");
  const [step, setStep] = useState("phone");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState("");

  // OTP timer
  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  const sendOTP = () => {
    if (!phone) {
      setError("Enter phone number to continue");
      return;
    }
    setError("");
    setStep("otp");
    setTimer(30);
  };

  const confirmOTP = () => {
    if (otp !== "1234") {
      setError("That code didn’t match. Try again.");
      return;
    }
    finishAuth();
  };

  const finishAuth = () => {
    const userData = {
      role,
      phone,
      email,
      loginMethod: method,
      loggedIn: true,
      time: new Date().toISOString(),
    };

    localStorage.setItem("maybhojan_user", JSON.stringify(userData));

    if (setLoggedIn) setLoggedIn(true);

    navigate("/custalogin");
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT FORM */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-10">
        <div className="w-full max-w-md">

          <h1 className="text-2xl font-bold text-orange-500">
            MayBhojan
          </h1>

          <h2 className="mt-6 text-4xl font-extrabold">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h2>

          {/* ROLE SELECTOR */}
          <div className="grid grid-cols-2 gap-3 mt-8">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`p-4 rounded-xl border text-left
                  ${role === r.id
                    ? "bg-orange-100 border-orange-400"
                    : "bg-gray-50 hover:bg-gray-100"}
                `}
              >
                <p className="font-semibold">{r.label}</p>
                <p className="text-xs text-gray-500">{r.desc}</p>
              </button>
            ))}
          </div>

          {/* METHOD SWITCH */}
          <div className="flex gap-2 mt-6 bg-gray-100 p-1 rounded-xl">
            {["otp", "email", "password"].map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMethod(m);
                  setStep("phone");
                  setError("");
                }}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold
                  ${method === m ? "bg-white shadow" : "text-gray-600"}
                `}
              >
                {m === "otp" && "Phone OTP"}
                {m === "email" && "Email Link"}
                {m === "password" && "Password"}
              </button>
            ))}
          </div>

          {/* OTP */}
          {method === "otp" && step === "phone" && (
            <>
              <input
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mt-6 px-4 py-4 border rounded-xl"
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <button
                onClick={sendOTP}
                className="w-full mt-4 bg-orange-500 text-white py-4 rounded-xl font-semibold"
              >
                Send OTP
              </button>
            </>
          )}

          {method === "otp" && step === "otp" && (
            <>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full mt-6 px-4 py-4 border rounded-xl text-center text-2xl tracking-widest"
                placeholder="••••"
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <button
                onClick={confirmOTP}
                className="w-full mt-4 bg-orange-500 text-white py-4 rounded-xl font-semibold"
              >
                Confirm
              </button>
            </>
          )}

          {/* EMAIL */}
          {method === "email" && (
            <>
              <input
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-6 px-4 py-4 border rounded-xl"
              />
              <button
                onClick={finishAuth}
                className="w-full mt-4 bg-orange-500 text-white py-4 rounded-xl font-semibold"
              >
                Send sign-in link
              </button>
            </>
          )}

          {/* PASSWORD */}
          {method === "password" && (
            <>
              <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-6 px-4 py-4 border rounded-xl"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-4 px-4 py-4 border rounded-xl"
              />
              <button
                onClick={finishAuth}
                className="w-full mt-4 bg-orange-500 text-white py-4 rounded-xl font-semibold"
              >
                Login
              </button>
            </>
          )}

          <p className="text-xs text-gray-500 text-center mt-8">
            We keep your info private.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="hidden md:flex w-1/2
        bg-gradient-to-br from-[#F6E6DC] via-[#F1DCD1] to-[#E9CFC2]
        items-center justify-center p-16">

        <div className="text-center max-w-md">
          <h2 className="text-5xl font-extrabold">
            Food that feels like home ❤️
          </h2>
        </div>
      </div>

    </div>
  );
}
