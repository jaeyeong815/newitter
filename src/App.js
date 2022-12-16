import { useEffect, useState } from 'react';
import Router from 'Router';
import { authStateChanged } from 'fbase/authFbase';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // TODO redux로 전역관리
  const [user, setUser] = useState(null);

  useEffect(() => {
    authStateChanged(setIsLoggedIn, setInit, setUser);
  }, []);

  return <div>{init ? <Router isLoggedIn={isLoggedIn} user={user} /> : '초기화중 ... '}</div>;
}

export default App;
