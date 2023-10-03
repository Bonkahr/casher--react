import React from 'react';

const Expend = ({ expenditures }) => {
  return (
    <div>
      <table className='table'>
        <tbody>
          <tr className='tr-main'>
            <td className='table-active'>Money Type</td>
            <td className='table-active'>Amount</td>
            <td
              colSpan='2'
              className='table-active'
            >
              Description
            </td>
            <td className='table-active'>Paid On</td>
            <td className='table-active'>Recorded on</td>
            <td
              className='table-active'
              colSpan='2'
            >
              Action
            </td>
          </tr>

          {expenditures.map((expenditure) => (
            <tr key={expenditure.id}>
              <td>{expenditure.money_type}</td>
              <td>{expenditure.amount}</td>
              <td colSpan='2'>{expenditure.description}</td>
              <td>{expenditure.paid_on}</td>
              <td>{expenditure.timestamp}</td>
              <td className='btn-col'>
                <button className='btn btn-outline-warning'>Modify</button>
                <button className='btn btn-outline-danger'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className='table'>
        <tbody>
          <tr className='tr-main'>
            <td
              className='table-active'
              colSpan='2'
            >
              Totals Credits
            </td>
            <td
              className='table-active'
              colSpan='2'
            ></td>
          </tr>
        </tbody>
      </table>
      <table className='table'>
        <tbody>
          <tr className='tr-main'>
            <td
              className='table-active'
              colSpan='3'
            >
              Totals Expediture
            </td>
            <td
              className='table-active'
              colSpan='2'
            ></td>
          </tr>
        </tbody>
      </table>
      <table className='table'>
        <tbody>
          <tr className='tr-main'>
            <td
              className='table-active'
              colSpan='3'
            >
              Money at Hand
            </td>
            <td
              className='table-active'
              colSpan='2'
            ></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Expend;
