import React from 'react';
import { useEffect, useState } from 'react';

import Expend from './expend';

import './expenditure.scss';

const Expenditure = ({
  authToken,
  authTokenType,
  BaseUrl,
  navigate,
  username,
}) => {

  const [expenditures, setExpenditures] = useState([]);
  const [error, setError] = useState([]);

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

  const requestDownload = {
    method: 'GET',
    headers: new Headers({
      Authorization: authTokenType + ' ' + authToken,
      'Content-Type': 'application/pdf',
    }),
  };

  const handleDownload = async () => {
    if (!expenditures.length > 0) {
      setError('Create expenditures to request for statement.');
      return;
    }

    fetch(BaseUrl + 'expenditure/statement', requestDownload)
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${username}_statement.pdf`);

        document.body.appendChild(link);
        link.click();

        link.parentNode.removeChild(link);
      })
      .finally(() => {
        setError('');
      });
  };

  if (authToken) {
    return (
      <div>
        {error && (
          <div className='container text-center'>
            <h4 className='text-danger'>{error}</h4>
          </div>
        )}

        <div className='container text-center exp-buttons'>
          <div className='row'>
            <div className='col'>
              <button
                className='btn btn-outline-primary'
                onClick={handleAddExpenditure}
              >
                Add Expenditure
              </button>
            </div>
            <div className='col'>
              <button
                className='btn btn-outline-info'
                onClick={handleDownload}
              >
                Download statement
              </button>
            </div>
          </div>
        </div>

        {expenditures.length > 0 && (
          <Expend
            expenditures={expenditures}
            BaseUrl={BaseUrl}
            authToken={authToken}
            authTokenType={authTokenType}
            navigate={navigate}
          />
        )}
      </div>
    );
  }
};

export default Expenditure;
