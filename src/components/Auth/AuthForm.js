import { useState } from 'react';
import { createAccount, loginAccount } from 'utils/fbase/authFbase';
import { stringReplace } from 'utils/stringReplace';

const ERROR = 'error';

const AuthForm = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [newAccount, setNewAccount] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (newAccount) {
      const data = await createAccount(loginData.email, loginData.password);
      if (data.toString().includes(ERROR)) {
        setErrorMsg(stringReplace(data));
      }
    }

    if (!newAccount) {
      const data = await loginAccount(loginData.email, loginData.password);
      if (data.toString().includes(ERROR)) {
        setErrorMsg(stringReplace(data));
      }
    }
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <p onClick={toggleAccount}>{newAccount ? '로그인 하기' : '회원가입 하기'}</p>
      <input
        type='text'
        placeholder='Email'
        name='email'
        onChange={onChangeHandler}
        value={loginData.email}
        required
      />
      <input
        type='password'
        placeholder='Password'
        name='password'
        onChange={onChangeHandler}
        value={loginData.password}
        required
      />
      <input type='submit' value={newAccount ? 'Sign up' : 'Sign in'} />
      {errorMsg}
    </form>
  );
};

export default AuthForm;
