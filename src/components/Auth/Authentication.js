import { googleLogin, githubLogin } from 'utils/fbase/authFbase';
import AuthForm from './AuthForm';

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
    <>
      <AuthForm />
      <button name={GOOGLE} onClick={onSocialClick}>
        Google Log in
      </button>
      <button name={GITGUB} onClick={onSocialClick}>
        Github Log in
      </button>
    </>
  );
};

export default Authentication;
