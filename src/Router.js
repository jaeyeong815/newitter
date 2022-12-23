import { HashRouter, Route, Routes } from 'react-router-dom';
import Auth from 'pages/Auth';
import Home from 'pages/Home';
import Profile from 'pages/Profile';
import Navigation from 'components/common/Navigation';

const Router = ({ isLoggedIn, user }) => {
  return (
    <HashRouter basen='/'>
      {isLoggedIn && <Navigation user={user} />}
      <div className='route'>
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
      </div>
    </HashRouter>
  );
};

export default Router;
