import { useState } from 'react';
import Router from 'Router';
import { authService } from 'fbase';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <div>
      <Router isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default App;
