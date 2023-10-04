import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';

import HomePage from './components/homePage/homePage';
import Navbar from './components/navbar/navbar-component';
import SignIn from './components/signIn/signIn';
import SignUp from './components/signUp/signUp';
import Expenditure from './components/expenditure/expenditure';
import Profile from './components/profile/profile';

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

  const directLogin = (username, password) => {
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

        localStorage.setItem('authToken', authToken);
        localStorage.setItem('name', name);
        localStorage.setItem('authTokenType', authTokenType);
        localStorage.setItem('username', username);
        localStorage.setItem('userId', userId);
        localStorage.setItem('userType', userType);

        const now = new Date();
        localStorage.setItem('authTime', now.getTime());

        setError('');
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

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

        localStorage.setItem('authToken', data.access_token);
        localStorage.setItem('name', data.name);
        localStorage.setItem('authTokenType', data.token_type);
        localStorage.setItem('username', data.username);
        localStorage.setItem('userId', data.user_id);
        localStorage.setItem('userType', data.user_type);

        const now = new Date();
        localStorage.setItem('authTime', now.getTime());

        setError('');
      })
      .catch((err) => {
        setError(err);
      });
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
        setUserType(localStorage.getItem('userType'));
      }
    }
  }, []);

  const logOut = (e) => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('name');
    localStorage.removeItem('authTokenType');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    setAuthToken('');
  };

  if (authToken) {
    return (
      <div className='container app'>
        <Router>
          <Navbar
            authToken={authToken}
            name={name}
            logOut={logOut}
          />
          <Expenditure
            authToken={authToken}
            authTokenType={authTokenType}
            BaseUrl={BaseUrl}
          />
          <Routes>
            <Route
              exact
              path='/profile'
              element={<Profile />}
            ></Route>
          </Routes>
        </Router>
      </div>
    );
  }

  return (
    <Router>
      <div className='container app'>
        <Navbar />
        <Routes>
          <Route
            exact
            path='/'
            element={<HomePage />}
          ></Route>
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
              />
            }
          ></Route>
          <Route
            exact
            path='/sign-up'
            element={
              <SignUp
                directLogin={directLogin}
                BaseUrl={BaseUrl}
              />
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
