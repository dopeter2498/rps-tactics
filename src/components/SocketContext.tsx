import React from 'react';
import { createContext, ReactNode, useContext} from 'react';
import { Socket } from 'socket.io-client';

import { socket, ServerToClientEvents, ClientToServerEvents  } from './socket';


type UserSocket = {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>,
};

const defaultState = {
  socket: socket,
};

interface SocketProviderProps {
  children: ReactNode,
}

const SocketContext = createContext<UserSocket>(defaultState);

const SocketProvider = (props: SocketProviderProps) => {
  const socket = useContext(SocketContext);
  return(
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
}

const useSocket = () => useContext(SocketContext);

export { SocketProvider, useSocket };
export default SocketProvider;
