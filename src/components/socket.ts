import { io, Socket } from 'socket.io-client';

import { Player } from '../Game/types';

export interface ServerToClientEvents {
  sendGameInfo: (data: string) => void;
  startGame: () => void;
  updateLobby: (players: Player[]) => void;
}

export interface ClientToServerEvents {
  getLobby: () => void;
  joinLobby: (username: string) => void;
  playerChoice: (choice: string) => void;
  startGame: () => void;
  toggleLeader: (player: string) => void;
  toggleReady: () => void;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents>
  = io("http://localhost:4000").connect();

socket.on('connect', () => {
  console.log(`connected with id = ${socket.id}`);
});

export { socket };
export default socket;
