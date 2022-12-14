import { useState } from 'react';

const Auth = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Email"
          name="email"
          onChange={onChangeHandler}
          value={loginData.email}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={onChangeHandler}
          value={loginData.password}
          required
        />
        <input type="submit" value="Log In" />
      </form>
      <div>
        <button>Google Log in</button>
        <button>Github Log in</button>
      </div>
    </div>
  );
};

export default Auth;
