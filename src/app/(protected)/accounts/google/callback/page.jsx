"use client";

import { useEffect, useState } from "react";
import { googleAuthPost } from "../../../../../utils/apiUser";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle, Loader } from "lucide-react";

export default function GoogleCallback() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("loading"); // 'loading', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const code = queryParams.get("code");

      if (!code) {
        setStatus("error");
        setErrorMessage("No authorization code found.");
        setLoading(false);
        return;
      }

      const decodedString = decodeURIComponent(code);
      const codeObject = { code: decodedString };

      try {
        await googleAuthPost(codeObject);
        setStatus("success");
        setLoading(false);
        // Redirect to home after 3 seconds
        setTimeout(() => {
          router.push("/home");
        }, 3000);
      } catch (error) {
        console.error("Error exchanging code:", error?.response);
        setStatus("error");
        setErrorMessage(
          error?.response?.data?.non_field_errors?.[0] ||
            "Authentication failed. Please try again.",
        );
        setLoading(false);
        // Redirect to signup after 5 seconds
        setTimeout(() => {
          router.push("/signup");
        }, 5000);
      }
    };

    handleAuth();
  }, [router]);

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundColor: "var(--secondary-color)",
        fontFamily: "var(--font-cairo)",
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-20"
          style={{
            background:
              "radial-gradient(circle, var(--o-color) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-10"
          style={{
            background:
              "radial-gradient(circle, var(--bright-b-color) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--w-color) 1px, transparent 1px),
                              linear-gradient(90deg, var(--w-color) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content Card */}
      <div className="relative z-10 w-full max-w-lg px-4 animate-fade-in-up">
        <div
          className="rounded-3xl p-[1px] shadow-2xl"
          style={{
            background:
              status === "error"
                ? "linear-gradient(135deg, rgba(255,76,76,0.2), rgba(255,255,255,0.05))"
                : "linear-gradient(135deg, rgba(220,153,8,0.2), rgba(255,255,255,0.05))",
          }}
        >
          <div
            className="rounded-3xl px-10 py-16 backdrop-blur-xl text-center"
            style={{ backgroundColor: "rgba(10, 10, 10, 0.7)" }}
          >
            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center gap-4">
                <Loader
                  size={40}
                  className="animate-spin"
                  style={{ color: "var(--o-color)" }}
                />
                <h2
                  className="text-2xl font-bold"
                  style={{ color: "var(--w-color)" }}
                >
                  Authenticating
                </h2>
                <p className="text-base" style={{ color: "var(--g-color)" }}>
                  Please wait while we verify your credentials...
                </p>
              </div>
            )}

            {/* Success State */}
            {!loading && status === "success" && (
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
                  Success!
                </h2>
                <p className="text-base" style={{ color: "var(--g-color)" }}>
                  Authentication successful. Redirecting to home...
                </p>
                <div className="mt-4 flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{
                        backgroundColor: "var(--o-color)",
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Error State */}
            {!loading && status === "error" && (
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
                  Authentication Failed
                </h2>
                <p className="text-sm max-w-xs" style={{ color: "#ff4c4c" }}>
                  {errorMessage}
                </p>
                <p className="text-xs mt-4" style={{ color: "var(--g-color)" }}>
                  Redirecting to sign up in a few seconds...
                </p>
              </div>
            )}
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
}
