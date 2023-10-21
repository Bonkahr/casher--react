import React from 'react';
import { Link } from 'react-router-dom';

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

  const hnadleClick = () => {
    //Todo handle paasword reset 
  }

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
          <button
            className='btn btn-outline-secondary btn-lg px-4 rounded-pill'
            type='button'
            onClick={handleDelete}
          >
            Delete Account
          </button>
        ) : (
          <>
            <a
              className='link-info link'
              href='..'
              onClick={hnadleClick}
            >
              Mofify user type to delete user
            </a>
          </>
        )}
        <Link
          className='link-warning link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover link'
          to='/admin'
        >
          Reset user password.
        </Link>
      </div>
  );
};

export default UserProfile;
