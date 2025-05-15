"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Login() {
  //const { data: session } = useSession(); // Use useSession to get the session
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("tourist"); // default role
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession(); 

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const role = session.user.role;
      const userId = session.user.id;
  
      if (role === "admin") {
        router.push("/admin");
      } else if (role === "accommodation_provider") {
        router.push(`/acco_provider/${userId}`);
      } else if (role === "transportation_provider") {
        router.push(`/tra_provider/${userId}`);
      } else if (role === "destination_provider") {
        router.push(`/destination_provider/${userId}`);
      } else if (role === "customer_service") {
        router.push(`/c_service`);
      } else if (role === "tour_guide") {
        router.push(`/guide/${userId}`);
      } else {
        router.push("/"); // fallback
      }
    }
  }, [session, status, router]);
  

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Email, and Password are required!");
      return;
    }

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevent automatic redirect
    });

    if (res?.error) {
      setError("Invalid credentials");
    }
  };
  

  const handleSignup = async () => {
    setError("");

    if (!email || !password || !name || !role) {
      setError("Name, Email, and Password are required!");
      return;
    }

    // Password validation checks
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one capital letter.");
      return;
    }
    if (!/[0-9]/.test(password)) {
      setError("Password must contain at least one number.");
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setError("Password must contain at least one special character.");
      return;
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name, phone, role }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Registration failed!");
    } else {
      alert("Registration successful! You can now sign in.");
      setIsOpen(false); // Switch to login form
    }
  };

  return (
    <div className="font-roboto bg-white shadow-lg shadow-main relative overflow-hidden w-[768px] max-w-[95%] md:min-h-[480px] min-h-[700px] rounded-[80px] md:rounded-[150px] mx-auto mt-5">
      {/* Sign up */}
      <div
        className={`absolute -top-9 md:top-0 md:h-full h-1/2 transition-[0.6s] left-0 md:w-1/2 w-full z-[1] opacity-0 ${
          isOpen
            ? "md:translate-x-[100%] translate-y-[100%] md:translate-y-0 opacity-[1] z-[5] animate-move"
            : ""
        }`}
      >
        <div className="bg-white flex items-center justify-center flex-col px-[40px] h-full">
          <h1 className="text-main text-3xl font-serif">Sign Up</h1>
          <button
            onClick={(event) => {
              event.stopPropagation(); // Prevents the event from affecting parent elements
              signIn("google");
            }}
            className="my-[20px] gsi-material-button border border-gray-400 rounded-md flex items-center text-gray-800 text-sm font-medium cursor-pointer py-2 px-4 max-w-xs min-w-max focus:outline-none transition-all duration-218"
          >
            <Image
              src="/google1.jpg"
              width={35}
              height={35}
              alt="logo"
              className="pr-2"
            />
            Sign up with Google
          </button>

          <span className="text-[12px] text-main">Or use Email for Registration</span>
          <input
            className="bg-[#eee] border-none mt-[8px] py-[10px] px-[15px] text-[13px] rounded-[8px] w-full outline-none"
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="bg-[#eee] border-none mt-[8px] py-[10px] px-[15px] text-[13px] rounded-[8px] w-full outline-none"
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
           <div className="relative w-full">
      <input
        type={showPassword1 ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="bg-[#eee] border-none mt-[8px] py-[10px] px-[15px] text-[13px] rounded-[8px] w-full outline-none pr-10"
      />
      <span
        onClick={() => setShowPassword1((prev) => !prev)}
        className="absolute top-[60%] right-[10px] transform -translate-y-1/2 cursor-pointer text-gray-600 text-[18px]"
      >
        {showPassword1 ? "🙈" : "👁️"}
      </span>
    </div>
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-[#eee] border-none mt-[8px] py-[10px] px-[15px] text-[13px] rounded-[8px] w-full outline-none"
          />
          <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-[#eee] border-none mt-[8px] py-[10px]  px-[10px]  text-[13px] rounded-[8px] w-full outline-none role-select"
            >
              <option value="tourist">Tourist</option>
              <option value="accommodation_provider">Accommodation Provider</option>
              <option value="transportation_provider">Transportation Provider</option>
              <option value="tour_guide">Tour Guide</option>
              <option value="destination_provider">Destination Provider</option>
          </select> 


          {error && <p style={{ color: "red" }}>{error}</p>}
          <button
            onClick={handleSignup}
            className="bg-text text-white py-[10px] px-[45px] border-[1px] border-transparent border-solid rounded-[8px] font-[600] tracking-[0.5px] mt-[10px] cursor-pointer"
          >
            SIGN UP
          </button>
        </div>
      </div>

      {/* Sign in */}
      <div
        className={`absolute top-7 md:top-0 h-1/2 md:h-full transition-[0.6s] left-0 w-full md:w-1/2 z-[2] ${isOpen ? "md:translate-x-[100%] translate-y-[100%] md:translate-y-0 " : ""}`}
      >
        <div className="bg-white flex items-center justify-center flex-col px-[40px] h-full">
          <h1 className="text-main text-3xl font-serif">Sign In</h1>
          <button
            onClick={(event) => {
              event.stopPropagation(); // Prevents the event from affecting parent elements
              signIn("google");
            }}
            className="my-[20px] gsi-material-button border border-gray-400 rounded-md flex items-center text-gray-800 text-sm font-medium cursor-pointer py-2 px-4 max-w-xs min-w-max focus:outline-none transition-all duration-218"
          >
            <Image
              src="/google1.jpg"
              width={35}
              height={35}
              alt="logo"
              className="pr-2"
            />
            Sign in with Google
          </button>

          <span className="text-[12px] text-main">or use Email and Password</span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eee] border-none mt-[8px] py-[10px] px-[15px] text-[13px] rounded-[8px] w-full outline-none"
          />
          <div className="relative w-full">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="bg-[#eee] border-none mt-[8px] py-[10px] px-[15px] text-[13px] rounded-[8px] w-full outline-none pr-10"
      />
      <span
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute top-[60%] right-[10px] transform -translate-y-1/2 cursor-pointer text-gray-600 text-[18px]"
      >
        {showPassword ? "🙈" : "👁️"}
      </span>
    </div>
          <a href="#" className="text-[#333] no-underline pt-[15px] pb-[10px]">
            forget password?
          </a>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button
            onClick={handleLogin}
            className={`bg-text text-white py-[10px] px-[45px] border-[1px] border-transparent border-solid rounded-[8px] font-[600] tracking-[0.5px] mt-[10px] cursor-pointer ${isOpen ? "opacity-0" : ""}`}
          >
            SIGN IN
          </button>
        </div>
      </div>

      {/* Welcome message */}
      <div
        className={`absolute top-[60%] md:top-0 left-0 md:left-1/2 w-full md:w-1/2 h-1/2 md:h-full overflow-hidden md:rounded-[150px] z-[10] transition-all ${isOpen ? " translate-y-[-100%] md:translate-y-0 md:translate-x-[-100%] md:rounded-[150px] top-[40%] md:top-0" : ""}`}
      >
        <div
          className={`bg-text h-full relative left-[-100%] w-[200%] translate-x-0 transition-all ${
            isOpen ? "translate-x-[50%]" : ""
          }`}
        >
          <div
            className={`text-white absolute w-1/2 gap-4 h-full flex justify-center items-center flex-col px-[30px] text-center top-0 transition-all ${
              isOpen ? "translate-x-0 z-50" : ""
            }`}
          >
            <h1 className="text-3xl font-serif">Welcome !</h1>
            <p className="text-[14px] leading-[20px] tracking-[0.3px] mx-[20px]">
              If you already have an Account
            </p>
            <button
              onClick={handleToggle}
              className="bg-transparent text-white py-[10px] px-[45px] border-[1px] border-white border-solid rounded-[8px] font-[600] tracking-[0.5px] mt-[10px] cursor-pointer"
            >
              SIGN IN
            </button>
          </div>
          <div
            className={`text-white absolute gap-4 w-1/2 h-full flex justify-center items-center flex-col px-[30px] text-center top-0 translate-x-0 transition-all right-0 ${
              isOpen ? "translate-x-[200%]" : ""
            }`}
          >
            <h1 className="text-3xl font-serif">Welcome Back !!</h1>
            <p className="text-[14px] leading-[20px] tracking-[0.3px] mx-[20px]">
              If you do not have an Account
            </p>
            <button
              onClick={handleToggle}
              className="bg-transparent text-white py-[10px] px-[45px] border-[1px] border-white border-solid rounded-[8px] font-[600] tracking-[0.5px] mt-[10px] cursor-pointer"
            >
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
