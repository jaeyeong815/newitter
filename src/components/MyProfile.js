import { useState } from 'react';
import { updateUserProfile } from 'utils/fbase/authFbase';

const MyProfile = ({ user }) => {
  const [newUserName, setNewUserName] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const userName = `${user.displayName ?? '이름을 설정해주세요'}`;

  const onUpdateState = () => setIsUpdating((prev) => !prev);

  const onNameChange = (e) => {
    setNewUserName(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    updateUserProfile({ displayName: newUserName });
    setNewUserName('');
  };
  return (
    <>
      {userName}
      <button onClick={onUpdateState}>이름 변경하기</button>
      {isUpdating && (
        <form onSubmit={onSubmit}>
          <input type='text' value={newUserName} onChange={onNameChange} />
          <button>등록</button>
        </form>
      )}
    </>
  );
};

export default MyProfile;
