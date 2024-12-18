import { useState } from 'react';
import { registerUser } from "../../../utils/auth"
const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  let loginData;

  const handleSubmit = (event) => {
    event.preventDefault();

    loginData = {username: username, email: email, password1: password1, password2: password2}
    registerUser(loginData)
    .then(response => {
        console.log('Login successful:', response);
    })
    .catch(error => {
        console.error('Login failed:', error);
    });
  };

  return (
    <div className='flex flex-col items-center bg-[var(--dark-color)] w-min justify-center py-4 px-8 rounded-md'>
      <h2 className='text-[var(--w-color)] text-3xl pb-8 pt-4'>Forgot Password</h2>
      
      <div className='flex flex-col gap-4' >
        <input style={{width : "380px"}} className='px-4 py-2 bg-[var(--secondary-color)] text-xl text-[var(--w-color)] placeholder-[var(--g-color)] rounded-sm border border-[var(--main-color-hover)]' type="email" placeholder='Please enter your email adress' required/>
        <p className='flex items-center justify-center text-[var(--w-color)] text-center'>A verification will be sent to your email to rest your password</p>
        <button style={{width : "380px", borderRadius: "6px"}} className='px-4 py-2 bg-[var(--o-color)] text-xl text-[var(--w-color)] placeholder-[var(--g-color)] py-2 mb-8'>Send Verifivation</button>
      </div>
      
    </div>
  );
};

export default ForgotPassword;
