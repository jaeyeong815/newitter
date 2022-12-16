import { useEffect, useState } from 'react';
import Router from 'Router';
import { authStateChanged } from 'fbase/authFbase';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authStateChanged(setIsLoggedIn, setInit);
  }, []);

  return <div>{init ? <Router isLoggedIn={isLoggedIn} /> : '초기화중 ... '}</div>;
}

export default App;
