import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from 'pages/Auth';
import Home from 'pages/Home';
import Profile from 'pages/Profile';
import Navigation from 'components/common/Navigation';

const Router = ({ isLoggedIn, user }) => {
  return (
    <BrowserRouter>
      {isLoggedIn && <Navigation />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path='/' element={<Home user={user} />} />
            <Route path='/profile' element={<Profile user={user} />} />
          </>
        ) : (
          <Route path='/' element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
