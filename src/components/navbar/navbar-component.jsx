import React from 'react';

import './navbar-component.scss'

const Navbar = ({ authToken, name, logOut}) => {
  return (
    <header className='d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom'>
      <ul className='nav col-12 col-md-auto mb-2 justify-content-center mb-md-0'>
        <li>
          <a
            href='h'
            className='nav-link px-2 link-secondary'
          >
            CASHER
          </a>
        </li>
        <li>
          <a
            href='h'
            className='nav-link px-2'
          >
            Features
          </a>
        </li>
        <li>
          <a
            href='h'
            className='nav-link px-2'
          >
            About
          </a>
        </li>
      </ul>

      {authToken ? (
        <div className='col-md-3 text-end'>
          <button className='btn btn-outline-primary me-2'>Welcome {name}</button>
          <button
            type='button'
            className='btn btn-outline-danger me-2'
            onClick={() => {logOut()}}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className='col-md-3 text-end'>
          <button
            type='button'
            className='btn btn-outline-primary me-2'
          >
            Login
          </button>
          <button
            type='button'
            className='btn btn-primary'
          >
            Sign-up
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
