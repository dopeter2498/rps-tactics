import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Guest = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const onContinue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }
  return (
    <Container component='main' maxWidth='sm'>
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
            textAlign: 'center'
          }}
        >
          {'RPS Tactics'}
        </Typography>
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12}>
            <Typography component='h1' variant='h6'>
              {'Continue as Guest'}
            </Typography>
            <Box component='form' onSubmit={onContinue} sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label='Username'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ my: 2 }}
              >
                {'Continue'}
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Link
          component='button'
          onClick={() => navigate('../login')}
        >
          <Typography style={{ cursor: 'pointer' }}>
            {'Create an Account or Login'}
          </Typography>
        </Link>
      </Box>
    </Container>
  );
}

export default Guest;
