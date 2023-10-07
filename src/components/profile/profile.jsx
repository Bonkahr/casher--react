import React from 'react';

import './profile.scss'

import { Link } from 'react-router-dom';

const Profile = ({ name, username, userType, createdOn, imageUrl, BaseUrl }) => {
  
  const t_a = createdOn.split(/[-T:]/);

  const y_m_d = t_a[0] + '-' + t_a[1] + '-' + t_a[2];
  const time = t_a[3] + ':' + t_a[4];

  return (
    <div>
      <div className='container my-5'>
        <div className='p-5 text-center bg-body-tertiary rounded-3'>
          <img
            alt='profile pic'
            className='bi mt-4 mb-3 round-image'
            width='100'
            height='100'
            src={`${BaseUrl}${imageUrl}`}
          ></img>
          <h1 className='text-body-emphasis'>{name}</h1>
          <p className='col-lg-8 mx-auto fs-5 text-muted'>
            Username: {username}
          </p>
          <p className='col-lg-8 mx-auto fs-5 text-muted'>User: {userType}</p>
          <p className='col-lg-8 mx-auto fs-5 text-muted'>
            Joined: {y_m_d} at {time}
          </p>
          <div className='d-inline-flex gap-2 mb-5'>
            <Link
              to='/edit-profile'
              className='d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill'
              type='button'
            >
              Edit Photo
            </Link>
          </div>
          {userType === 'user' ? (
            <Link
              to='/delete-profile'
              className='btn btn-outline-secondary btn-lg px-4 rounded-pill'
              type='button'
            >
              Delete Account
            </Link>
          ) : (
            <p className='text-info'>You are an admin, to delete your account you know what to do.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
