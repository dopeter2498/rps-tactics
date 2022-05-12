import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { Player } from '../Game/types';
import socket from './socket';
import { useUserContext } from './UserContext';

interface PlayerCardProps {
  player: Player;
}

const PlayerCard = ({ player }: PlayerCardProps) => {
  const currSocket = socket;
  const userContext = useUserContext();

  return (
    <Card>
      <CardContent>
        <Typography>
          {player.username}
          {player.healthPoints === undefined ? ` | Ready: ${player.ready}`
            : `| HP: ${player.healthPoints}`}
        </Typography>
        {player.socketId !== currSocket.id && userContext.player.leader ?
          <Button
            variant='contained'
            onClick={() => currSocket.emit('toggleLeader', player.socketId)}
          >
            {'make leader'}
          </Button> :
          ''
        }
      </CardContent>
    </Card>
  );
}

export default PlayerCard;
