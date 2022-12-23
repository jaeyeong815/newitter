import { useState } from 'react';
import { updateNewit } from 'utils/fbase/newitFbase';

const UpdateNewit = ({ newit, onEditMode }) => {
  const [updateText, setUpdateText] = useState(newit.text);

  const onChange = (e) => setUpdateText(e.target.value);

  const onEdit = () => {
    updateNewit(newit.id, { text: updateText });
    onEditMode((prev) => !prev);
  };

  const onCancel = () => onEditMode((prev) => !prev);

  return (
    <>
      <form onSubmit={onEdit} className='container nweetEdit'>
        <input type='text' className='formInput' value={updateText} autoFocus onChange={onChange} />
        <input type='submit' className='formBtn' defaultValue='수정하기' />
      </form>
      <span onClick={onCancel} className='formBtn cancelBtn'>
        취소
      </span>
    </>
  );
};

export default UpdateNewit;
