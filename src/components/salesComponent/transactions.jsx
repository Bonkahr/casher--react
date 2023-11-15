import React from 'react';

const Transactions = ({title, totalSales, totalProfits, totalDebpts, percentageProfit }) => {
  return (
    <div>
      <div>
        <h5 className='text-secondary'>{title}</h5>
      </div>
      <table className='table'>
        <tbody>
          <tr className='tr-main'>
            <td
              className='table-active text-info'
              colSpan='2'
            >
              Total Sales
            </td>
            <td
              className='table-active text-info'
              colSpan='2'
            >
              Total Profits
            </td>
            <td
              className='table-active text-info'
              colSpan='2'
            >
              On Credit
            </td>

            <td
              className='table-active text-info'
              colSpan='2'
            >
              Percentage Profit
            </td>
          </tr>

          <tr>
            <td
              className='table-active'
              colSpan='2'
            >
              {totalSales}
            </td>
            <td
              className='table-active'
              colSpan='2'
            >
              {totalProfits}
            </td>

            <td
              className='table-active'
              colSpan='2'
            >
              {totalDebpts}
            </td>

            <td
              className='table-active'
              colSpan='2'
            >
              {percentageProfit} %
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Transactions; 