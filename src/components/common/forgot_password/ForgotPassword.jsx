import { useState } from "react";
import { resetPassword } from "../../../utils/userAuth";
import { Mail, ArrowRight, AlertCircle, CheckCircle } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      setStatus({ loading: false, success: false, error: "Please enter your email address" });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    try {
      await resetPassword({ email: email });
      setStatus({ loading: false, success: true, error: null });
      setTimeout(() => setStatus((prev) => ({ ...prev, success: false })), 5000);
    } catch (error) {
      console.error("Email has not been sent:", error);
      let errorMessage = "Failed to send reset email. Please try again.";
      if (error.response?.data?.email) errorMessage = error.response.data.email[0];
      else if (error.response?.data?.detail) errorMessage = error.response.data.detail;
      else if (error.message) errorMessage = error.message;

      setStatus({ loading: false, success: false, error: errorMessage });
      setTimeout(() => setStatus((prev) => ({ ...prev, error: null })), 5000);
    }
  };

  return (
    <div className="w-full animate-fade-in-up">
      {/* Logo */}
      <div className="text-center mb-10">
        <div className="arab inline-block font-light mb-3" style={{ color: "var(--o-color)", fontSize: "5rem", lineHeight: 1, textShadow: "0 0 40px rgba(220, 153, 8, 0.3)" }}>غ</div>
        <p className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: "var(--g-color)" }}>Ghareb</p>
      </div>

      {/* Card */}
      <div className="rounded-3xl p-[1px] shadow-2xl" style={{ background: "linear-gradient(135deg, rgba(220,153,8,0.2), rgba(255,255,255,0.05), rgba(65,115,250,0.1))" }}>
        <div className="rounded-3xl px-10 py-12 backdrop-blur-xl" style={{ backgroundColor: "rgba(10, 10, 10, 0.7)" }}>
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--w-color)" }}>Forgot Password?</h1>
            <p className="text-base" style={{ color: "var(--g-color)" }}>No worries, we'll send you reset instructions.</p>
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="relative group">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors group-focus-within:text-amber-400" style={{ color: "var(--g-color)" }} />
              <input
                className="w-full pl-12 pr-4 py-4 rounded-xl text-base outline-none transition-all duration-300 bg-black/20 border"
                style={{ border: "1px solid rgba(255,255,255,0.08)", color: "var(--w-color)" }}
                type="email"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(220,153,8,0.5)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
              />
            </div>

            {status.error && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm border" style={{ backgroundColor: "rgba(255,76,76,0.05)", borderColor: "rgba(255,76,76,0.2)", color: "#ff4c4c" }}>
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{status.error}</span>
              </div>
            )}

            {status.success && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm border" style={{ backgroundColor: "rgba(220,153,8,0.05)", borderColor: "rgba(220,153,8,0.2)", color: "var(--o-color)" }}>
                <CheckCircle size={16} className="flex-shrink-0" />
                <span>Reset email sent! Check your inbox.</span>
              </div>
            )}

            <button
              className="w-full py-4 rounded-xl font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2 group"
              style={{ background: "linear-gradient(135deg, var(--o-color), #f5c842)", color: "#000000", boxShadow: "0 4px 20px rgba(220, 153, 8, 0.2)" }}
              disabled={status.loading}
            >
              {status.loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                  Sending...
                </>
              ) : (
                <>
                  Reset Password
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      
      <style jsx>{` @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } } .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; } `}</style>
    </div>
  );
};

export default ForgotPassword;