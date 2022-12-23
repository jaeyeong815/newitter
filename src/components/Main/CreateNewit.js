import { useState } from 'react';
import { addNewit } from 'utils/fbase/newitFbase';
import { getImgUrl } from 'utils/fbase/storageFbase';

const CreateNewit = ({ user }) => {
  const [newitText, setNewitText] = useState('');
  const [imgUrl, setImgUrl] = useState('');

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

  const onClearFile = () => setImgUrl('');

  const onsubmit = async (e) => {
    e.preventDefault();
    let imageUrl = '';
    if (imgUrl) {
      imageUrl = await getImgUrl(user.uid, imgUrl);
      setImgUrl('');
    }
    addNewit(newitText, imageUrl, user.uid);
    setNewitText('');
  };

  return (
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
  );
};

export default CreateNewit;
