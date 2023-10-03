import React from 'react';
import { useState, useEffect } from 'react';

const Expend = ({ expenditures }) => {

  const [ credit, setCredit ] = useState([]);
  const [ expenses, setExpenses ] = useState([]);

  // useEffect(() => {
  //   expenditures.map((exp) => {
  //     if (exp.money_type === 'credit') {
  //       setCredit(exp.amount);
  //     } else if (exp.money_type === 'expense') {
  //       setExpenses(exp.amount);
  //     }
  //     return 0;
  //   })
  // }, [])

  // let totalCredit = 0
  // credit.forEach(el => {
  //   totalCredit += el
  // });

  // let totalExpenses = 0
  // expenses.forEach((el) => {
  //   totalExpenses += el
  // })

  // let moneyAtHand = totalCredit - totalExpenses;



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
          </tr>

          {expenditures.map((expenditure) => (
            <tr>
              <td>{expenditure.money_type}</td>
              <td>{expenditure.amount}</td>
              <td colSpan='2'>{expenditure.description}</td>
              <td>{expenditure.paid_on}</td>
              <td>{expenditure.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className='table'>
        <tbody>
          <tr className='tr-main'>
            <td className='table-active' colSpan='3'>Totals Credits</td>
            <td className='table-active' colSpan='2'></td>
          </tr>
        </tbody>
      </table>
      <table className='table'>
        <tbody>
          <tr className='tr-main'>
            <td className='table-active' colSpan='3'>Totals Expediture</td>
            <td className='table-active' colSpan='2'></td>
          </tr>
        </tbody>
      </table>
      <table className='table'>
        <tbody>
          <tr className='tr-main'>
            <td className='table-active' colSpan='3'>Money at Hand</td>
            <td className='table-active' colSpan='2'></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Expend;
