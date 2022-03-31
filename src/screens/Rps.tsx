import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import ContentCutTwoToneIcon from '@mui/icons-material/ContentCutTwoTone';

import { Player } from '../Game/types';
import socket from '../components/socket';
import { useUserContext } from '../components/UserContext';

interface PlayerGameCardProps {
  player: Player;
}

const PlayerGameCard = ({ player }: PlayerGameCardProps) => {
  return (
    <Box m={3}>
      <Card>
        <CardContent>
          <Typography>
            {player.username}
            {` | HP: ${player.healthPoints}`}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

const Rps = () => {
  const currSocket = socket;
  const userContext = useUserContext();

  const [round, setRound] = useState(0);
  const [choice, setChoice] = useState('');
  const [currPlayers, setCurrPlayers] = useState<Player[]>([]);

  useEffect(() => {
    currSocket.on('updateLobby', (players) => {
      userContext.player = players.find((element) => {
        return currSocket.id === element.socketId;
      })!;
      setCurrPlayers(players);
      console.table(players);
    });
    currSocket.emit('getLobby');
    return () => {
      currSocket.removeAllListeners('updateLobby');
    };
  }, []);

  const getOpp = (): string => {
    const opp = currPlayers.find((player) => {
      player.opponent === userContext.player.socketId;
    });
    if (opp === undefined) {
      return 'undefined';
    }
    return opp!.username;
  };

  return (
    <Container>
      <CssBaseline />
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography mt={3} variant='h4'>
              {'Curr Round'}
            </Typography>
            <Typography m={3}>
              {currPlayers.length > 1 && userContext.player.healthPoints! > 0
                ? `Opponent: ${getOpp()}`
                : ''}
            </Typography>
            <Typography m={3} variant='h5'>
              {`Choice: ${choice}`}
            </Typography>
            <ButtonGroup
              variant='contained'
              aria-label='outlined primary button group'
            >
              <Button
                onClick={() => {
                  currSocket.emit('playerChoice', 'rock');
                  setChoice('rock');
                }}
              >
                <CircleOutlinedIcon />
              </Button>
              <Button
                onClick={() => {
                  currSocket.emit('playerChoice', 'paper');
                  setChoice('paper');
                }}
              >
                <ArticleRoundedIcon />
              </Button>
              <Button
                onClick={() => {
                  currSocket.emit('playerChoice', 'scissors');
                  setChoice('scissors');
                }}
              >
                <ContentCutTwoToneIcon />
              </Button>
            </ButtonGroup>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography m={3} variant='h4'>
              {'Players:'}
            </Typography>
            {currPlayers.map((player, num) => {
              return (
                <PlayerGameCard key={`player-card-${num}`} player={player} />
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Rps;
