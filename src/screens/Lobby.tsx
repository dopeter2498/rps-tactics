import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, ButtonGroup, Button, Box } from '@mui/material';
import ContentCutTwoToneIcon from '@mui/icons-material/ContentCutTwoTone';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

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
    currSocket.emit('getLobby');
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
  }, []);


  return (
    <Container fixed sx={{ borderRadius: 9, backgroundColor: 'white' }}>
      <div>
        <h1> RPS Tactics! </h1>
      </div>
      {false ?
        <Box textAlign='center' sx={{ backgroundColor: 'white' }}>
          {/*
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button
              startIcon={<CircleOutlinedIcon sx={{ fontSize: 40 }} />}
              onClick={() => currSocket.emit('playerChoice', 'rock')}
            >
            </Button>
            <Button
              startIcon={<ArticleRoundedIcon />}
              onClick={() => currSocket.emit('playerChoice', 'paper')}
            >
            </Button>
            <Button
              startIcon={<ContentCutTwoToneIcon />}
              onClick={() => currSocket.emit('playerChoice', 'scissor')}
            >
            </Button>
          </ButtonGroup>
        */}
          <ul>
            {currPlayers.map((player, index) => {
              return (
                <PlayerCard key={`currPlayer-${index}`} player={player} />
              );
            })}
          </ul>
        </Box> :

        <Box>
          <ul>
            {currPlayers.map((player, index) => {
              return (
                <PlayerCard key={`currPlayer-${index}`} player={player} />
              );
            })}
          </ul>
          {'Lobby'}
          {!userContext.player.ready ?
            <Button
              variant='contained'
              onClick={() => {
                currSocket.emit('toggleReady');
              }}
              sx={{ m: 1 }}
            >
              {'Ready'}
            </Button>
            :
            <Button
              variant='contained'
              onClick={() => {
                currSocket.emit('toggleReady');
              }}
              sx={{ m: 1 }}
            >
              {'Unready'}
            </Button>
          }
          {userContext.player.leader === true ?
            currPlayers.length > 1 &&
              !currPlayers.some((player) => {
                return !player.ready;
              }) ?
              <Button
                variant='contained'
                onClick={() => {
                  currSocket.emit('startGame');
                }}
                sx={{ m: 1 }}
              >
                {'Start Game'}
              </Button>
              :
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
            :
            <></>
          }
        </Box>
      }
    </Container>
  );
}

export default Lobby;
