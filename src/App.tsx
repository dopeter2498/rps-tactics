import { Route, Routes } from 'react-router-dom';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

import UserContextProvider from './components/UserContext';

import Login from './screens/Login';
import Guest from './screens/Guest';
import User from './screens/User';
import Lobby from './screens/Lobby';
import Rps from './screens/Rps';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/guest' element={<Guest />} />
        <Route path='/user' element={<User />} />
        <Route path='/lobby' element={<Lobby />} />
        <Route path='/rps' element={<Rps />} />
      </Routes>
    </UserContextProvider>
    </ThemeProvider>
  );
}

export default App;
