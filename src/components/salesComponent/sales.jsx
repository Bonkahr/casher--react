import React from 'react';
import { useEffect, useState } from 'react';

import Sale from './sale';

import './sales.scss';

const Sales = ({ authToken, authTokenType, BaseUrl, navigate, username }) => {
  const [sales, setSales] = useState([]);
  const [error, setError] = useState([]);

  const requestOptions = {
    method: 'GET',
    headers: new Headers({
      Authorization: authTokenType + ' ' + authToken,
      'Content-Type': 'application/json',
    }),
  };

  useEffect(() => {
    fetch(BaseUrl + 'sales/all-sales', requestOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        if (data.length > 10) {
          setSales(data.slice(0, 10));
        } else {
          setSales(data);
        }
      })
      .catch((err) => {
        try {
          err.json().then((errorData) => {
            if (errorData.detail === 'Not authenticated') {
              setError(
                'Kindly navigate to homepage, then come back to your sales page.'
              );
            } else {
              setError(errorData.detail);
            }
          });
        } catch {
          setError('Server error. Try agin later.');
        }
      });
  }, []);

  const handleAddSale = () => {
    navigate('/sales/new-sale');
  };

  // const requestDownload = {
  //   method: 'GET',
  //   headers: new Headers({
  //     Authorization: authTokenType + ' ' + authToken,
  //     'Content-Type': 'application/pdf',
  //   }),
  // };

  // const handleDownload = async () => {
  //   if (!sales.length > 0) {
  //     setError('Create expenditures to request for statement.');
  //     return;
  //   }

  //   fetch(BaseUrl + 'expenditure/statement', requestDownload)
  //     .then((res) => res.blob())
  //     .then((blob) => {
  //       const url = window.URL.createObjectURL(new Blob([blob]));
  //       const link = document.createElement('a');
  //       link.href = url;
  //       link.setAttribute('download', `${username}_statement.pdf`);

  //       document.body.appendChild(link);
  //       link.click();

  //       link.parentNode.removeChild(link);
  //     })
  //     .finally(() => {
  //       setError('');
  //     });
  // };

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
                onClick={handleAddSale}
              >
                Add a new sale
              </button>
            </div>
            {/* {sales.length > 0 && (
              <div className='col'>
                <button
                  className='btn btn-outline-info'
                  onClick={handleDownload}
                >
                  Download statement
                </button>
              </div>
            )} */}
          </div>
        </div>

        {sales.length > 0 && (
          <Sale
            sales={sales}
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

export default Sales;
