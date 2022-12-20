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
      <form onSubmit={onEdit}>
        <input type='text' value={updateText} onChange={onChange} />
        <button type='submit'>완료</button>
      </form>
      <button onClick={onCancel}>취소</button>
    </>
  );
};

export default UpdateNewit;
