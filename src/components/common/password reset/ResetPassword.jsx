import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { resetPasswordConfirm } from '../../../utils/userAuth';

const ResetPassword = () => {
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validLink, setValidLink] = useState(true); 
  const router = useRouter();
  const params = useParams();
  
  // Extract uid and token from URL
  const uid = params?.uid;
  const token = params?.token;

  // Validate the link structure on component mount
  useEffect(() => {
    if (!uid || !token) {
      setValidLink(false);
      setError('Invalid password reset link');
    }
  }, [uid, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validLink) return;

    setError('');
    setSuccess(false);

    if (password1 !== password2) {
      setError("Passwords do not match");
      setTimeout(() => setError(''), 3000);
      return;
    }

    if (password1.length < 8) {
      setError("Password must be at least 8 characters");
      setTimeout(() => setError(''), 3000);
      return;
    }

    setLoading(true);

    try {
      const resetPasswordData = {
        new_password1: password1, 
        new_password2: password2, 
        uid: uid, 
        token: token
      };

      await resetPasswordConfirm(resetPasswordData);
      
      setSuccess(true);
      console.log('Password reset successful');
      
      setTimeout(() => {
        router.push("/login");
      }, 3000);

    } catch (error) {
      console.error('Password reset failed:', error);

      let errorMessage = 'Password reset failed. Please try again.';
      
      if (error.response?.data?.password1?.[0]) {
        errorMessage = error.response.data.password1[0];
      } else if (error.response?.data?.non_field_errors?.[0]) {
        errorMessage = error.response.data.non_field_errors[0];
      } else if (error.response?.status === 400) {
        errorMessage = 'Invalid or expired reset link. Please request a new password reset.';
        setValidLink(false);
      } else if (error.message) {
        errorMessage = error.message;
      }

      setError(errorMessage);
      setTimeout(() => setError(''), 5000);

    } finally {
      setLoading(false);
    }
  };

  if (!validLink) {
    return (
      <div className='flex flex-col items-center bg-[var(--dark-color)]  justify-center py-4 px-8 rounded-md'>
        <h2 className='text-[var(--w-color)] text-3xl pb-8 pt-4'>Invalid Link</h2>
        <p className='text-[var(--bright-r-color)] mb-4 max-w-md text-center'>
          {error || 'This password reset link is invalid or has expired.'}
        </p>
        <a 
          href="/forgot-password" 
          className='text-[var(--b-color)] underline hover:text-[var(--b-color-hover)]'
        >
          Request a new password reset
        </a>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center bg-[var(--dark-color)] w-min justify-center py-4 px-8 rounded-md'>
      <h2 className='text-[var(--w-color)] text-3xl pb-8 pt-4'>Reset Password</h2>

      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input 
          style={{width: "380px"}} 
          className='px-4 py-2 bg-[var(--secondary-color)] text-xl text-[var(--w-color)] placeholder-[var(--g-color)] rounded-sm border border-[var(--main-color-hover)]' 
          type="password"
          value={password1} 
          onChange={(e) => setPassword1(e.target.value)} 
          placeholder='Create your new password' 
          required
        />

        <input 
          style={{width: "380px"}} 
          className='px-4 py-2 bg-[var(--secondary-color)] text-xl text-[var(--w-color)] placeholder-[var(--g-color)] rounded-sm border border-[var(--main-color-hover)]' 
          type="password"
          value={password2} 
          onChange={(e) => setPassword2(e.target.value)} 
          placeholder='Confirm your new password' 
          required
        />
        
        {error && (
          <p className='text-[var(--bright-r-color)] flex items-center justify-center'>
            {error}
          </p>
        )}
        
        {success && (
          <p className='text-[var(--o-color)] flex items-center justify-center'>
            Password reset successfully! Redirecting to login...
          </p>
        )}

        <button 
          style={{width: "380px", borderRadius: "6px"}} 
          className={`px-4 bg-[var(--o-color)] text-xl text-[var(--w-color)] placeholder-[var(--g-color)] py-2 mb-2 flex items-center justify-center ${
            loading ? 'opacity-75' : ''
          }`}
          disabled={loading || !validLink}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Reset Password'
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;