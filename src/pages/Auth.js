import { createAccount, loginAccount, test } from 'fbase';
import { useState } from 'react';

const Auth = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [newAccount, setNewAccount] = useState(true);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await createAccount(loginData.email, loginData.password);
        console.log('🚀 ~ file: Auth.js:21 ~ onSubmitHandler ~ data', data);
      } else {
        data = await loginAccount(loginData.email, loginData.password);
        console.log('🚀 ~ file: Auth.js:25 ~ onSubmitHandler ~ data', data);
      }
    } catch (err) {
      console.log('🚀 ~ file: Auth.js:21 ~ onSubmitHandler ~ err', err);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
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
      </form>
      <div>
        <button>Google Log in</button>
        <button>Github Log in</button>
      </div>
    </div>
  );
};

export default Auth;
