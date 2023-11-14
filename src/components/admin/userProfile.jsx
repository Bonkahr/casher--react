import React, { useState } from 'react';

const UserProfile = ({
  authToken,
  authTokenType,
  BaseUrl,
  userId,
  userImage,
  username,
  name,
  userType,
}) => {
  const [passwordReset, setPasswordReset] = useState(null);

  const handleDelete = () => {
    const requestOptions = {
      method: 'DELETE',
      headers: new Headers({
        Authorization: authTokenType + ' ' + authToken,
      }),
    };

    fetch(BaseUrl + `user/${userId}`, requestOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = () => {
    //Todo handle paasword reset
  };

  const resetPassword = () => {
    const requestOptions = {
      method: 'PUT',
      headers: new Headers({
        Authorization: authTokenType + ' ' + authToken,
      }),
    };

    fetch(BaseUrl + `user/reset_password/${username}`, requestOptions)
      .then((res) => {
        if (res.ok) {
          setPasswordReset(true);
          return res.json();
        }
        throw res;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(setPasswordReset(false));
  };

  return (
    <div className='p-5 text-center bg-body-tertiary rounded-3'>
      <img
        alt='profile pic'
        className='bi mt-4 mb-3 round-image'
        width='100'
        height='100'
        src={`${BaseUrl}${userImage}`}
      ></img>
      <h1 className='text-body-emphasis'>{name}</h1>
      <p className='col-lg-8 mx-auto fs-5 text-muted'>Username: {username}</p>
      <p className='col-lg-8 mx-auto fs-5 text-muted'>User: {userType}</p>
      {userType === 'user' ? (
        <div className='btn-admin'>
          <button
            className='btn btn-outline-danger btn-sm px-4 rounded-pill'
            type='button'
            onClick={handleDelete}
          >
            Delete Account
          </button>

          <button
            className='btn btn-outline-warning btn-sm px-4 rounded-pill'
            onClick={resetPassword}
          >
            Reset Password
          </button>
        </div>
      ) : (
        <>
          <a
            className='link-info link'
            href='..'
            onClick={handleClick}
          >
            Mofify user type to delete user
          </a>

          <button
            className='btn btn-outline-warning btn-sm px-4 rounded-pill'
            onClick={resetPassword}
          >
            Reset Password
          </button>
        </>
      )}
      {passwordReset && (
        <div>
          <p className='text-success'>
            User password was reset, and email with default password sent to the
            user.
          </p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
