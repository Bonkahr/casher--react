import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <div className='px-4 py-5 my-5 text-center'>
        <h1 className='display-6  text-info'>
          CASHER
        </h1>
        <div className='col-lg-6 mx-auto'>
          <p className='lead mb-4'>
            This app will help you manage you money as you get them. Using this
            app you will be able to record your expenditures and credits. You
            will be able to remember exactly how you used your monies.
          </p>
          <div className='d-grid gap-2 d-sm-flex justify-content-sm-center'>
            <Link
              to='/sign-in'
              type='button'
              className='btn btn-primary btn-lg px-4 gap-3'
            >
              Login
            </Link>
            <Link
              to='/sign-up'
              type='button'
              className='btn btn-info btn-lg px-4'
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
