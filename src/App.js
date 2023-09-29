import React from 'react';
import { useState, useEffect } from 'react';
import './App.scss';

import Navbar from './components/navbar/navbar-component';
import SignIn from './components/signIn/signIn';
import SignUp from './components/signUp/signUp';
import Expenditure from './components/expenditure/expenditure';

function App() {
  const BaseUrl = 'http://127.0.0.1:8000/';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const [authToken, setAuthToken] = useState(null);
  const [authTokenType, setAuthTokenType] = useState(null);
  const [userId, setUserId] = useState(null);
  const [ userType, setUserType ] = useState('');



  useEffect(() => {
    setAuthToken(window.localStorage.getItem('authToken'));
    setAuthTokenType(window.localStorage.getItem('authTokenType'));
    setUsername(window.localStorage.getItem('username'));
    setUserId(window.localStorage.getItem('userId'));
    setUserType(window.localStorage.getItem('userType'));
  }, []);

  useEffect(() => {
    localStorage.setItem('authToken', authToken) 
    localStorage.setItem('authTokenType', authTokenType)
    localStorage.setItem('userId', userId)
    localStorage.setItem('username', username);
    localStorage.setItem('userTye', userType)
  }, [authToken, authTokenType, userId, userType, username]);
  


  const signIn = (e) => {
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
        setAuthTokenType(data.token_type);
        setUserId(data.user_id);
        setUserType(data.user_type);
        setUsername(data.username);
        setName(data.name);
        setError('');
      })
      .catch((err) => {
        setError(err);
      });
  };

  const logOut = (e) => {
    setAuthToken(null);
    setAuthTokenType(null);
    setUserId('');
    setUserType('');
    setUsername('');
    setName('');
  };

  return (
    <div className='container'>
      <Navbar
        authToken={authToken}
        name={name}
        logOut={logOut}
      />

      {authToken ? (
        <div>
          <Expenditure
            authToken={authToken}
            authTokenType={authTokenType}
          />
        </div>
      ) : (
        <>
          <SignIn
            username={username}
            setPassword={setPassword}
            signIn={signIn}
            setUsername={setUsername}
            error={error}
          />
          <SignUp />
        </>
      )}
    </div>
  );
}

export default App;
