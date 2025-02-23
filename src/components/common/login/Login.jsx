import { useState } from 'react';
import { login } from '@/utils/userAuth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let loginData;

  const handleSubmit = (event) => {
    event.preventDefault();

    loginData = {username: username, password: password}
    login(loginData)
    .then(response => {
        console.log('Login successful:', response);
    })
    .catch(error => {
        console.error('Login failed:', error);
    });
  };

  const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:3000/accounts/google/callback/&prompt=consent&response_type=code&client_id=893732143405-24b807n9p999r0qs3adsk3obnvdbqbsn.apps.googleusercontent.com&scope=openid%20email%20profile&access_type=offline"
  return (
    <div className='flex flex-col items-center bg-[var(--dark-color)] w-min justify-center py-4 px-8 rounded-md'>
      <h2 className='text-[var(--w-color)] text-3xl pb-8 pt-4'>Login</h2>
      
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <input onChange={(e) => setUsername(e.target.value)} style={{width : "380px"}} className='px-4 py-2 bg-[var(--secondary-color)] text-xl text-[var(--w-color)] placeholder-[var(--g-color)] rounded-sm border border-[var(--main-color-hover)]' type="text" placeholder='Username' required/>
          <input onChange={(e) => setPassword(e.target.value)} style={{width : "380px"}} className='px-4 py-2 bg-[var(--secondary-color)] text-xl text-[var(--w-color)] placeholder-[var(--g-color)] rounded-sm border border-[var(--main-color-hover)]' type="password" placeholder='Password' required/>
          <a href='forgot-password' className='flex items-center justify-center text-[var(--b-color)]'>Forgot Password?</a>
          <button style={{width : "380px", borderRadius: "6px"}} className='px-4 py-2 bg-[var(--o-color)] text-xl text-[var(--w-color)] placeholder-[var(--g-color)] mb-2'>Login</button>
        </form>

      <p className='text-[var(--w-color)]'>Don't have an account? <a className='text-[var(--b-color)]' href="signup">Signup</a></p>

      <div className='flex items-center gap-8 w-full'>
        <div style={{height: "1px"}} className='w-1/2 bg-[var(--main-color-hover)]'></div>
        <p className='text-[var(--w-color)] text-xl'>Or</p>
        <div style={{height: "1px"}} className='w-1/2 bg-[var(--main-color-hover)]'></div>
      </div>
      
      <a href={googleAuthUrl}>
        <div style={{width : "380px"}} className='mt-2 mb-2 px-4 py-2 bg-[var(--secondary-color)] items-center flex text-xl text-[var(--w-color)] rounded-sm border border-[var(--main-color-hover)]'>
        <svg className='w-6 h-6' viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"></path><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"></path><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"></path><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"></path></g></svg>
          <p className='ml-auto mr-auto text-[var(--g-color)]'>Login with Google</p>
        </div>
        
      </a>
      
    </div>
  );
};

export default Login;
