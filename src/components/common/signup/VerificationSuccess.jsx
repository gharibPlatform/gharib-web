import { useState } from 'react';

const VerificationSuccess = ({ email, onResend, onBackToSignup }) => {
  const [resendStatus, setResendStatus] = useState({ 
    loading: false, 
    success: false, 
    error: null 
  });

  const handleResendEmail = async () => {
    if (!email) return;
    
    setResendStatus({ loading: true, success: false, error: null });
    
    try {
      await onResend({ email });
      setResendStatus({ loading: false, success: true, error: null });
      setTimeout(() => {
        setResendStatus(prev => ({ ...prev, success: false }));
      }, 5000);
    } catch (error) {
      console.error('Failed to resend verification email:', error);
      setResendStatus({
        loading: false,
        success: false,
        error: error.response?.data?.message || 'Failed to resend verification email'
      });
      setTimeout(() => {
        setResendStatus(prev => ({ ...prev, error: null }));
      }, 5000);
    }
  };

  return (
    <div className='flex flex-col items-center bg-[var(--dark-color)] justify-center py-4 px-8 rounded-md'>
      <h2 className='text-[var(--w-color)] text-3xl pb-8 pt-4'>Verify Your Email</h2>
      
      <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-center">
        A verification link has been sent to <strong>{email}</strong>. Please check your inbox.
      </div>
      
      <p className='text-[var(--w-color)] mb-4 text-center'>
        Didn't receive the email? Check your spam folder or click below to resend.
      </p>

      <div className="flex flex-col items-center mt-1 w-full">
        <button 
          type="button"
          onClick={handleResendEmail}
          disabled={resendStatus.loading}
          className={`px-4 py-2 bg-[var(--o-color)] text-xl text-[var(--w-color)] rounded-[6px] mb-4 w-full flex items-center justify-center ${resendStatus.loading ? 'opacity-75' : ''}`}
        >
          {resendStatus.loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : 'Resend Verification Email'}
        </button>
        
        {resendStatus.success && (
          <p className="text-[var(--o-color)] mb-4">
            Verification email sent successfully!
          </p>
        )}
        {resendStatus.error && (
          <p className="text-[var(--bright-r-color)] mb-4">
            {resendStatus.error}
          </p>
        )}
      </div>

      <button 
        onClick={onBackToSignup}
        className="text-[var(--b-color)] underline hover:text-[var(--b-color-hover)]"
      >
        Back to Sign Up
      </button>
    </div>
  );
};

export default VerificationSuccess;