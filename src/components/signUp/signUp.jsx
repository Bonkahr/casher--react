import React from 'react';

import './signUp.scss';

const SignUp = () => {
  return (
    <div className='signin-form'>
      <form>
        <h1 className='h3 mb-3 fw-normal'>Kindly register to continue</h1>
        <div className='form-floating'>
          <input
            name='first_name'
            type='text'
            className='form-control'
            id='first_name'
            placeholder='sam'
          />
          <label for='first_name'>First Name</label>
        </div>
        <div className='form-floating'>
          <input
            type='text'
            className='form-control'
            id='last_name'
            placeholder='sam'
          />
          <label for='floatingInput'>Last Name</label>
        </div>

        <div className='form-floating'>
          <input
            type='text'
            className='form-control'
            id='username'
            placeholder='sam1234'
          />
          <label for='floatingInput'>Username</label>
        </div>

        <div className='form-floating'>
          <input
            type='email'
            className='form-control'
            id='email'
            placeholder='sam1@email.com'
          />
          <label for='floatingInput'>Email address</label>
        </div>

        <div className='form-floating'>
          <input
            type='password'
            className='form-control'
            id='password'
            placeholder='Password'
            suggested='new-password'
          />
          <label for='floatingPassword'>Password</label>
        </div>
        <div className='form-floating'>
          <input
            type='password'
            className='form-control'
            id='confirm_password'
            placeholder='Password'
            suggested='new-password'
          />
          <label for='floatingPassword'>Confirm Password</label>
        </div>

        <div className='orm-floating'>
          <label
            for='profile_picture'
            className='form-label'
          >
            Upload your profile picture
          </label>
          <input
            className='form-control'
            type='file'
            id='profile picture'
          />
        </div>
        <button
          className='btn btn-primary w-100 py-2'
          type='submit'
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;
