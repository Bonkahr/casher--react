import React, {useState} from 'react';

import Exp from './exp';

const Expend = ({ expenditures, BaseUrl, authToken, authTokenType }) => {

  const [ credits, setCredits ] = useState(0);
  const [ expenses, setExpenses ] = useState(0);
  const [ totalTransaction, setTotalTransaction ] = useState(0);
  const [moneyAtHand, setMoneyAtHand] = useState(0)

  const requestOptions = {
    method: 'GET',
    headers: new Headers({
      Authorization: authTokenType + ' ' + authToken,
      'Content-Type': 'application/json',
    }),
  };

    fetch(BaseUrl + 'expenditure/transactions', requestOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        setCredits(data.total_credits);
        setExpenses(data.total_expenses);
        setTotalTransaction(data.total_transaction);
        setMoneyAtHand(data.money_at_hand);
      })
      .catch((e) => {});

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
            <Exp
              key={expenditure.id}
              expenditure={expenditure}
              authToken={authToken}
              authTokenType={authTokenType}
              BaseUrl={BaseUrl}
            />
          ))}
        </tbody>
      </table>

      <table className='table'>
        <tbody>
          <tr className='tr-main'>
            <td
              className='table-active text-info'
              colSpan='2'
            >
              Total Transactions
            </td>
            <td
              className='table-active text-info'
              colSpan='2'
            >
              Total Credits
            </td>
            <td
              className='table-active text-info'
              colSpan='2'
            >
              Total Expediture
            </td>

            <td
              className='table-active text-info'
              colSpan='2'
            >
              Money at Hand
            </td>
          </tr>

          <tr>
            <td
              className='table-active'
              colSpan='2'
            >
              {totalTransaction}
            </td>
            <td
              className='table-active'
              colSpan='2'
            >
              {credits}
            </td>

            <td
              className='table-active'
              colSpan='2'
            >
              {expenses}
            </td>

            <td
              className='table-active'
              colSpan='2'
            >
              {moneyAtHand}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Expend;
