import React from 'react';
import { useEffect, useState } from 'react';

import Expend from './expend';

import './expenditure.scss';

const Expenditure = ({ authToken, authTokenType }) => {

  const BaseUrl = 'http://127.0.0.1:8000/';

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

  console.log('Im rendering............................');

  return (
    <div>
      <Expend expenditures={expenditures} />
    </div>
  );
};

export default Expenditure;
