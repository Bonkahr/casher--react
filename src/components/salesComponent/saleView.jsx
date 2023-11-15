import React from 'react';

import { Link } from 'react-router-dom';

const SaleView = ({ sale, BaseUrl, authToken, authTokenType, navigate }) => {
  const handleDelete = () => {
    const requestOptions = {
      method: 'DELETE',
      headers: new Headers({
        Authorization: authTokenType + ' ' + authToken,
      }),
    };

    fetch(BaseUrl + `expenditure/delete/${sale.id}`, requestOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .catch((err) => {
        alert('Not allowed');
      })
      .then(() => {
        window.location.reload();
      });
  };

  return (
    <div>
      <h1>IN SALE VIEW</h1>
      <button
        className='btn btn-outline-danger'
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default SaleView;
