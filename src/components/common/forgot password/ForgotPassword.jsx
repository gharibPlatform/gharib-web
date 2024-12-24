import { useState } from 'react';
import { resetPassword } from "../../../utils/userAuth"

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const forgotPasswordData = { email: email }
    resetPassword(forgotPasswordData)
    .then(response => {
        console.log('Email has been sent successuly:', response);
    })
    .catch(error => {
        console.error('Email has not been sent:', error);
    });
  };
  
  return (
    <div className='flex flex-col items-center bg-[var(--dark-color)] w-min justify-center py-4 px-8 rounded-md'>
      <h2 className='text-[var(--w-color)] text-3xl pb-8 pt-4'>Forgot Password</h2>
      
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <input style={{width : "380px"}} className='px-4 py-2 bg-[var(--secondary-color)] text-xl text-[var(--w-color)] placeholder-[var(--g-color)] rounded-sm border border-[var(--main-color-hover)]' type="email" placeholder='Please enter your email adress' required
          value={email} onChange={(e) => setEmail(e.target.value)}/>
          <p className='flex items-center justify-center text-[var(--w-color)] text-center'>A verification will be sent to your email to rest your password</p>
          <button style={{width : "380px", borderRadius: "6px"}} className='px-4 bg-[var(--o-color)] text-xl text-[var(--w-color)] placeholder-[var(--g-color)] py-2 mb-8'>Send Verifivation</button>
        </form>
      
    </div>
  );
};

export default ForgotPassword;
