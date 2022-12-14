import { useState } from 'react';
import Router from 'Router';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <Router isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default App;
