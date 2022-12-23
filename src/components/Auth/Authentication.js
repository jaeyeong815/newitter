import { googleLogin, githubLogin } from 'utils/fbase/authFbase';
import AuthForm from './AuthForm';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';

const GOOGLE = 'google';
const GITGUB = 'github';

const Authentication = () => {
  const onSocialClick = (e) => {
    const { name } = e.target;
    if (name === GOOGLE) {
      googleLogin();
    }
    if (name === GITGUB) {
      githubLogin();
    }
  };
  return (
    <div className='authContainer'>
      <FontAwesomeIcon icon={faTwitter} color={'#04AAFF'} size='3x' style={{ marginBottom: 30 }} />
      <AuthForm />
      <div className='authBtns'>
        <button name={GOOGLE} className='authBtn' onClick={onSocialClick}>
          Google Log in <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button name={GITGUB} className='authBtn' onClick={onSocialClick}>
          Github Log in <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};

export default Authentication;
