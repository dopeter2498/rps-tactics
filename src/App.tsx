import { Route, Routes } from 'react-router-dom';

import Login from './screens/Login';
import Guest from './screens/Guest';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/login' element={<Login />} />
      <Route path='/guest' element={<Guest />} />
    </Routes>
  );
}

export default App;
