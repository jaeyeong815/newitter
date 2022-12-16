import { logoutAccount } from 'fbase';
import { Link, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    logoutAccount();
    navigate('/');
  };
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/profile'>Profile</Link>
        </li>
      </ul>
      <button onClick={onLogout}>로그아웃</button>
    </nav>
  );
};

export default Navigation;
