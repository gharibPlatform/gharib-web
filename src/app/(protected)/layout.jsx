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
    return <div className="p-6 text-center">Checking authentication...</div>;
  }

  return <>{children}</>;
}
