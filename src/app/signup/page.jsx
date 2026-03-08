"use client";

import Signup from "../../components/common/signup/Signup";

const Page = () => {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: "var(--secondary-color)",
        fontFamily: "var(--font-cairo)",
      }}
    >
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--w-color) 1px, transparent 1px),
                            linear-gradient(90deg, var(--w-color) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient Glow Effects */}
      <div
        className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--bright-b-color) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--o-color) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-lg px-4">
        <Signup />
      </div>
    </div>
  );
};

export default Page;
