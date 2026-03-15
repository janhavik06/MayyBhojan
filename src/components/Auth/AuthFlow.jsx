import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:8080/api/auth";

const roles = [
  { id: "customer", label: "Customer", desc: "Order food" },
  { id: "cook", label: "Homemaker", desc: "Cook for community" },
  { id: "delivery", label: "Delivery Student", desc: "Deliver meals" },
  { id: "admin", label: "Admin", desc: "Platform admin" },
];

export default function AuthFlow({ mode = "login", setLoggedIn }) {

  const navigate = useNavigate();

  // ROLE should not be pre-selected
  const [role, setRole] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const roleMap = {
    customer: "CUSTOMER",
    cook: "HOMEMAKER",
    delivery: "DELIVERY",
    admin: "ADMIN"
  };

  /* ================= SIGNUP ================= */

  const handleSignup = async () => {

    if (!role) {
      setError("Please select a role");
      return;
    }

    try {

      const backendRole = roleMap[role];

      const payload = {
        name,
        phone,
        email,
        password,
        role: backendRole
      };

      let url = "";

      if (backendRole === "CUSTOMER") url = `${API}/signup/customer`;
      if (backendRole === "HOMEMAKER") url = `${API}/signup/homemaker`;
      if (backendRole === "DELIVERY") url = `${API}/signup/delivery`;
      if (backendRole === "ADMIN") url = `${API}/signup/admin`;

      await axios.post(url, payload);

      alert("Signup successful. Please login.");

      navigate("/login");

    } catch (err) {

      console.error(err);
      setError("Signup failed");

    }

  };


  /* ================= LOGIN ================= */

const handleLogin = async () => {

  if (!role) {
    setError("Please select a role");
    return;
  }

  try {

    const res = await axios.post(`${API}/login`, {
      email,
      password
    });

    const user = res.data;

    if (user.role !== roleMap[role]) {
      setError("Wrong role selected");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));

    if (setLoggedIn) setLoggedIn(true);

    if (user.role === "CUSTOMER") navigate("/custalogin");
    if (user.role === "HOMEMAKER") navigate("/cook/login");
    if (user.role === "DELIVERY") navigate("/delivery");
    if (user.role === "ADMIN") navigate("/admin");

  } catch (err) {

    console.error(err);
    setError("Invalid email or password");

  }

};

  return (

    <div className="min-h-screen flex">

      {/* LEFT SIDE */}

      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-10">

        <div className="w-full max-w-md">

          <h1 className="text-2xl font-bold text-orange-500">
            MayBhojan
          </h1>

          <h2 className="mt-6 text-4xl font-extrabold">
            {mode === "login"
              ? "Welcome back"
              : "Create your account"}
          </h2>


          {/* ROLE SELECTOR */}

          <div className="grid grid-cols-2 gap-3 mt-8">

            {roles.map((r) => (

              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`p-4 rounded-xl border text-left
                ${
                  role === r.id
                    ? "bg-orange-100 border-orange-400"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >

                <p className="font-semibold">
                  {r.label}
                </p>

                <p className="text-xs text-gray-500">
                  {r.desc}
                </p>

              </button>

            ))}

          </div>


          {/* NAME (Signup only) */}

          {mode === "signup" && (

            <input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-6 px-4 py-4 border rounded-xl"
            />

          )}


          {/* PHONE */}

          {mode === "signup" && (

            <input
              placeholder="Phone Number"
              value={phone}
              maxLength={10}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full mt-4 px-4 py-4 border rounded-xl"
            />

          )}


          {/* EMAIL */}

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-4 px-4 py-4 border rounded-xl"
          />


          {/* PASSWORD */}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-4 px-4 py-4 border rounded-xl"
          />


          {error && (

            <p className="text-red-500 text-sm mt-2">
              {error}
            </p>

          )}


          {/* BUTTON */}

          {mode === "signup" ? (

            <button
              onClick={handleSignup}
              className="w-full mt-4 bg-orange-500 text-white py-4 rounded-xl font-semibold"
            >
              Sign Up
            </button>

          ) : (

            <button
              onClick={handleLogin}
              className="w-full mt-4 bg-orange-500 text-white py-4 rounded-xl font-semibold"
            >
              Login
            </button>

          )}


          <p className="text-xs text-gray-500 text-center mt-8">
            We keep your info private.
          </p>

        </div>

      </div>


      {/* RIGHT SIDE */}

      <div
        className="hidden md:flex w-1/2
        bg-gradient-to-br from-[#F6E6DC] via-[#F1DCD1] to-[#E9CFC2]
        items-center justify-center p-16"
      >

        <div className="text-center max-w-md">

          <h2 className="text-5xl font-extrabold">
            Food that feels like home ❤️
          </h2>

        </div>

      </div>

    </div>

  );

}