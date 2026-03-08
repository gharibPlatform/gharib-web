import { CheckCircle } from "lucide-react";

function RegistrationSuccessful() {
  return (
    <div className="w-full animate-fade-in-up text-center">
      {/* Logo */}
      <div className="text-center mb-8">
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
            "linear-gradient(135deg, rgba(220,153,8,0.2), rgba(255,255,255,0.05))",
        }}
      >
        <div
          className="rounded-3xl px-10 py-12 backdrop-blur-xl"
          style={{ backgroundColor: "rgba(10, 10, 10, 0.7)" }}
        >
          <div className="flex justify-center mb-6">
            <div
              className="p-4 rounded-full"
              style={{ backgroundColor: "rgba(220,153,8,0.1)" }}
            >
              <CheckCircle size={32} style={{ color: "var(--o-color)" }} />
            </div>
          </div>

          <h2
            className="text-2xl font-bold mb-8"
            style={{ color: "var(--w-color)" }}
          >
            Registration Successful
          </h2>

          <div className="mb-8 space-y-4">
            <p
              className="text-lg opacity-80"
              style={{ color: "var(--lighter-color)" }}
            >
              حديث رسول الله صلى الله عليه وسلم
            </p>
            <p
              className="text-xl font-arabic leading-relaxed"
              style={{ color: "var(--w-color)" }}
            >
              "بدأ الإسلام غريباً وسيعود غريباً كما بدأ، فطوبى للغرباء."
            </p>
            <p
              className="text-sm opacity-60"
              style={{ color: "var(--g-color)" }}
            >
              رواه مسلم.
            </p>
          </div>

          <div
            className="pt-6 border-t"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <p className="text-sm" style={{ color: "var(--g-color)" }}>
              You will be redirected shortly...
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
}

export default RegistrationSuccessful;
