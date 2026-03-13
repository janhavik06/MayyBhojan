import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
const roles = [
  { id: "customer", label: "Customer", desc: "Order food" },
  { id: "cook", label: "Homemaker", desc: "Cook for community" },
  { id: "delivery", label: "Delivery Student", desc: "Deliver meals" },
  { id: "admin", label: "Admin", desc: "Platform admin" },
];

export default function AuthFlow({ mode = "login", setLoggedIn }) {
  const navigate = useNavigate();

  const [role, setRole] = useState("customer");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  /* ================= SIGNUP ================= */
  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
    return emailRegex.test(email);
  };

  // Password validation
  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  // Phone validation
  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };
  const handleSignup = () => {
    if (!phone || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    if (!validatePhone(phone)) {
      setError("Phone number must be exactly 10 digits");
      return;
    }

    if (!validateEmail(email)) {
      setError("Email must contain @ and end with .com");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be 8+ characters, include a number and special character",
      );
      return;
    }

    const newUser = {
      role,
      phone,
      email,
      password,
    };

    // get existing users
    const users = JSON.parse(localStorage.getItem("maybhojan_users")) || [];

    // check if email already exists
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      setError("Account already exists. Please login.");
      return;
    }

    // add new user
    users.push(newUser);

    localStorage.setItem("maybhojan_users", JSON.stringify(users));

    navigate("/login");
  };
  /* ================= LOGIN ================= */
  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("maybhojan_users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password && u.role === role,
    );

    if (!user) {
      setError("Invalid email, password or role");
      return;
    }

    /* store logged in user */
    localStorage.setItem("maybhojan_user", JSON.stringify(user));

    if (setLoggedIn) setLoggedIn(true);

    if (user.role === "customer") navigate("/custalogin");
    if (user.role === "cook") {
      const onboarded = localStorage.getItem(`cook_onboarded_${user.email}`);

      if (onboarded === "true") {
        navigate("/cook");
      } else {
        navigate("/cook/login");
      }
    }
    if (user.role === "delivery") navigate("/delivery");

    if (user.role === "admin") navigate("/admin");
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-10">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-orange-500">MayBhojan</h1>

          <h2 className="mt-6 text-4xl font-extrabold">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h2>

          {/* ROLE SELECTOR */}
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
                <p className="font-semibold">{r.label}</p>
                <p className="text-xs text-gray-500">{r.desc}</p>
              </button>
            ))}
          </div>

          {/* PHONE (Signup only) */}
          {mode === "signup" && (
            <input
              placeholder="Phone Number"
              value={phone}
              maxLength={10}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              className="w-full mt-6 px-4 py-4 border rounded-xl"
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

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

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
          <div className="text-center mt-4">
            {mode === "login" ? (
              <p className="text-sm text-gray-600">
                Don’t have an account?{" "}
                <Link to="/signup" className="text-orange-500 font-semibold">
                  Sign up
                </Link>
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-orange-500 font-semibold">
                  Login
                </Link>
              </p>
            )}
          </div>
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
