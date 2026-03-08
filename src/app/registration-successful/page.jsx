"use client";
import RegistrationSuccessful from "../../components/common/registration successful/RegistrationSuccessful";

const Page = () => {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: "var(--secondary-color)",
        fontFamily: "var(--font-cairo)",
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-20"
          style={{
            background:
              "radial-gradient(circle, var(--o-color) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--w-color) 1px, transparent 1px), linear-gradient(90deg, var(--w-color) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-lg px-4">
        <RegistrationSuccessful />
      </div>
    </div>
  );
};

export default Page;
