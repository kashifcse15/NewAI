import { useState } from "react";
import leaveslogo from "../assets/leaflogo.jpeg"
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import { LuUser } from "react-icons/lu";

export default function Login() {
  const [name, setName] = useState("");
  const [state, setState] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const { axios, setToken } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url =
      state === "login"
        ? "/api/user/login"
        : "/api/user/register";

    try {
      const { data } = await axios.post(url, {
        name,
        email,
        password,
      });

      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);

        toast.success(
          state === "login"
            ? "Login Successful"
            : "Account Created Successfully"
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#080f0a] font-sans">
      {/* LEFT — Image Panel */}
      <div className="relative hidden md:flex w-[48%] overflow-hidden">
        <img
          src={leaveslogo}
          alt="Abstract AI figure"
          className="h-50% w-full object-cover object-top"
        />

        <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-[#080f0a]" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/50" />

        <div className="absolute top-7 left-7 flex items-center gap-2 bg-black/40 backdrop-blur-md border border-green-400/25 rounded-full px-4 py-2">
          <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]" />
          <span className="text-green-100 text-sm font-semibold tracking-wide">
            Created by Kashif
          </span>
        </div>
      </div>

      {/* RIGHT — Form Panel */}
      <div className="relative flex flex-1 items-center justify-center px-8">
        <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-green-400/10 blur-3xl pointer-events-none" />

        <form
          onSubmit={handleSubmit}
          className="relative z-10 w-full max-w-sm"
        >
          <h1 className="text-4xl font-bold text-green-50 tracking-tight mb-1">
            {state === "login" ? "Sign in" : "Create Account"}
          </h1>

          <p className="text-sm text-[#6b7c6e] mb-7">
            {state === "login"
              ? "Welcome back! Please sign in to continue"
              : "Create your account to continue"}
          </p>

          {/* Google Button */}
          <button
            type="button"
            className="flex items-center justify-center w-full py-3 rounded-xl border border-green-400/20 bg-white/4 text-green-100 text-sm font-medium hover:bg-white/10 transition-colors mb-5 cursor-pointer"
          >
            <GoogleIcon />
            Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-green-400/15" />
            <span className="text-xs text-[#4b5e52] whitespace-nowrap">
              or sign in with email
            </span>
            <div className="flex-1 h-px bg-green-400/15" />
          </div>

          {state === "register" && (
  <div className="flex items-center gap-3 bg-white/4 border border-green-400/15 rounded-xl px-4 py-3 mb-3 focus-within:border-green-400/50 transition-colors">
    <LuUser />
    <input
      type="text"
      placeholder="Full Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      required={state === "register"}
      className="flex-1 bg-transparent border-none outline-none text-green-100 text-sm placeholder-[#4b5e52] caret-green-400"
    />
  </div>
)}

          {/* Email */}
          <div className="flex items-center gap-3 bg-white/4 border border-green-400/15 rounded-xl px-4 py-3 mb-3 focus-within:border-green-400/50 transition-colors">
            <MailIcon />
            <input
              type="email"
              placeholder="Email id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-transparent border-none outline-none text-green-100 text-sm placeholder-[#4b5e52] caret-green-400"
            />
          </div>

          {/* Password */}
          <div className="flex items-center gap-3 bg-white/4 border border-green-400/15 rounded-xl px-4 py-3 mb-4 focus-within:border-green-400/50 transition-colors">
            <LockIcon />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="flex-1 bg-transparent border-none outline-none text-green-100 text-sm placeholder-[#4b5e52] caret-green-400"
            />
          </div>

          {/* Remember + Forgot */}
          {state === "login" && (
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="accent-green-400 w-4 h-4 cursor-pointer"
                />
                <span className="text-xs text-[#6b7c6e]">
                  Remember me
                </span>
              </label>

              <a
                href="#"
                className="text-xs text-green-400 font-medium hover:underline"
              >
                Forgot password?
              </a>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-linear-to-br from-green-500 to-green-700 text-white text-base font-semibold shadow-[0_4px_24px_rgba(34,197,94,0.35)] hover:opacity-90 transition-opacity mb-5 cursor-pointer"
          >
            {state === "login" ? "Login" : "Register"}
          </button>

          <p className="text-center text-xs text-[#4b5e52]">
            {state === "login" ? (
              <>
                Don't have an account?{" "}
                <span
                  onClick={() => setState("register")}
                  className="text-green-400 font-semibold hover:underline cursor-pointer"
                >
                  Sign up
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => setState("login")}
                  className="text-green-400 font-semibold hover:underline cursor-pointer"
                >
                  Login
                </span>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" className="mr-2 shrink-0">
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.9z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.5 18.9 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.5 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.5 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-7.9l-6.6 5.1C9.5 39.6 16.3 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.4 4.2-4.4 5.5l6.2 5.2C36.9 39.9 44 34.7 44 24c0-1.3-.1-2.7-.4-3.9z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}