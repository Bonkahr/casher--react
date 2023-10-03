import React from 'react';
import { useState } from 'react';

import './signUp.scss';

const SignUp = ({ directLogin }) => {
  const [firstname, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confrimPassword, setConfirmPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  const BaseUrl = 'http://127.0.0.1:8000/';

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };

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

  const handleUpload = (e) => {
    e?.preventDefault();

    const formData = new FormData();
    formData.append('image', profilePic);

    const requestOptions = {
      method: 'POST',
      body: formData,
    };

    fetch(BaseUrl + 'user/image', requestOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        console.log('Data:' + data);
        console.log('file name:' + data.filename);
        console.log('calling create profile function');
        createProfile(data.filename);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setEmail('');
        setFirstName('');
        setLastName('');
        setPassword('');
        setConfirmPassword('');
        setUsername('');
        setProfilePic(null);
        document.getElementById('profilePicture').value = null;
      });

    const createProfile = (imageUrl) => {
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
        user_image_url: imageUrl,
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
        .then((data) => {
          directLogin(username, password);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

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

        <div className='orm-floating'>
          <label
            htmlFor='profile_picture'
            className='form-label'
          >
            Upload your profile picture
          </label>
          <input
            className='form-control'
            type='file'
            id='profilePicture'
            onChange={handleFileChange}
            required
          />
        </div>
        <button
          className='btn btn-primary w-100 py-2'
          type='submit'
          onClick={handleUpload}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;
