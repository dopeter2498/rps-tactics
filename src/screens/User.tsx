import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import { useUserContext } from '../components/UserContext';
import { socket } from '../components/socket';

const User = () => {
  const userContext = useUserContext();
  const navigate = useNavigate();

  return (
    <Container maxWidth='md'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
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
        <Typography>
          {userContext.user !== undefined ? `User: ${userContext.username}`
            : `Guest: ${userContext.username}`}
        </Typography>
        <Button
          variant='contained'
          sx={{ my: 2 }}
          onClick={() => {
            socket.emit('joinLobby', userContext.username!);
            navigate('../lobby');
          }}
        >
          {'Play'}
        </Button>
      </Box>
    </Container>
  );
}

export default User;
