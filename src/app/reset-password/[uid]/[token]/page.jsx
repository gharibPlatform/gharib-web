"use client";
import ResetPassword from "../../../../components/common/password reset/ResetPassword";

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
          className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-20"
          style={{
            background:
              "radial-gradient(circle, var(--bright-b-color) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
          style={{
            background:
              "radial-gradient(circle, var(--o-color) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-lg px-4">
        <ResetPassword />
      </div>
    </div>
  );
};

export default Page;
