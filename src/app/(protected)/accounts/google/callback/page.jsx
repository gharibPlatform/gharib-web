"use client";

import { useEffect, useState } from "react";
import { googleAuthPost } from "../../../../../utils/apiUser";
import { useRouter } from "next/navigation";

export default function GoogleCallback() {
  const [loading, setLoading] = useState(true);
  const [tokens, setTokens] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    const decodedString = decodeURIComponent(code);
    const codeObject = { code: decodedString };

    if (decodedString) {
      googleAuthPost(codeObject)
        .then((data) => {
          setTokens(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error exchanging code:", error?.response);
          setError(error?.response?.data?.non_field_errors);
          setLoading(false);
        });
    }
  }, [window.location.search]);

  if (tokens) {
    const router = useRouter();
    setTimeout(() => {
      router.push("/home");
    }, 3000);
  } else {
    const router = useRouter();
    setTimeout(() => {
      router.push("/signup");
    }, 5000);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-[var(--w-color)]">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col  items-center justify-center h-screen text-[var(--w-color)]">
        <p>{error}</p>
        <p> redirecting ...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen text-[var(--w-color)] text-center">
      Authentification success <br /> you'll be redirected to the home page
    </div>
  );
}
