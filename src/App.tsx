import { Route, Routes } from 'react-router-dom';

import UserContextProvider from './components/UserContext';
import Login from './screens/Login';
import Guest from './screens/Guest';
import Rps from './screens/Rps';

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/guest' element={<Guest />} />
        <Route path='/rps' element={<Rps />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
