import { useEffect, useState } from 'react';
import NewitItem from './NewitItem';
import { addNewit, getNewits } from 'utils/fbase/newitFbase';

const Newitter = ({ user }) => {
  const [newitText, setNewitText] = useState('');
  const [newits, setNewits] = useState([]);
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    getNewits(setNewits);
  }, []);

  const onChange = (e) => setNewitText(e.target.value);

  const onFileChange = (e) => {
    const { files } = e.target;
    const img = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const { result } = finishedEvent.currentTarget;
      setImgUrl(result);
    };
    reader.readAsDataURL(img);
  };

  const onClearFile = () => setImgUrl(null);

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
        <input type='file' accept='image/*' onChange={onFileChange} />
        <button type='submit'>Newit!</button>
        {imgUrl && (
          <div>
            <img src={imgUrl} alt='미리보기' width='50px' height='50px' />
            <button onClick={onClearFile}>Clear</button>
          </div>
        )}
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
