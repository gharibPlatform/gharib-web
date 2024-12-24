'use client';

import { useEffect, useState } from 'react';
import { googleAuthPost } from "@/utils/api"

export default function GoogleCallback() {
  const [loading, setLoading] = useState(true);
  const [tokens, setTokens] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search); 
    const code = queryParams.get('code'); 
    const decodedString = decodeURIComponent(code);
    const codeObject = {'code' : decodedString}
    const dataJSON = JSON.stringify(codeObject)

    if (decodedString) {

      googleAuthPost(codeObject)
        .then((data) => {
          console.log('Tokens received:', data);
          setTokens(data); 
          setLoading(false); 
        })
        .catch((error) => {
          console.error('Error exchanging code:', error);
          setError('Failed to exchange code. Please try again.');
          setLoading(false);
        });
      console.log("the code is : ", code)
      console.log("the decodeed code is : ", decodedString)
    }
  }, [window.location.search]);

  if (loading) {
    return <div className='flex items-center justify-center h-screen text-[var(--w-color)]'>Loading...</div>;
  }

  if (error) {
    return <div className='flex items-center justify-center h-screen text-[var(--w-color)]'>{error}</div>;
  }

  return (
    <div>
      <h2>Authentication Successful</h2>
      <p>Access Token: {tokens?.access_token}</p>
      <p>Refresh Token: {tokens?.refresh_token}</p>
    </div>
  );
}
