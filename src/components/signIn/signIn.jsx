import React from 'react';

import './signIn.scss';

const SignIn = ({
  signIn,
  username,
  setUsername,
  password,
  setPassword,
  error,
}) => {
  return (
    <div className='signin-form'>
      <form>
        <h1 className='h3 mb-3 fw-normal'>Kindly login to continue</h1>
        <div className='form-floating'>
          <input
            type='text'
            className='form-control'
            id='username'
            placeholder='name@example.com'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label for='username'>Email address or Username</label>
        </div>
        <div className='form-floating'>
          <input
            type='password'
            className='form-control'
            id='current-password'
            placeholder='Password'
            suggested='current-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label for='current-password'>Password</label>
        </div>
        <p className='text-danger'>
          {error && 'Incorrect Password or Username'}
        </p>
        <button
          className='btn btn-primary w-100 py-2'
          type='submit'
          onClick={signIn}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default SignIn;
