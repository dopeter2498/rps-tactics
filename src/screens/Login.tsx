import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';
import {
  collection,
  CollectionReference,
  doc,
  getDocs,
  setDoc,
  query,
  where,
} from 'firebase/firestore';

import { auth, db } from '../services/firebase';
import { useUserContext } from '../components/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const userContext = useUserContext();
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
      const user: UserCredential | undefined = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = user.user.uid;
      const UsersRef = collection(db, 'Users');
      const q = query(UsersRef, where('__name__', '==', uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        userContext.username = doc.data().username;
      });
      userContext.user = user.user;
      navigate('../user');
    } catch (err) {
      alert('Unable to login. Invalid credentials');
      setPassword('');
      setConfirmPassword('');
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  };

  const onCreateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const regex = /^([a-z])+([0-9a-z]*)$/i;
    if (
      email === '' ||
      username === '' ||
      !username.match(regex) ||
      password === '' ||
      confirmPassword === '' ||
      password !== confirmPassword
    ) {
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
      const user: UserCredential | undefined =
        await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'Users', auth.currentUser!.uid), {
        username: username,
        wins: 0,
      });
      userContext.user = user.user;
      navigate('../user');
    } catch (err) {
      alert('Unable to create Account');
      setPassword('');
      setConfirmPassword('');
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  };

  return (
    <div className='Login-body'>
      <Container component='main' maxWidth='md'>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 8,
          }}
        >
          <Typography
            component='h1'
            variant='h5'
            style={{
              fontWeight: 'bold',
              whiteSpace: 'pre-line',
              textAlign: 'center',
            }}
          >
            {'RPS Tactics'}
          </Typography>
          <Box
            sx={{
              flexDirection: 'row',
              mt: 5,
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography component='h1' variant='h6'>
                  {'Create an Account'}
                </Typography>
                <Box component='form' onSubmit={onCreateAccount} sx={{ mt: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label='Email'
                        autoComplete='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label='Password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete='new-password'
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label='Confim Password'
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ my: 2 }}
                  >
                    {'Create Account'}
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} style={{ alignSelf: 'center' }}>
                <Typography component='h1' variant='h6'>
                  {'Login'}
                </Typography>
                <Box component='form' onSubmit={onLogin} sx={{ mt: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label='Email'
                        autoComplete='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label='Password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete='new-password'
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ my: 2 }}
                  >
                    {'Login'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Link component='button' onClick={() => navigate('../guest')}>
            <Typography style={{ cursor: 'pointer' }}>
              {'Continue as Guest'}
            </Typography>
          </Link>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
