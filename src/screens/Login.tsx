import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const onRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === '' || username === '' || password === '' ||
        confirmPassword === '' || password !== confirmPassword) {
      alert('Invalid credentials');
      setPassword('');
      setConfirmPassword('');
      return;
    }
  }

  return (
    <div className='login'>
      <form className='login-form' onSubmit={onRegister}>
        <label className='login-form-label'>
          {'Email: '}
          <input
            type='text'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className='login-form-label'>
          {'Username: '}
          <input
            type='text'
            name='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className='login-form-label'>
          {'Password: '}
          <input
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label className='login-form-label'>
          {'Confirm Password: '}
          <input
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <input type='submit' value='Register' />
      </form>
      <button onClick={() => {navigate('../guest')}}>
        {'Continue as Guest'}
      </button>
    </div>
  );
}

export default Login;
