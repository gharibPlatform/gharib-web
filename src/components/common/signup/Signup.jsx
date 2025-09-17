import { useState } from 'react';
import { registerUser, resendEmailVerification } from "../../../utils/userAuth";
import { useRouter } from 'next/navigation';
import VerificationSuccess from './VerificationSuccess';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const [resendStatus, setResendStatus] = useState({ 
    loading: false, 
    success: false, 
    error: null 
  });

  // Clear error when any input is focused
  const handleInputFocus = () => {
    setError('');
    setResendStatus(prev => ({ ...prev, error: null, success: false }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSuccess(false);

    if (password1 !== password2) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const signupData = {
        username: username, 
        email: email, 
        password1: password1, 
        password2: password2
      };

      const response = await registerUser(signupData);
      setIsSuccess(true);
      console.log('Signup successful:', response);
      
    } catch (error) {
      console.error('Signup failed:', error);
      
      if (error.response?.data?.username?.[0]) {
        setError(error.response.data.username[0]);
      } else if (error.response?.data?.email?.[0]) {
        setError(error.response.data.email[0]);
      } else if (error.response?.data?.password1?.[0]) {
        setError(error.response.data.password1[0]);
      } else if (error.response?.data?.non_field_errors?.[0]) {
        setError(error.response.data.non_field_errors[0]);
      } else {
        setError('Signup failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    if (!email) return;
    
    setResendStatus({ loading: true, success: false, error: null });
    
    try {
      await resendEmailVerification({ email });
      setResendStatus({ loading: false, success: true, error: null });
    } catch (error) {
      console.error('Failed to resend verification email:', error);
      setResendStatus({
        loading: false,
        success: false,
        error: error.response?.data?.message || 'Failed to resend verification email'
      });
    }
  };

  const handleBackToSignup = () => {
    setIsSuccess(false);
    setEmail('');
    setUsername('');
    setPassword1('');
    setPassword2('');
  };

  if (isSuccess) {
    return (
      <VerificationSuccess 
        email={email}
        onResend={handleResendEmail}
        onBackToSignup={handleBackToSignup}
      />
    );
  }

  const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:3000/accounts/google/callback/&prompt=consent&response_type=code&client_id=893732143405-24b807n9p999r0qs3adsk3obnvdbqbsn.apps.googleusercontent.com&scope=openid%20email%20profile&access_type=offline";
  
  const isEmailNotVerifiedError = error === "This email is already registered but not verified. Please check your email for verification instructions.";

  return (
    <div className='flex flex-col items-center bg-[var(--dark-color)] w-full max-w-md mx-auto justify-center py-6 px-4 sm:px-8 rounded-md'>
      <h2 className='text-[var(--w-color)] text-2xl sm:text-3xl pb-6 sm:pb-8 pt-4'>Signup</h2>

      <form className='flex flex-col gap-4 w-full' onSubmit={handleSubmit}>
        <input 
          className='w-full px-4 py-2 bg-[var(--secondary-color)] text-lg sm:text-xl text-[var(--w-color)] placeholder-[var(--g-color)] rounded-sm border border-[var(--main-color-hover)]' 
          type="text"
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          onFocus={handleInputFocus}
          placeholder='Username' 
          required
        />

        <input 
          className='w-full px-4 py-2 bg-[var(--secondary-color)] text-lg sm:text-xl text-[var(--w-color)] placeholder-[var(--g-color)] rounded-sm border border-[var(--main-color-hover)]' 
          type="email"
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          onFocus={handleInputFocus}
          placeholder='Email' 
          required
        />

        <input 
          className='w-full px-4 py-2 bg-[var(--secondary-color)] text-lg sm:text-xl text-[var(--w-color)] placeholder-[var(--g-color)] rounded-sm border border-[var(--main-color-hover)]' 
          type="password"
          value={password1} 
          onChange={(e) => setPassword1(e.target.value)} 
          onFocus={handleInputFocus}
          placeholder='Create Password' 
          required
        />

        <input 
          className='w-full px-4 py-2 bg-[var(--secondary-color)] text-lg sm:text-xl text-[var(--w-color)] placeholder-[var(--g-color)] rounded-sm border border-[var(--main-color-hover)]' 
          type="password"
          value={password2} 
          onChange={(e) => setPassword2(e.target.value)} 
          onFocus={handleInputFocus}
          placeholder='Confirm Password' 
          required
        />
        
        {error && (
          <div className='text-[var(--bright-r-color)] flex flex-col items-center justify-center text-sm sm:text-base px-2'>
            <p className="text-center">{error}</p>
            {isEmailNotVerifiedError && (
              <div className="flex flex-col items-center mt-1">
                <button 
                  type="button"
                  onClick={handleResendEmail}
                  disabled={resendStatus.loading}
                  className="text-[var(--b-color)] underline hover:text-[var(--b-color-hover)] disabled:opacity-50 text-sm"
                >
                  {resendStatus.loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : 'Resend verification email'}
                </button>
                {resendStatus.success && (
                  <p className="text-[var(--o-color)] mt-1 text-sm text-center">
                    Verification email sent successfully!
                  </p>
                )}
                {resendStatus.error && (
                  <p className="text-[var(--bright-r-color)] mt-1 text-sm text-center">
                    {resendStatus.error}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
        
        <button 
          className={`w-full px-4 bg-[var(--o-color)] text-lg sm:text-xl text-[var(--w-color)] placeholder-[var(--g-color)] py-2 mb-2 flex items-center justify-center rounded-md ${isLoading ? 'opacity-75' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing up...
            </>
          ) : 'Signup'}
        </button>
      </form>

      <p className='text-[var(--w-color)] text-sm sm:text-base'>
        Already have an account? {' '}
        <a className='text-[var(--b-color)]' href="login">Login</a>
      </p>

      <div className='flex items-center gap-4 sm:gap-8 w-full my-4'>
        <div style={{height: "1px"}} className='flex-1 bg-[var(--main-color-hover)]'></div>
        <p className='text-[var(--w-color)] text-lg sm:text-xl'>Or</p>
        <div style={{height: "1px"}} className='flex-1 bg-[var(--main-color-hover)]'></div>
      </div>
      
      <a href={googleAuthUrl} className="w-full">
        <div className='w-full px-4 py-2 bg-[var(--secondary-color)] items-center flex text-lg sm:text-xl text-[var(--w-color)] rounded-sm border border-[var(--main-color-hover)]'>
          <svg className='w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0' viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" fill="#000000">
            <g>
              <path
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                fill="#4285F4"
              />
              <path
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                fill="#34A853"
              />
              <path
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                fill="#FBBC05"
              />
              <path
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                fill="#EB4335"
              />
            </g>
          </svg>
          <p className='flex-1 text-center text-[var(--g-color)] ml-2'>
            Login with Google
          </p>
        </div>
      </a>
    </div>
  );
};

export default Signup;