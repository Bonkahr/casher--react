import React from 'react';

// import { Link } from 'react-router-dom';

const SaleView = ({ sale, BaseUrl, authToken, authTokenType, navigate }) => {
  // const handleDelete = () => {
  //   const requestOptions = {
  //     method: 'DELETE',
  //     headers: new Headers({
  //       Authorization: authTokenType + ' ' + authToken,
  //     }),
  //   };

  //   fetch(BaseUrl + `expenditure/delete/${sale.id}`, requestOptions)
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       throw res;
  //     })
  //     .catch((err) => {
  //       alert('Not allowed');
  //     })
  //     .then(() => {
  //       window.location.reload();
  //     });
  // };

  return (
    <div>
      <h1>This page is on development</h1>
      <p className='text-info'>Your sale details will show here.</p>
      {/* <button
        className='btn btn-outline-danger'
        onClick={handleDelete}
      >
        Delete
      </button> */}
    </div>
  );
};

export default SaleView;
