"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ProtectedLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        router.replace("/login");
        return;
      }

      try {
        const res = await axios.post("http://localhost:8000/auth/token/verify/", {
          token
        });

        if (res.status === 200) {
          setLoading(false);
        } else {
          localStorage.removeItem("token");
          router.replace("/login");
        }
      } catch (err) {
        localStorage.removeItem("token");
        router.replace("/login");
      }
    };

    checkAuth();
  }, [router]);

  if (loading) return <div>Checking authentication...</div>;

  return <>{children}</>;
}
