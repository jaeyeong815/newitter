import { addNewit, getNewits } from 'fbase/newitFbase';
import { useEffect, useState } from 'react';

const Newitter = ({ user }) => {
  const [newitText, setNewitText] = useState('');
  const [newits, setNewits] = useState([]);

  const getDbNewits = async () => {
    const dbNewits = await getNewits();
    dbNewits.forEach((newit) => {
      const newitObj = {
        ...newit.data(),
        id: newit.id,
      };
      setNewits((prev) => [...prev, newitObj]);
    });
  };

  useEffect(() => {
    getDbNewits();
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
          <div key={newit.id}>
            <h4>{newit.text}</h4>
          </div>
        ))}
      </div>
    </>
  );
};

export default Newitter;
