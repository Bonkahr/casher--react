import React from 'react';
import { Link } from 'react-router-dom';

const Sal = ({ sale, navigate }) => {
  const t_a = sale.created_on.split(/[-T:]/);

  const y_m_d = t_a[0] + '-' + t_a[1] + '-' + t_a[2];
  const time = t_a[3] + ':' + t_a[4];

  const handleView = () => {
    navigate();
  };

  return (
    <tr key={sale.id}>
      <td>{sale.item}</td>
      <td>{sale.bought_amount}</td>
      <td>{sale.sell_amount}</td>
      <td>{sale.profit}</td>
      <td colSpan='2'>{sale.description}</td>
      <td>
        {y_m_d} : {time}
      </td>
      <td className='btn-col'>
        <Link
          className='link-offset-2 link-underline link-underline-opacity-10'
          to='/sale-view'
          onClick={handleView}
        >
          View
        </Link>
      </td>
    </tr>
  );
};

export default Sal;
