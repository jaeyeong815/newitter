import { deleteNewit } from 'utils/fbase/newitFbase';

const onEdit = (e) => console.log(e.currentTarget.id);
const onDelete = (e) => deleteNewit(e.currentTarget.id);

const NewitItem = ({ newit }) => {
  return (
    <>
      <h4>{newit.text}</h4>
      <button id={newit.id} onClick={onEdit}>
        수정
      </button>
      <button id={newit.id} onClick={onDelete}>
        삭제
      </button>
    </>
  );
};

export default NewitItem;
