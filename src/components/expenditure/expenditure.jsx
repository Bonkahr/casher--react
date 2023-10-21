import React from 'react';
import { useEffect, useState } from 'react';

import Expend from './expend';

import './expenditure.scss';

const Expenditure = ({ authToken, authTokenType, BaseUrl, navigate }) => {

  // console.log('Auth token: ' + authToken + '\n Bearer: ' + authTokenType);

  const [expenditures, setExpenditures] = useState([]);

  const requestOptions = {
    method: 'GET',
    headers: new Headers({
      Authorization: authTokenType + ' ' + authToken,
      'Content-Type': 'application/json',
    }),
  };

  useEffect(() => {
    fetch(BaseUrl + 'expenditure', requestOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        setExpenditures(data);
      })
      .catch((e) => {});
  }, []);

  const handleAddExpenditure = () => {
    navigate('/expenditures/new-expenditure');
  };

  if (authToken) {
    return (
      <div>
        { expenditures.length > 0 && (
          <Expend
            expenditures={ expenditures }
            BaseUrl={ BaseUrl }
            authToken={ authToken }
            authTokenType={ authTokenType }
            navigate={ navigate }
          />
        ) }

        <button
          className='btn btn-outline-primary'
          onClick={ handleAddExpenditure }
        >
          Add an Expenditure
        </button>
      </div>
    );
  }
};

export default Expenditure;
