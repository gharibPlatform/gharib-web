import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { resetPasswordConfirm } from '@/utils/userAuth';

const ResetPassword= () => {
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const userID = '';
  const accessToken = '';
  const router = useRouter()
  const params = useParams()
  const {uid, token} = params;
  
  let resetPasswordData;

  const handleSubmit = (event) => {
    event.preventDefault();

    resetPasswordData = {new_password1: password1, new_password2: password2, uid: userID, token: accessToken}

    if (password1 !== password2) {
      setError("Passwords do not match")
      
      setTimeout(() => {
        setError('');
      }, 3000);
      
      return;
    }

    resetPasswordConfirm(resetPasswordData)
    .then(response => {
        router.push("/login")
        console.log('reseting password successful:', response);
    })
    .catch(error => {
        console.error('Resting failed:', error);

        if (error.response?.data?.password1?.[0]) {
          setError(error.response.data.password1[0]);
        
          setTimeout(() => {
            setError('');
          }, 5000);
        
          return;
        }

        if (error.response?.data?.non_field_errors?.[0]) {
          setError(error.response.data.non_field_errors[0]);
        
          setTimeout(() => {
            setError('');
          }, 5000);
        
          return;
        }
        
    });

  };

  return (
    <div className='flex flex-col items-center bg-[var(--dark-color)] w-min justify-center py-4 px-8 rounded-md'>
      <h2 className='text-[var(--w-color)] text-3xl pb-8 pt-4'>Reset Password</h2>

        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <input style={{width : "380px"}} className='px-4 py-2 bg-[var(--secondary-color)] text-xl text-[var(--w-color)] placeholder-[var(--g-color)] rounded-sm border border-[var(--main-color-hover)]' type="password"
          value={password1} onChange={(e) => setPassword1(e.target.value)} placeholder='Create your new password' required/>

          <input style={{width : "380px"}} className='px-4 py-2 bg-[var(--secondary-color)] text-xl text-[var(--w-color)] placeholder-[var(--g-color)] rounded-sm border border-[var(--main-color-hover)]' type="password"
          value={password2} onChange={(e) => setPassword2(e.target.value)} placeholder='Confirm your new password' required/>
          {error ? <p className='text-[var(--bright-r-color)] flex items-center justify-center'>{error}</p> : <div/>}
          <button style={{width : "380px", borderRadius: "6px"}} className='px-4 bg-[var(--o-color)] text-xl text-[var(--w-color)] placeholder-[var(--g-color)] py-2 mb-2'>Reset</button>
        </form>
    
    </div>
  );
};

export default ResetPassword;
