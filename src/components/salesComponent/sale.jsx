import React, { useState } from 'react';

import Sal from './sal';
import Transactions from './transactions';

const Sale = ({ sales, BaseUrl, authToken, authTokenType, navigate }) => {
  const [todaySales, setTodaySales] = useState(0);
  const [todayProfits, setTodayProfits] = useState(0);
  const [todayDebpts, setTodayDebpts] = useState(0);
  const [todayPercentageProfit, setTodayPercentageProfit] = useState(0);

  const [weeklySales, setWeeklySales] = useState(0);
  const [weeklyProfits, setWeeklyProfits] = useState(0);
  const [weeklyDebpts, setWeeklyDebpts] = useState(0);
  const [weeklyPercentageProfit, setWeeklyPercentageProfit] = useState(0);

  const [monthlySales, setMonthlySales] = useState(0);
  const [monthlyProfits, setMonthlyProfits] = useState(0);
  const [monthlyDebpts, setMonthlyDebpts] = useState(0);
  const [monthlyPercentageProfit, setMonthlyPercentageProfit] = useState(0);

  const [allSales, setAllSales] = useState(0);
  const [allProfits, setAllProfits] = useState(0);
  const [allDebpts, setAllDebpts] = useState(0);
  const [allPercentageProfit, setAllPercentageProfit] = useState(0);

  const requestOptions = {
    method: 'GET',
    headers: new Headers({
      Authorization: authTokenType + ' ' + authToken,
      'Content-Type': 'application/json',
    }),
  };

  fetch(BaseUrl + 'sales/transaction-hisory', requestOptions)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw res;
    })
    .then((data) => {
      setTodaySales(data.today_sales);
      setTodayProfits(data.today_profits);
      setTodayDebpts(data.today_debpts);
      setTodayPercentageProfit(data.today_perc_profit);

      setWeeklySales(data.weekly_sales);
      setWeeklyProfits(data.weekly_profits);
      setWeeklyDebpts(data.weekly_debpts);
      setWeeklyPercentageProfit(data.weekly_perc_profit);

      setMonthlySales(data.monthly_sales);
      setMonthlyDebpts(data.monthly_debpts);
      setMonthlyProfits(data.monthly_profits);
      setMonthlyPercentageProfit(data.monthly_perc_profit);

      setAllSales(data.all_sales);
      setAllProfits(data.all_profits)
      setAllDebpts(data.all_debpts);
      setAllPercentageProfit(data.all_perc_profit);
    })
    .catch((err) => {});

  return (
    <div>
      <table className='table'>
        <tbody>
          <tr className='tr-main'>
            <td className='table-active'>Item</td>
            <td className='table-active'>Sell Amount</td>
            <td className='table-active'>Profit</td>
            <td className='table-active'>Payment Mode</td>
            <td
              className='table-active'
            >
              Balance
            </td>
            <td className='table-active'>Transaction on</td>
            <td
              className='table-active'
              colSpan='2'
            >
              Action
            </td>
          </tr>

          {sales.map((sale) => (
            <Sal
              key={sale.id}
              sale={sale}
              authToken={authToken}
              authTokenType={authTokenType}
              BaseUrl={BaseUrl}
              navigate={navigate}
            />
          ))}
        </tbody>
      </table>

      {sales.length > 0 && (
        <div>
          <h3 className='text-center text-primary'>Transaction History</h3>

          {todaySales > 0 && (
            <Transactions
              title='Today transactions'
              totalSales={todaySales}
              totalDebpts={todayDebpts}
              totalProfits={todayProfits}
              percentageProfit={todayPercentageProfit}
            />
          )}

          <Transactions
            title='Weekly transactions'
            totalSales={weeklySales}
            totalDebpts={weeklyDebpts}
            totalProfits={weeklyProfits}
            percentageProfit={weeklyPercentageProfit}
          />
          <Transactions
            title='Monthy transactions'
            totalSales={monthlySales}
            totalDebpts={monthlyDebpts}
            totalProfits={monthlyProfits}
            percentageProfit={monthlyPercentageProfit}
          />
          <Transactions
            title='All transactions'
            totalSales={allSales}
            totalDebpts={allDebpts}
            totalProfits={allProfits}
            percentageProfit={allPercentageProfit}
          />
        </div>
      )}
    </div>
  );
};

export default Sale;
