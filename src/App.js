import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Routes, Route } from 'react-router-dom';
import './App.scss';

import HomePage from './components/homePage/homePage';
import About from './components/homePage/about';
import Navbar from './components/navbar/navbar-component';
import SignIn from './components/signIn/signIn';
import SignUp from './components/signUp/signUp';
import Expenditure from './components/expenditure/expenditure';
import NewExpenditure from './components/newExpenditure/newExpenditure';
import Profile from './components/profile/profile';
import EditImage from './components/editProfile/editImage';
import DeleteProfile from './components/editProfile/deleteProfile';
import Admin from './components/admin/admin';

function App() {
  const BaseUrl = 'http://127.0.0.1:8000/';

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [userId, setUserId] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [name, setName] = useState('');
  const [authTokenType, setAuthTokenType] = useState('');
  const [username, setUsername] = useState('');
  const [userType, setUserType] = useState('');

  const [imageUrl, setImageUrl] = useState('');
  const [createdOn, setCreatedOn] = useState('');

  const navigate = useNavigate();

  // const directLogin = (username, password) => {
  //   let formData = new FormData();
  //   formData.append('username', username);
  //   formData.append('password', password);

  //   const requestOptions = {
  //     method: 'POST',
  //     body: formData,
  //   };

  //   fetch(BaseUrl + 'login', requestOptions)
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       throw res;
  //     })
  //     .then((data) => {
  //       setAuthToken(data.access_token);
  //       setName(data.name);
  //       setAuthTokenType(data.token_type);
  //       setUserId(data.user_id);
  //       setUsername(data.username);
  //       setUserType(data.user_type);
  //       setAuthTokenType(data.created_on);

  //       localStorage.setItem('authToken', authToken);
  //       localStorage.setItem('name', name);
  //       localStorage.setItem('authTokenType', authTokenType);
  //       localStorage.setItem('username', username);
  //       localStorage.setItem('userId', userId);
  //       localStorage.setItem('userType', userType);

  //       const now = new Date();
  //       localStorage.setItem('authTime', now.getTime());

  //       setError('');
  //       navigate('/expenditures')
  //     })
  //     .catch((err) => {
  //       setError(err);
  //     });
  // };

  const signIn = async (e) => {
    e?.preventDefault();

    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const requestOptions = {
      method: 'POST',
      body: formData,
    };

    fetch(BaseUrl + 'login', requestOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        setAuthToken(data.access_token);
        setName(data.name);
        setAuthTokenType(data.token_type);
        setUserId(data.user_id);
        setUsername(data.username);
        setUserType(data.user_type);
        setImageUrl(data.user_image_url);
        setCreatedOn(data.created_on);

        localStorage.setItem('authToken', data.access_token);
        localStorage.setItem('name', data.name);
        localStorage.setItem('authTokenType', data.token_type);
        localStorage.setItem('username', data.username);
        localStorage.setItem('userId', data.user_id);
        localStorage.setItem('userType', data.user_type);
        localStorage.setItem('userImageUrl', data.user_image_url);
        localStorage.setItem('createdOn', createdOn);

        const now = new Date();
        localStorage.setItem('authTime', now.getTime());

        navigate('/expenditures');

        setError('');
      })
      .catch((err) => {
        setError(err);
      });
  };

  const logOut = (e) => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('name');
    localStorage.removeItem('authTokenType');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    localStorage.removeItem('createdOn');
    localStorage.removeItem('userImageUrl');
    setAuthToken('');
    navigate('/');
  };

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const now = new Date();

    if (authToken) {
      if (now.getTime() - localStorage.getItem('authTime') > 36000000) {
        logOut();
      } else {
        setAuthToken(localStorage.getItem('authToken'));
        setName(localStorage.getItem('name'));
        setAuthTokenType(localStorage.getItem('authTokenType'));
        setUsername(localStorage.getItem('username'));
        setUserId(localStorage.getItem('userId'));
        setUserType(localStorage.getItem('userType'))
        setCreatedOn(localStorage.getItem('createdOn'));
        setImageUrl(localStorage.getItem('userImageUrl'))
        localStorage.setItem('authTime', now.getTime());
      }
    }
  }, []);  

  return (
    <>
      <header>
        {authToken ? (
          <Navbar
            authToken={authToken}
            name={name}
            logOut={logOut}
            userType={userType}
          />
        ) : (
          <Navbar />
        )}
      </header>
      <main className='container app'>
        <Routes>
          <Route
            exact
            path='/'
            element={<HomePage />}
          />

          <Route
            exact
            path='/about'
            element={<About />}
          />
          <Route
            exact
            path='/expenditures'
            element={
              <Expenditure
                authToken={authToken}
                authTokenType={authTokenType}
                BaseUrl={BaseUrl}
                navigate={navigate}
              />
            }
          />
          <Route
            exact
            path='/expenditures/new-expenditure'
            element={
              <NewExpenditure
                authToken={authToken}
                authTokenType={authTokenType}
                BaseUrl={BaseUrl}
                navigate={navigate}
              />
            }
          />

          <Route
            exact
            path='/profile'
            element={
              <Profile
                name={name}
                username={username}
                userType={userType}
                imageUrl={imageUrl}
                createdOn={createdOn}
                BaseUrl={BaseUrl}
              />
            }
          />
          <Route
            exact
            path='/edit-profile'
            element={
              <EditImage
                authToken={authToken}
                authTokenType={authTokenType}
                name={name}
                BaseUrl={BaseUrl}
                navigate={navigate}
              />
            }
          />
          <Route
            exact
            path='/delete-profile'
            element={
              <DeleteProfile
                authToken={authToken}
                authTokenType={authTokenType}
                name={name}
                userId={userId}
                BaseUrl={BaseUrl}
                navigate={navigate}
                userType={userType}
                logOut={logOut}
              />
            }
          />
          <Route
            exact
            path='/admin'
            element={
              <Admin
                authToken={authToken}
                authTokenType={authTokenType}
                name={name}
                userId={userId}
                BaseUrl={BaseUrl}
                navigate={navigate}
                userType={userType}
              />
            }
          />
          <Route
            exact
            path='/sign-in'
            element={
              <SignIn
                username={username}
                setPassword={setPassword}
                signIn={signIn}
                setUsername={setUsername}
                error={error}
                authToken={authToken}
                navigate={navigate}
              />
            }
          />
          <Route
            exact
            path='/sign-up'
            element={
              <SignUp
                // directLogin={directLogin}
                BaseUrl={BaseUrl}
                navigate={navigate}
                authToken={authToken}
              />
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
