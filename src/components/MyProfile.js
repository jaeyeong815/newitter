import { useState } from 'react';
import { logoutAccount, updateUserProfile } from 'utils/fbase/authFbase';
import { useNavigate } from 'react-router-dom';

const MyProfile = ({ user }) => {
  const [newUserName, setNewUserName] = useState(user.displayName);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

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

  const onLogout = () => {
    logoutAccount();
    navigate('/');
  };

  return (
    <div className='container'>
      <p className='profileName'>{userName}</p>
      {!isUpdating && (
        <input onClick={onUpdateState} className='formBtn' defaultValue='이름변경하기' />
      )}
      {isUpdating && (
        <form onSubmit={onSubmit} className='profileForm'>
          <input
            type='text'
            value={newUserName}
            autoFocus
            className='formInput'
            onChange={onNameChange}
          />
          <input
            className='formBtn'
            style={{
              marginTop: 10,
            }}
            type='submit'
            defaultValue='수정'
          />
          <input
            className='formBtn cancelBtn'
            onClick={onUpdateState}
            style={{
              marginTop: 10,
            }}
            defaultValue='취소'
          />
        </form>
      )}
      <span className='formBtn cancelBtn logOut' onClick={onLogout}>
        로그아웃
      </span>
    </div>
  );
};

export default MyProfile;
