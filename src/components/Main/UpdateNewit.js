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
      <input type='text' value={updateText} onChange={onChange} />
      <button onClick={onCancel}>취소</button>
      <button onClick={onEdit}>완료</button>
    </>
  );
};

export default UpdateNewit;
