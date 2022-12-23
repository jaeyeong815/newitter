import { useState } from 'react';
import UpdateNewit from './UpdateNewit';
import { deleteNewit } from 'utils/fbase/newitFbase';
import { deleteImg } from 'utils/fbase/storageFbase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const NewitItem = ({ newit, user }) => {
  const [updateMode, setUpdateMode] = useState(false);

  const isOwner = newit.creatorId === user.uid;

  const onEdit = () => setUpdateMode((prev) => !prev);
  const onDelete = (e) => {
    const deleteOk = window.confirm('정말 삭제하시겠습니까?');
    deleteOk && deleteNewit(e.currentTarget.id);
    deleteOk && newit.imageUrl && deleteImg(newit.imageUrl);
  };

  return (
    <div className='nweet' style={{ marginTop: 30 }}>
      {updateMode ? (
        <UpdateNewit newit={newit} onEditMode={setUpdateMode} />
      ) : (
        <>
          <h4>{newit.text}</h4>
          {newit.imageUrl && <img src={newit.imageUrl} alt='newitImg' />}
          {isOwner && (
            <div className='nweet__actions'>
              <span id={newit.id} onClick={onEdit}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
              <span id={newit.id} onClick={onDelete}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NewitItem;
