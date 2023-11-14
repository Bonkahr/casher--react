import React from 'react';

import { Link } from 'react-router-dom';

import './navbar-component.scss';

const Navbar = ({ authToken, name, logOut, userType }) => {
  return (
    <header className='d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom'>
      <ul className='nav col-12 col-md-auto mb-2 justify-content-center mb-md-0'>
        {authToken ? (
          <Link
            to='/signed-home'
            className='nav-link px-2 link-secondary'
          >
            CASHER
          </Link>
        ) : (
          <Link
            to='/'
            className='nav-link px-2 link-secondary'
          >
            CASHER
          </Link>
        )}

        {userType === 'admin' && (
          <Link
            to='/admin'
            className='nav-link px-2 link-primary'
          >
            Admin
          </Link>
        )}

        <li>
          <a
            href='/about'
            className='nav-link px-2'
          >
            About
          </a>
        </li>
      </ul>
      {authToken && (
        <div className='col-md-3 text-end'>
          <Link
            className='btn btn-outline-primary me-2'
            to='/profile'
          >
            {name}
          </Link>
          <button
            type='button'
            className='btn btn-outline-danger me-2'
            onClick={() => {
              logOut();
            }}
          >
            Logout
          </button>
        </div>
        ) }
    </header>
  );
};

export default Navbar;
