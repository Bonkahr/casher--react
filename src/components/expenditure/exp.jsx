import React from 'react';

const Exp = ({ expenditure, BaseUrl, authToken, authTokenType, navigate}) => {
  
  const t_a = expenditure.time_stamp.split(/[-T:]/);

  const y_m_d = t_a[0] + '-' + t_a[1] + '-' + t_a[2];
  const time = t_a[3] + ':' + t_a[4];

  const handleDelete = () => {
    const requestOptions = {
      method: 'DELETE',
      headers: new Headers({
        Authorization: authTokenType + ' ' + authToken,
      }),
    };

    fetch(BaseUrl + `expenditure/delete/${expenditure.id}`, requestOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .catch(err => {
        alert('Not allowed')
      })
      .then(() => {
        window.location.reload()
    })
  };


  const handleModify = () => {
    navigate('/edit-expenditure')
  };

  return (
    <tr key={expenditure.id}>
      <td>{expenditure.money_type}</td>
      <td>{expenditure.amount}</td>
      <td colSpan='2'>{expenditure.description}</td>
      <td>{expenditure.paid_on}</td>
      <td>
        {y_m_d} : {time}
      </td>
      <td className='btn-col'>
        <button
          className='btn btn-outline-warning'
          onClick={handleModify}
        >
          Modify
        </button>
        <button
          className='btn btn-outline-danger'
          onClick={handleDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Exp;
