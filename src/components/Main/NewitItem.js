import { useState } from 'react';
import { deleteNewit } from 'utils/fbase/newitFbase';
import UpdateNewit from './UpdateNewit';

const NewitItem = ({ newit, user }) => {
  const [updateMode, setUpdateMode] = useState(false);

  const isOwner = newit.creatorId === user.uid;

  const onEdit = (e) => setUpdateMode((prev) => !prev);
  const onDelete = (e) => {
    const deleteOk = window.confirm('정말 삭제하시겠습니까?');
    deleteOk && deleteNewit(e.currentTarget.id);
  };

  return (
    <>
      {updateMode ? (
        <UpdateNewit newit={newit} onEditMode={setUpdateMode} />
      ) : (
        <>
          <h4>{newit.text}</h4>
          {isOwner && (
            <>
              <button id={newit.id} onClick={onEdit}>
                수정
              </button>
              <button id={newit.id} onClick={onDelete}>
                삭제
              </button>
            </>
          )}
        </>
      )}
    </>
  );
};

export default NewitItem;
