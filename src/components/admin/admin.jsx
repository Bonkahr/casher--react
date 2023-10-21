import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import './admin.scss'

import UserProfile from './userProfile';


const Admin = ({ authToken, authTokenType, BaseUrl, userType, navigate }) => {

  const [users, setUsers] = useState([]);

  const requestOptions = {
    method: 'GET',
    headers: new Headers({
      Authorization: authTokenType + ' ' + authToken,
      'Content-Type': 'application/json',
    }),
  };

  console.log(requestOptions);

  useEffect(() => {
    fetch(BaseUrl + 'user', requestOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((e) => {});
  }, []);

  if (authToken) {
    if (userType === 'admin') {
      return (
        <div className='container sign-in'>
          {users.map((user) => (
            <UserProfile
              key={user.id}
              authToken={authToken}
              authTokenType={authTokenType}
              BaseUrl={BaseUrl}
              navigate={navigate}
              userType={user.user_type}
              username={user.username}
              userImage={user.user_image_url}
              userId={user.id}
              joinedOn={user.created_on}
              name={user.first_name + ' ' + user.last_name}
            />
          ))}
        </div>
      );
    }
    else {
      return (
        <Link
          to='/profile'
          className='px-2 link-secondary'
        >
          You are not an admin. View your profile.
        </Link>
      );
    }
  }

  return (
    <div>
      <Link
        to='/sign-in'
        className='px-2 link-secondary'
      >
        Log in as an Admin to view this page
      </Link>
    </div>
  );
 
};

export default Admin