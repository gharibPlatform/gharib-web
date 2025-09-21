import { useState } from "react";
import { resetPassword } from "../../../utils/userAuth";

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
      setStatus({
        loading: false,
        success: false,
        error: "Please enter your email address",
      });
      return;
    }

    setStatus({
      loading: true,
      success: false,
      error: null,
    });

    try {
      const forgotPasswordData = { email: email };
      await resetPassword(forgotPasswordData);

      setStatus({
        loading: false,
        success: true,
        error: null,
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus((prev) => ({ ...prev, success: false }));
      }, 5000);
    } catch (error) {
      console.error("Email has not been sent:", error);

      let errorMessage = "Failed to send reset email. Please try again.";
      if (error.response?.data?.email) {
        errorMessage = error.response.data.email[0];
      } else if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setStatus({
        loading: false,
        success: false,
        error: errorMessage,
      });

      // Clear error after 5 seconds
      setTimeout(() => {
        setStatus((prev) => ({ ...prev, error: null }));
      }, 5000);
    }
  };

  return (
    <div className="flex flex-col items-center bg-[var(--dark-color)] w-min justify-center py-4 px-8 rounded-md">
      <h2 className="text-[var(--w-color)] text-3xl pb-8 pt-4">
        Forgot Password
      </h2>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          style={{ width: "380px" }}
          className="px-4 py-2 bg-[var(--secondary-color)] text-xl text-[var(--w-color)] placeholder-[var(--g-color)] rounded-sm border border-[var(--main-color-hover)]"
          type="email"
          placeholder="Please enter your email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <p className="flex items-center justify-center text-[var(--w-color)] text-center">
          A verification will be sent to your email to reset your password
        </p>

        {/* Status messages */}
        {status.error && (
          <p className="text-[var(--bright-r-color)] text-center">
            {status.error}
          </p>
        )}

        {status.success && (
          <p className="text-[var(--o-color)] text-center">
            Password reset email sent successfully! Please check your inbox.
          </p>
        )}

        <button
          style={{ width: "380px", borderRadius: "6px" }}
          className={`px-4 bg-[var(--o-color)] text-xl text-[var(--w-color)] placeholder-[var(--g-color)] py-2 mb-8 flex items-center justify-center ${
            status.loading ? "opacity-75" : ""
          }`}
          disabled={status.loading}
        >
          {status.loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending...
            </>
          ) : (
            "Send Verification"
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
