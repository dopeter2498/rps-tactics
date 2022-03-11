import { createContext, ReactNode, useContext } from 'react';
import { User } from 'firebase/auth';

const UserContext = createContext<UserInfo>({
  user: undefined,
  username: undefined
});

interface UserInfo {
  user: User | undefined;
  username: string | undefined;
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
