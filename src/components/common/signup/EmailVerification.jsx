import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { verifyEmail } from '../../../utils/userAuth';

const EmailVerification = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  
  // Extract and decode key from URL
  const encodedKey = params?.id;
  const decodedKey = encodedKey ? decodeURIComponent(encodedKey) : null;

  // Verify email on component mount
  useEffect(() => {
    if (!decodedKey) {
        setError('Missing verification key');
        setLoading(false);
        return;
    }
    
    const verify = async () => {
        try {
            console.log('Decoded verification key:', decodedKey);
            
            // Send the properly decoded key to your backend
            await verifyEmail({ key: decodedKey });
            setSuccess(true);
            console.log('Email verification successful');
            
            setTimeout(() => {
              router.push("/login");
            }, 3000);

        } catch (error) {
            console.error('Email verification failed:', error);

            let errorMessage = 'Email verification failed. Please try again.';
            
            if (error.response?.data?.detail) {
              errorMessage = error.response.data.detail;
            } else if (error.response?.status === 404) {
              errorMessage = 'Invalid or expired verification link.';
            } else if (error.message) {
              errorMessage = error.message;
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    verify();
  }, [decodedKey, router]);

  return (
    <div className='flex flex-col items-center bg-[var(--dark-color)] justify-center py-4 px-8 rounded-md'>
      <h2 className='text-[var(--w-color)] text-3xl pb-8 pt-4'>Email Verification</h2>

      <div className='flex flex-col gap-4 items-center justify-center w-full'>
        {loading && (
          <div className='flex items-center justify-center text-[var(--w-color)]'>
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Verifying your email...
          </div>
        )}
        
        {error && (
          <div className='text-center'>
            <p className='text-[var(--bright-r-color)] mb-4 max-w-md'>
              {error}
            </p>
            <a 
              href="/signup" 
              className='text-[var(--b-color)] underline hover:text-[var(--b-color-hover)]'
            >
              Sign up again
            </a>
          </div>
        )}
        
        {success && (
          <div className="text-center">
            <div className="checkmark-container px-32  mb-4 flex ">
              <svg 
                className="checkmark animate-draw" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 52 52"
                width="64"
                height="64"
              >
                <circle 
                  className="checkmark-circle" 
                  cx="26" 
                  cy="26" 
                  r="25" 
                  fill="none"
                  stroke="var(--o-color)"
                  strokeWidth="2"
                />
                <path 
                  className="checkmark-check" 
                  fill="none"
                  stroke="var(--o-color)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
              </svg>
            </div>
            <p className='text-[var(--o-color)] text-xl'>
              Email verified successfully!
            </p>
            <p className='text-[var(--w-color)] mt-2'>
              Redirecting to login...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;