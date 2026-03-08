"use client";
import { useState } from "react";
import { login } from "../../../utils/userAuth";
import { useRouter } from "next/navigation";
import useUserStore from "@/stores/user/userStore";
import Link from "next/link";
import { User, Lock, AlertCircle, ArrowRight } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useUserStore();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const loginData = { username, password };

    login(loginData)
      .then((response) => {
        setUser(response.user);
        router.push("/home");
      })
      .catch((error) => {
        if (error.response?.data?.non_field_errors) {
          setError(error.response.data.non_field_errors[0]);
        } else if (error.response?.data?.detail) {
          setError(error.response.data.detail);
        } else {
          setError("Login failed. Please try again.");
        }
        setTimeout(() => setError(""), 5000);
      })
      .finally(() => setIsLoading(false));
  };

  const googleAuthUrl =
    "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:3000/accounts/google/callback/&prompt=consent&response_type=code&client_id=893732143405-24b807n9p999r0qs3adsk3obnvdbqbsn.apps.googleusercontent.com&scope=openid%20email%20profile&access_type=offline";

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{
        backgroundColor: "var(--secondary-color)",
        fontFamily: "var(--font-cairo)",
      }}
    >
      {/* --- Background Effects --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Ambient Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-20" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-10" />
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--w-color) 1px, transparent 1px),
                              linear-gradient(90deg, var(--w-color) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* --- Main Content --- */}
      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        {/* Logo */}
        <div className="text-center mb-10">
          <div
            className="arab inline-block font-light mb-3 transition-transform hover:scale-110 duration-300"
            style={{
              color: "var(--o-color)",
              fontSize: "5rem",
              lineHeight: 1,
              textShadow: "0 0 40px rgba(220, 153, 8, 0.3)",
            }}
          >
            غ
          </div>
          <p
            className="text-xs uppercase tracking-[0.3em] font-medium"
            style={{ color: "var(--g-color)" }}
          >
            Ghareb
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-3xl p-[1px] shadow-2xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(220,153,8,0.2), rgba(255,255,255,0.05), rgba(65,115,250,0.1))",
          }}
        >
          <div
            className="rounded-3xl px-8 py-10 backdrop-blur-xl"
            style={{ backgroundColor: "rgba(10, 10, 10, 0.7)" }} // Glassmorphism base
          >
            {/* Header */}
            <div className="mb-8">
              <h1
                className="text-2xl font-bold mb-2"
                style={{ color: "var(--w-color)" }}
              >
                Welcome back
              </h1>
              <p className="text-sm" style={{ color: "var(--g-color)" }}>
                Sign in to continue your journey
              </p>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              {/* Username */}
              <div className="relative group">
                <User
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors group-focus-within:text-amber-400"
                  style={{ color: "var(--g-color)" }}
                />
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-300 bg-black/20 border"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "var(--w-color)",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(220,153,8,0.5)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.08)")
                  }
                  type="text"
                  placeholder="Username"
                  required
                />
              </div>

              {/* Password */}
              <div className="relative group">
                <Lock
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors group-focus-within:text-amber-400"
                  style={{ color: "var(--g-color)" }}
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-300 bg-black/20 border"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "var(--w-color)",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(220,153,8,0.5)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.08)")
                  }
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>

              {/* Error */}
              {error && (
                <div
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm border"
                  style={{
                    backgroundColor: "rgba(255,76,76,0.05)",
                    borderColor: "rgba(255,76,76,0.2)",
                    color: "#ff4c4c",
                  }}
                >
                  <AlertCircle size={16} className="flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Forgot password */}
              <div className="flex justify-end -mt-1">
                <Link
                  href="/forgot-password"
                  className="text-xs transition-colors hover:underline"
                  style={{ color: "var(--g-color)" }}
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <button
                className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 group"
                style={{
                  background:
                    "linear-gradient(135deg, var(--o-color), #f5c842)",
                  color: "#000000",
                  boxShadow: "0 4px 20px rgba(220, 153, 8, 0.2)",
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div
                className="flex-1 h-px"
                style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
              />
              <span
                className="text-xs uppercase tracking-widest"
                style={{ color: "var(--g-color)" }}
              >
                or
              </span>
              <div
                className="flex-1 h-px"
                style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
              />
            </div>

            {/* Google */}
            <a href={googleAuthUrl} className="block w-full">
              <div
                className="w-full px-4 py-3.5 rounded-xl flex items-center justify-center gap-3 text-sm font-medium transition-all duration-300 cursor-pointer hover:bg-white/5"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "var(--lighter-color)",
                }}
              >
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  viewBox="-3 0 262 262"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid"
                >
                  <path
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                    fill="#4285F4"
                  />
                  <path
                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                    fill="#34A853"
                  />
                  <path
                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                    fill="#FBBC05"
                  />
                  <path
                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                    fill="#EB4335"
                  />
                </svg>
                Continue with Google
              </div>
            </a>

            {/* Sign up link */}
            <p
              className="text-center text-sm mt-8"
              style={{ color: "var(--g-color)" }}
            >
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold transition-colors hover:underline"
                style={{ color: "var(--o-color)" }}
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Login;
