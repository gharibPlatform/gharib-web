import { useState } from 'react';
import { registerUser } from "../../../utils/auth"
const Register = () => {
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
    <div>
      <h2>Signup</h2>
      <div >
        <input type="text" placeholder='Username' required/>
        <input type="email" placeholder='Email' required />
        <input type="password" placeholder='CreatePassword' />
        <input type="password" placeholder='ConfirmPassword' />
        <button>Signup</button>
      </div>

      <p>Alreay have and account? <a href="login">Login</a></p>

      <div>
        <div></div>
        <p>Or</p>
        <div></div>
      </div>
      
      <div>
        Login with Google
      </div>
      
    </div>
  );
};

export default Register;
