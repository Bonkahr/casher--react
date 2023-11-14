import React from 'react';
import { Link } from 'react-router-dom';

const SignedHome = () => {
  return (
    <div>
      <div className='px-4 py-5 my-5 text-center'>
        <h1 className='display-6  text-info'>CASHER</h1>
        <div className='col-lg-6 mx-auto'>
          <h2 className='lead mb-4'>What do you want to do?</h2>
          <div className='d-grid gap-2 d-sm-flex justify-content-sm-center'>
            <Link
              to='/expenditures'
              type='button'
              className='btn btn-primary btn-md px-4 gap-3'
            >
              Manage my Expeditures
            </Link>
            <Link
              to='#'
              type='button'
              className='btn btn-info btn-md px-4 gap-3'
            >
              Manage my Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignedHome;
