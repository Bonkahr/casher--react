import React from 'react';
import { Link } from 'react-router-dom';

const Sal = ({ sale, BaseUrl, authToken, authTokenType, navigate }) => {
  // const t_a = sale.created_on.split(/[-T:]/);

  // const y_m_d = t_a[0] + '-' + t_a[1] + '-' + t_a[2];
  // const time = t_a[3] + ':' + t_a[4];

  const handleView = () => {
    navigate();
  };

  const handleDelete = () => {
    const requestOptions = {
      method: 'DELETE',
      headers: new Headers({
        Authorization: authTokenType + ' ' + authToken,
      }),
    };

    fetch(BaseUrl + `sales/${sale.id}`, requestOptions)
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
    <tr key={sale.id}>
      <td>{sale.item}</td>
      <td>{sale.sell_amount}</td>
      <td>{sale.profit}</td>
      <td>{sale.mode_of_payment}</td>
      <td>{sale.balance}</td>
      <td>
        {sale.sold_on}
        {/* {y_m_d} : {time} */}
      </td>
      <td className='btn-col'>
        <Link
          className='btn btn-link text-success'
          to='/sale-view'
          onClick={handleView}
        >
          View
        </Link>

        <button
          className='btn btn-link text-danger'
          onClick={handleDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Sal;
