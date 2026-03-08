import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { verifyEmail } from "../../../utils/userAuth";
import { CheckCircle, XCircle, Loader } from "lucide-react";

const EmailVerification = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();

  const encodedKey = params?.id;
  const decodedKey = encodedKey ? decodeURIComponent(encodedKey) : null;

  useEffect(() => {
    if (!decodedKey) {
      setError("Missing verification key");
      setLoading(false);
      return;
    }

    const verify = async () => {
      try {
        await verifyEmail({ key: decodedKey });
        setSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } catch (error) {
        let errorMessage = "Email verification failed. Please try again.";
        if (error.response?.data?.detail)
          errorMessage = error.response.data.detail;
        else if (error.response?.status === 404)
          errorMessage = "Invalid or expired verification link.";
        else if (error.message) errorMessage = error.message;
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [decodedKey, router]);

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
          className="rounded-3xl px-10 py-16 backdrop-blur-xl text-center"
          style={{ backgroundColor: "rgba(10, 10, 10, 0.7)" }}
        >
          {loading && (
            <div className="flex flex-col items-center gap-4">
              <Loader
                size={40}
                className="animate-spin"
                style={{ color: "var(--o-color)" }}
              />
              <p className="text-lg" style={{ color: "var(--w-color)" }}>
                Verifying your email...
              </p>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center gap-4">
              <div
                className="p-4 rounded-full"
                style={{ backgroundColor: "rgba(255,76,76,0.1)" }}
              >
                <XCircle size={40} style={{ color: "#ff4c4c" }} />
              </div>
              <h2
                className="text-2xl font-bold"
                style={{ color: "var(--w-color)" }}
              >
                Verification Failed
              </h2>
              <p className="text-sm max-w-xs" style={{ color: "#ff4c4c" }}>
                {error}
              </p>
              <a
                href="/signup"
                className="text-sm font-medium hover:underline"
                style={{ color: "var(--bright-b-color)" }}
              >
                Sign up again
              </a>
            </div>
          )}

          {success && (
            <div className="flex flex-col items-center gap-4">
              <div
                className="p-4 rounded-full"
                style={{ backgroundColor: "rgba(220,153,8,0.1)" }}
              >
                <CheckCircle size={40} style={{ color: "var(--o-color)" }} />
              </div>
              <h2
                className="text-2xl font-bold"
                style={{ color: "var(--w-color)" }}
              >
                Email Verified!
              </h2>
              <p className="text-base" style={{ color: "var(--g-color)" }}>
                Redirecting you to login...
              </p>
            </div>
          )}
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

export default EmailVerification;
