import React, { useState } from 'react';

const DeleteProfile = ({
  authToken,
  authTokenType,
  userId,
  userType,
  BaseUrl,
  navigate,
  logOut
}) => {
  const [error, setError] = useState('');

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
        logOut()
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        setError('Are you an ADMIN, I can not delete admin account.');
      });
  };

  return (
    <div className='signin-form'>
      <h6 className='text-danger'>
        Are you sure you want to delete your profile?
      </h6>
      {error && <p className='text-info'>{error}</p>}

      {userType === 'admin' ? (
        <button
          className='btn btn-outline-danger btn-lg px-4 rounded-pill'
          type='button'
          onClick={handleDelete}
          disabled
        >
          Delete Account
        </button>
      ) : (
        <button
          className='btn btn-outline-danger btn-lg px-4 rounded-pill'
          type='button'
          onClick={handleDelete}
        >
          Delete Account
        </button>
      )}
    </div>
  );
};

export default DeleteProfile;
