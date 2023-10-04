import React from 'react';
import { useEffect, useState } from 'react';

import Expend from './expend';
import NewExpenditure from '../newExpenditure/newExpenditure';

import './expenditure.scss';

const Expenditure = ({ authToken, authTokenType, BaseUrl }) => {
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

  return (
    <div>
      { expenditures.length > 0 &&
        <Expend
          expenditures={ expenditures }
          BaseUrl={ BaseUrl }
          authToken={ authToken }
          authTokenType={ authTokenType }
        />
      }
      <NewExpenditure
        authToken={authToken}
        authTokenType={authTokenType}
      />
    </div>
  );
};

export default Expenditure;
