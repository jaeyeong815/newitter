import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from 'pages/Auth';
import Home from 'pages/Home';

const Router = ({ isLoggedIn }) => {
  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? <Route path="/" element={<Home />} /> : <Route path="/" element={<Auth />} />}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
