import { useEffect, useState } from 'react';
import NewitItem from './NewitItem';
import { getNewits } from 'utils/fbase/newitFbase';
import CreateNewit from './CreateNewit';

const Newitter = ({ user }) => {
  const [newits, setNewits] = useState([]);

  useEffect(() => {
    getNewits(setNewits);
  }, []);

  return (
    <div className='container'>
      <CreateNewit user={user} />
      <div>
        {newits.map((newit) => (
          <NewitItem key={newit.id} newit={newit} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Newitter;
