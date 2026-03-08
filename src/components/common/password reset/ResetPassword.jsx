import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { resetPasswordConfirm } from "../../../utils/userAuth";
import { Lock, AlertCircle, CheckCircle, ArrowRight } from "lucide-react";

const ResetPassword = () => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validLink, setValidLink] = useState(true);
  const router = useRouter();
  const params = useParams();

  const uid = params?.uid;
  const token = params?.token;

  useEffect(() => {
    if (!uid || !token) {
      setValidLink(false);
      setError("Invalid password reset link");
    }
  }, [uid, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validLink) return;

    setError("");
    setSuccess(false);

    if (password1 !== password2) {
      setError("Passwords do not match");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (password1.length < 8) {
      setError("Password must be at least 8 characters");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setLoading(true);

    try {
      await resetPasswordConfirm({
        new_password1: password1,
        new_password2: password2,
        uid: uid,
        token: token,
      });
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      let errorMessage = "Password reset failed. Please try again.";
      if (error.response?.data?.password1?.[0])
        errorMessage = error.response.data.password1[0];
      else if (error.response?.data?.non_field_errors?.[0])
        errorMessage = error.response.data.non_field_errors[0];
      else if (error.response?.status === 400) {
        errorMessage = "Invalid or expired reset link.";
        setValidLink(false);
      } else if (error.message) errorMessage = error.message;

      setError(errorMessage);
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  if (!validLink) {
    return (
      <div className="w-full animate-fade-in-up text-center">
        <div className="text-center mb-10">
          <div
            className="arab inline-block font-light mb-3"
            style={{ color: "var(--o-color)", fontSize: "5rem", lineHeight: 1 }}
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
        <div
          className="rounded-3xl p-[1px] shadow-2xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,76,76,0.2), rgba(255,255,255,0.05))",
          }}
        >
          <div
            className="rounded-3xl px-10 py-16 backdrop-blur-xl"
            style={{ backgroundColor: "rgba(10, 10, 10, 0.7)" }}
          >
            <div className="flex justify-center mb-4">
              <AlertCircle size={40} style={{ color: "#ff4c4c" }} />
            </div>
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: "var(--w-color)" }}
            >
              Invalid Link
            </h2>
            <p className="text-sm mb-6" style={{ color: "var(--g-color)" }}>
              {error || "This link is invalid or has expired."}
            </p>
            <a
              href="/forgot-password"
              className="text-sm font-medium hover:underline"
              style={{ color: "var(--bright-b-color)" }}
            >
              Request a new reset link
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full animate-fade-in-up">
      {/* Logo */}
      <div className="text-center mb-10">
        <div
          className="arab inline-block font-light mb-3"
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
            "linear-gradient(135deg, rgba(65,115,250,0.2), rgba(255,255,255,0.05), rgba(220,153,8,0.1))",
        }}
      >
        <div
          className="rounded-3xl px-10 py-12 backdrop-blur-xl"
          style={{ backgroundColor: "rgba(10, 10, 10, 0.7)" }}
        >
          <div className="mb-10">
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: "var(--w-color)" }}
            >
              Create new password
            </h1>
            <p className="text-base" style={{ color: "var(--g-color)" }}>
              Your new password must be different from previous used passwords.
            </p>
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="relative group">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors group-focus-within:text-amber-400"
                style={{ color: "var(--g-color)" }}
              />
              <input
                className="w-full pl-12 pr-4 py-4 rounded-xl text-base outline-none transition-all duration-300 bg-black/20 border"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "var(--w-color)",
                }}
                type="password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(220,153,8,0.5)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")
                }
                placeholder="New Password"
                required
              />
            </div>

            <div className="relative group">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors group-focus-within:text-amber-400"
                style={{ color: "var(--g-color)" }}
              />
              <input
                className="w-full pl-12 pr-4 py-4 rounded-xl text-base outline-none transition-all duration-300 bg-black/20 border"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "var(--w-color)",
                }}
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(220,153,8,0.5)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")
                }
                placeholder="Confirm Password"
                required
              />
            </div>

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

            {success && (
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm border"
                style={{
                  backgroundColor: "rgba(220,153,8,0.05)",
                  borderColor: "rgba(220,153,8,0.2)",
                  color: "var(--o-color)",
                }}
              >
                <CheckCircle size={16} className="flex-shrink-0" />
                <span>Success! Redirecting to login...</span>
              </div>
            )}

            <button
              className="w-full py-4 rounded-xl font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2 group"
              style={{
                background: "linear-gradient(135deg, var(--o-color), #f5c842)",
                color: "#000000",
                boxShadow: "0 4px 20px rgba(220, 153, 8, 0.2)",
              }}
              disabled={loading || !validLink}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Resetting...
                </>
              ) : (
                <>
                  Reset Password
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </form>
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

export default ResetPassword;
