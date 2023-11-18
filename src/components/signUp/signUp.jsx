import React from 'react';
import { useState, useEffect } from 'react';

import './signUp.scss';

const SignUp = ({ directLogin, BaseUrl, navigate, authToken }) => {
  const [firstname, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confrimPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const firstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const lastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const usernameChange = (e) => {
    setUsername(e.target.value);
  };

  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const confirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegister = (e) => {
    e?.preventDefault();

    if (password !== confrimPassword) {
      alert('Passwords must be the same.');
      return;
    }

    const jsonString = JSON.stringify({
      first_name: firstname,
      last_name: lastName,
      username: username,
      email: email,
      password: password,
      user_image_url: `${username}.jpeg`,
      user_type: '',
    });
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonString,
    };

    fetch(BaseUrl + 'user/new', requestOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then(() => {
        //Todo directLogin(username, password)
        navigate('/sign-in');
      })
      .catch((err) => {
        try {
          err.json().then((errorData) => {
            if (typeof errorData.detail !== 'string') {
              setError('Kindly fill all fields.');
            } else {
              setError(errorData.detail);
            }
          });
        } catch {
          setError('Server error. Try agin later.');
        }
      });
  };

  if (!authToken) {
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
              value={firstname}
              onChange={firstNameChange}
              required
            />
            <label htmlFor='first_name'>First Name</label>
          </div>
          <div className='form-floating'>
            <input
              type='text'
              className='form-control'
              id='last_name'
              placeholder='sam'
              value={lastName}
              onChange={lastNameChange}
              required
            />
            <label htmlFor='floatingInput'>Last Name</label>
          </div>

          <div className='form-floating'>
            <input
              type='text'
              className='form-control'
              id='username'
              placeholder='sam1234'
              value={username}
              onChange={usernameChange}
              required
            />
            <label htmlFor='floatingInput'>Username</label>
          </div>

          <div className='form-floating'>
            <input
              type='email'
              className='form-control'
              id='email'
              value={email}
              placeholder='sam1@email.com'
              onChange={emailChange}
              required
            />
            <label htmlFor='floatingInput'>Email address</label>
          </div>

          <div className='form-floating'>
            <input
              type='password'
              className='form-control'
              id='password'
              placeholder='Password'
              suggested='new-password'
              value={password}
              onChange={passwordChange}
              required
            />
            <label htmlFor='floatingPassword'>Password</label>
          </div>

          {password !== confrimPassword && (
            <div>
              <p className='text-danger'>Password are not the same</p>
            </div>
          )}

          <div className='form-floating'>
            <input
              type='password'
              className='form-control'
              id='confirm_password'
              placeholder='Password'
              suggested='new-password'
              value={confrimPassword}
              onChange={confirmPasswordChange}
              required
            />
            <label htmlFor='floatingPassword'>Confirm Password</label>
          </div>
          {error && (
            <div>
              <p className='text-danger'>{error}</p>
            </div>
          )}

          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              value=''
              id='flexCheckChecked'
              checked
              disabled
            />
            <label
              className='form-check-label'
              for='flexCheckChecked'
            >
              This site is on development, you might experience some bugs.
            </label>
          </div>

          <button
            className='btn btn-primary w-100 py-2'
            type='submit'
            onClick={handleRegister}
          >
            Register
          </button>
        </form>
      </div>
    );
  }

  navigate('/expenditures');
};

export default SignUp;
