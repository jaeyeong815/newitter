import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from 'pages/Auth';
import Home from 'pages/Home';
import Profile from 'pages/Profile';
import Navigation from 'components/common/Navigation';

const Router = ({ isLoggedIn }) => {
  return (
    <BrowserRouter>
      {isLoggedIn && <Navigation />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
          </>
        ) : (
          <Route path='/' element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
