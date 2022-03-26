import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

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
}

const Rps = () => {
  const currSocket = socket;
  const userContext = useUserContext();

  const [round, setRound] = useState(0);
  const [currPlayers, setCurrPlayers] = useState<Player[]>([]);

  useEffect(() => {
    currSocket.on('updateLobby', (players) => {
      userContext.player = players.find((element) => {
        return currSocket.id === element.socketId;
      })!;
      setCurrPlayers(players);
    });
    currSocket.emit('getLobby');
    return () => {
      currSocket.removeAllListeners('updateLobby');
    };
  }, []);

  return (
    <Container>
      <CssBaseline />
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          {'Curr Round'}
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography m={3}>
            {'Players:'}
          </Typography>
          {currPlayers.map((player, num) => {
            return (
              <PlayerGameCard key={`player-card-${num}`} player={player} />
            );
          })}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Rps;
