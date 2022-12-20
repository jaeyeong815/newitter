import { useEffect, useState } from 'react';
import NewitItem from './NewitItem';
import { addNewit, getNewits } from 'utils/fbase/newitFbase';

const Newitter = ({ user }) => {
  const [newitText, setNewitText] = useState('');
  const [newits, setNewits] = useState([]);

  useEffect(() => {
    getNewits(setNewits);
  }, []);

  const onChange = (e) => setNewitText(e.target.value);

  const onsubmit = (e) => {
    e.preventDefault();
    addNewit(newitText, user);
    setNewitText('');
  };

  return (
    <>
      <form onSubmit={onsubmit}>
        <input
          type='text'
          placeholder='오늘은 무슨 일이 있었나요?'
          maxLength={120}
          value={newitText}
          onChange={onChange}
        />
        <button type='submit'>Newit!</button>
      </form>
      <div>
        {newits.map((newit) => (
          <NewitItem key={newit.id} newit={newit} user={user} />
        ))}
      </div>
    </>
  );
};

export default Newitter;
