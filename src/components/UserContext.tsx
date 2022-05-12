import { createContext, ReactNode, useContext } from 'react';
import { User } from 'firebase/auth';

import { Player } from '../Game/types';

const defaultPlayer: Player = {
  socketId: '',
  username: '',
  healthPoints: undefined,
  opponent: undefined,
  ready: false,
  leader: false,
  choice: undefined,
};

const UserContext = createContext<UserInfo>({
  user: undefined,
  username: undefined,
  player: defaultPlayer,
});

interface UserInfo {
  user: User | undefined;
  username: string | undefined;
  player: Player;
}

interface UserContextProviderProps {
  children: ReactNode;
}

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const userContext = useContext(UserContext);

  return (
    <UserContext.Provider value={userContext}>
      {children}
    </UserContext.Provider>
  );
}

const useUserContext = () =>  useContext(UserContext);

export { useUserContext };

export default UserContextProvider;
