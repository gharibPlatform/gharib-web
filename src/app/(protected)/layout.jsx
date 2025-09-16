"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isTokenExpired, refreshToken } from "../../utils/userAuth"

export default function ProtectedLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        router.replace("/login");
        return;
      }

      if (isTokenExpired(token)) {
        const ok = await refreshToken();
        if (!ok) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          router.replace("/login");
          return;
        }
      }

      setLoading(false);
    };

    verifyToken();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}