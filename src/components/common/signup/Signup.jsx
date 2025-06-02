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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSuccess(false);

    if (password1 !== password2) {
      setError("Passwords do not match");
      setTimeout(() => setError(''), 3000);
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

      return(
        <div className='flex flex-col items-center bg-[var(--dark-color)] w-min justify-center py-4 px-8 rounded-md'>
          Sign up success. A verification link has been sent to your email please check your inbox.
        </div>
      )
      
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
      
      setTimeout(() => setError(''), 5000);
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
    <div className='flex flex-col items-center bg-[var(--dark-color)] w-min justify-center py-4 px-8 rounded-md'>
      <h2 className='text-[var(--w-color)] text-3xl pb-8 pt-4'>Signup</h2>

      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input 
          style={{width: "380px"}} 
          className='px-4 py-2 bg-[var(--secondary-color)] text-xl text-[var(--w-color)] placeholder-[var(--g-color)] rounded-sm border border-[var(--main-color-hover)]' 
          type="text"
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder='Username' 
          required
        />

        <input 
          style={{width: "380px"}} 
          className='px-4 py-2 bg-[var(--secondary-color)] text-xl text-[var(--w-color)] placeholder-[var(--g-color)] rounded-sm border border-[var(--main-color-hover)]' 
          type="email"
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder='Email' 
          required
        />

        <input 
          style={{width: "380px"}} 
          className='px-4 py-2 bg-[var(--secondary-color)] text-xl text-[var(--w-color)] placeholder-[var(--g-color)] rounded-sm border border-[var(--main-color-hover)]' 
          type="password"
          value={password1} 
          onChange={(e) => setPassword1(e.target.value)} 
          placeholder='Create Password' 
          required
        />

        <input 
          style={{width: "380px"}} 
          className='px-4 py-2 bg-[var(--secondary-color)] text-xl text-[var(--w-color)] placeholder-[var(--g-color)] rounded-sm border border-[var(--main-color-hover)]' 
          type="password"
          value={password2} 
          onChange={(e) => setPassword2(e.target.value)} 
          placeholder='Confirm Password' 
          required
        />
        
        {error && (
          <div className='text-[var(--bright-r-color)] flex flex-col items-center justify-center'>
            <p>{error}</p>
            {isEmailNotVerifiedError && (
              <div className="flex flex-col items-center mt-1">
                <button 
                  type="button"
                  onClick={handleResendEmail}
                  disabled={resendStatus.loading}
                  className="text-[var(--b-color)] underline hover:text-[var(--b-color-hover)] disabled:opacity-50"
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
                  <p className="text-[var(--bright-g-color)] mt-1">
                    Verification email sent successfully!
                  </p>
                )}
                {resendStatus.error && (
                  <p className="text-[var(--bright-r-color)] mt-1">
                    {resendStatus.error}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
        
        <button 
          style={{width: "380px", borderRadius: "6px"}} 
          className={`px-4 bg-[var(--o-color)] text-xl text-[var(--w-color)] placeholder-[var(--g-color)] py-2 mb-2 flex items-center justify-center ${isLoading ? 'opacity-75' : ''}`}
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

      <p className='text-[var(--w-color)]'>Already have an account? <a className='text-[var(--b-color)]' href="login">Login</a></p>

      <div className='flex items-center gap-8 w-full'>
        <div style={{height: "1px"}} className='w-1/2 bg-[var(--main-color-hover)]'></div>
        <p className='text-[var(--w-color)] text-xl'>Or</p>
        <div style={{height: "1px"}} className='w-1/2 bg-[var(--main-color-hover)]'></div>
      </div>
      
      <a href={googleAuthUrl}>
        <div style={{width: "380px"}} className='mt-2 mb-2 px-4 py-2 bg-[var(--secondary-color)] items-center flex text-xl text-[var(--w-color)] rounded-sm border border-[var(--main-color-hover)]'>
          <svg className='w-6 h-6' viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" fill="#000000">
            {/* Google logo SVG remains the same */}
          </svg>
          <p className='ml-auto mr-auto text-[var(--g-color)]'>Login with Google</p>
        </div>
      </a>
    </div>
  );
};

export default Signup;