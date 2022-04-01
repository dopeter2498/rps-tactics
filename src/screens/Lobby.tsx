import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';

import { Player } from '../Game/types';
import socket from '../components/socket';
import { useUserContext } from '../components/UserContext';

import PlayerCard from '../components/PlayerCard';

const Lobby = () => {
  const currSocket = socket;
  const userContext = useUserContext();
  const navigate = useNavigate();

  const [currPlayers, setCurrPlayers] = useState<Player[]>([]);

  useEffect(() => {
    currSocket.on('updateLobby', (players) => {
      userContext.player = players.find((element) => {
        return currSocket.id === element.socketId;
      })!;
      setCurrPlayers(players);
    });
    currSocket.on('startGame', () => {
      navigate('../rps');
    });
    currSocket.on('disconnect', () => {
      currSocket.emit('getLobby');
    });
    currSocket.emit('getLobby');
    return () => {
      currSocket.removeAllListeners('updateLobby');
      currSocket.removeAllListeners('startGame');
      currSocket.removeAllListeners('disconnect');
    };
  }, []);

  return (
    <Container fixed>
      <CssBaseline />
      <Typography variant='h4'>{'RPS Tactics!'}</Typography>
      <Box>
        <ul>
          {currPlayers.map((player, index) => {
            return <PlayerCard key={`currPlayer-${index}`} player={player} />;
          })}
        </ul>
        {'Lobby'}
        {!userContext.player.ready ? (
          <Button
            variant='contained'
            onClick={() => {
              currSocket.emit('toggleReady');
            }}
            sx={{ m: 1 }}
          >
            {'Ready'}
          </Button>
        ) : (
          <Button
            variant='contained'
            onClick={() => {
              currSocket.emit('toggleReady');
            }}
            sx={{ m: 1 }}
          >
            {'Unready'}
          </Button>
        )}
        {userContext.player.leader === true ? (
          currPlayers.length > 1 &&
          !currPlayers.some((player) => {
            return !player.ready;
          }) ? (
            <Button
              variant='contained'
              onClick={() => {
                currSocket.emit('startGame');
              }}
              sx={{ m: 1 }}
            >
              {'Start Game'}
            </Button>
          ) : (
            <Button
              variant='contained'
              disabled
              onClick={() => {
                currSocket.emit('startGame');
              }}
              sx={{ m: 1 }}
            >
              {'Start Game'}
            </Button>
          )
        ) : (
          <></>
        )}
      </Box>
    </Container>
  );
};

export default Lobby;
