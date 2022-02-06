import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential
} from 'firebase/auth';
import {
  collection,
  CollectionReference,
  doc,
  getDocs,
  setDoc,
  query,
  where
} from 'firebase/firestore';

import { auth, db } from '../services/firebase';

import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === '' || password === '') {
      alert('Invalid credentials');
      setPassword('');
      setConfirmPassword('');
      return;
    }
    try {
      const user: UserCredential | undefined
        = await signInWithEmailAndPassword(auth, email, password);
      navigate('../rps');
    } catch (err) {
      alert('Unable to login. Invalid credentials');
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  }

  const onCreateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const regex = /^([a-z])+([0-9a-z]*)$/i;
    if (email === '' || username === '' || !username.match(regex) ||
      password === '' || confirmPassword === '' ||
      password !== confirmPassword) {
      alert('Invalid credentials');
      setPassword('');
      setConfirmPassword('');
      return;
    }
    try {
      const UsersRef: CollectionReference = collection(db, 'Users');
      const q = query(UsersRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty !== true) {
        alert('Invalid username');
        setPassword('');
        setConfirmPassword('');
        return;
      }
      const user: UserCredential | undefined
        = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "Users", auth.currentUser!.uid), {
        username: username,
        wins: 0,
      });
      navigate('../rps');
    } catch (err) {
      alert('Unable to create Account');
      setPassword('');
      setConfirmPassword('');
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  }

  return (
    <div className='login'>
      <div className='login-header'>
        <h2>{'Login/Create an Account'}</h2>
      </div>
      <form className='login-form' onSubmit={onLogin}>
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
          {'Password: '}
          <input
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input type='submit' value='Login' />
      </form>
      <form className='login-form' onSubmit={onCreateAccount}>
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
        <input type='submit' value='Create Account' />
      </form>
      <button onClick={() => { navigate('../rps') }}>
        {'Continue as Guest'}
      </button>
    </div>
  );
}

export default Login;
