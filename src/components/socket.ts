import { io, Socket } from 'socket.io-client';

interface ServerToClientEvents { }
interface ClientToServerEvents { 
  choice: (choice: number) => void;
}
interface InterServerEvents { }
interface SocketData { }


const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:4000").connect();

socket.on('connect', () => {
  console.log(`connected with id = ${socket.id}`);
});

export {
  socket,
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData
};

export default socket;
