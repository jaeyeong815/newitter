import { useState } from 'react';
import { addNewit } from 'utils/fbase/newitFbase';
import { getImgUrl } from 'utils/fbase/storageFbase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

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
    if (newitText === '') {
      return;
    }
    let imageUrl = '';
    if (imgUrl) {
      imageUrl = await getImgUrl(user.uid, imgUrl);
      setImgUrl('');
    }
    addNewit(newitText, imageUrl, user.uid);
    setNewitText('');
  };

  return (
    <form onSubmit={onsubmit} className='factoryForm'>
      <div className='factoryInput__container'>
        <input
          type='text'
          placeholder='오늘은 무슨 일이 있었나요?'
          className='factoryInput__input'
          maxLength={120}
          value={newitText}
          onChange={onChange}
        />
        <input type='submit' value='&rarr;' className='factoryInput__arrow' />
      </div>
      <label htmlFor='attach-file' className='factoryInput__label'>
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id='attach-file'
        type='file'
        accept='image/*'
        style={{
          opacity: 0,
        }}
        onChange={onFileChange}
      />
      {imgUrl && (
        <div className='factoryForm__attachment'>
          <img
            src={imgUrl}
            alt='미리보기'
            style={{
              backgroundImage: imgUrl,
            }}
          />
          <div className='factoryForm__clear' onClick={onClearFile}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};

export default CreateNewit;
