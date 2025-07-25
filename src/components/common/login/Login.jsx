import { useState } from 'react';
import { login } from '../../../utils/userAuth';
import { useRouter } from 'next/navigation';
import useUserStore from '@/stores/user';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { setUser } = useUserStore();

  const handleSubmit = (event) => {
    event.preventDefault();

    const loginData = { username: username, password: password };
    
    login(loginData)
      .then(response => {
        router.push('/chat');
        console.log("user : ", response.user)
        setUser(response.user);
      })
      .catch(error => {
        console.error('Login failed:', error);
        
        if (error.response?.data?.non_field_errors) {
          // Handle general authentication errors
          setError(error.response.data.non_field_errors[0]);
        } else if (error.response?.data?.detail) {
          // Handle other API errors
          setError(error.response.data.detail);
        } else {
          // Generic error message
          setError('Login failed. Please try again.');
        }
        
        // Clear error after 5 seconds
        setTimeout(() => {
          setError('');
        }, 5000);
      });
  };

  const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:3000/accounts/google/callback/&prompt=consent&response_type=code&client_id=893732143405-24b807n9p999r0qs3adsk3obnvdbqbsn.apps.googleusercontent.com&scope=openid%20email%20profile&access_type=offline";

  return (
    <div className='flex flex-col items-center bg-[var(--dark-color)] w-min justify-center py-4 px-8 rounded-md'>
      <h2 className='text-[var(--w-color)] text-3xl pb-8 pt-4'>Login</h2>
      
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input 
          onChange={(e) => setUsername(e.target.value)} 
          style={{width: "380px"}} 
          className='px-4 py-2 bg-[var(--secondary-color)] text-xl text-[var(--w-color)] placeholder-[var(--g-color)] rounded-sm border border-[var(--main-color-hover)]' 
          type="text" 
          placeholder='Username' 
          required
        />
        <input 
          onChange={(e) => setPassword(e.target.value)} 
          style={{width: "380px"}} 
          className='px-4 py-2 bg-[var(--secondary-color)] text-xl text-[var(--w-color)] placeholder-[var(--g-color)] rounded-sm border border-[var(--main-color-hover)]' 
          type="password" 
          placeholder='Password' 
          required
        />
        
        {error && (
          <div className='text-[var(--bright-r-color)] flex items-center justify-center'>
            {error}
          </div>
        )}
        
        <a href='forgot-password' className='flex items-center justify-center text-[var(--b-color)]'>
          Forgot Password?
        </a>
        
        <button 
          style={{width: "380px", borderRadius: "6px"}} 
          className='px-4 py-2 bg-[var(--o-color)] text-xl text-[var(--w-color)] placeholder-[var(--g-color)] mb-2'
        >
          Login
        </button>
      </form>

      <p className='text-[var(--w-color)]'>Don't have an account? <a className='text-[var(--b-color)]' href="signup">Signup</a></p>

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

export default Login;