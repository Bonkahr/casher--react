import React, { useState } from 'react';

import './newExpenditure.scss';

const NewExpenditure = (BaseUrl, authToken, authTokenType) => {
  const [moneyType, setMoneyType] = useState('');
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleMoneyType = (e) => {
    setMoneyType(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();

    // const formData = new FormData();
    // formData.append();
    // formData.append();
    // formData.append();
    // formData.append()

    const jsonString = JSON.stringify({
      money_type: moneyType,
      amount: amount,
      description: description,
      paid_on: date,
    });

    const requestOptions = {
      method: 'POST',
      headers: new Headers({
        Authorization: authTokenType + ' ' + authToken,
        'Content-Type': 'application/json',
      }),
      body: jsonString,
    };

    fetch(BaseUrl + 'expenditure', requestOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        window.scrollTo(0, 0);
      });
  };

  return (
    <div className='container new-expen'>
      <h3 className='text-primary'>Create a new expenditure.</h3>
      <form>
        <div className='col-md-4 margin-sm'>
          <label
            htmlFor='money-type'
            className='form-label'
          >
            Money Type:
          </label>
          <select
            className='form-select'
            id='state'
            required=''
            value={moneyType}
            onChange={handleMoneyType}
          >
            <option>credit</option>
            <option>expense</option>
          </select>
        </div>

        <div className='col-md-3 margin-sm'>
          <label
            htmlFor='amount'
            className='amount'
          >
            Amount:
          </label>
          <input
            type='text'
            className='form-control'
            id='amount'
            placeholder=''
            required=''
            value={amount}
            onChange={handleAmount}
          />
        </div>

        <div className='mb-6 margin-sm'>
          <label
            htmlFor='exampleFormControlTextarea1'
            className='form-label'
          >
            Description
          </label>
          <textarea
            className='form-control'
            id='exampleFormControlTextarea1'
            rows='3'
            value={description}
            onChange={handleDescription}
          ></textarea>
        </div>

        <div
          id='paid-on'
          className='md-form md-outline input-with-post-icon datepicker margin-sm'
          inline='true'
        >
          <label htmlFor='paid-on'>Transacted on: </label>
          <input
            placeholder='YYYY-MM-DD (2023-09-27)'
            type='text'
            id='example'
            className='form-control'
            value={date}
            onChange={handleDate}
          />
          <i className='fas fa-calendar input-prefix'></i>
        </div>

        <button
          className='btn btn-primary margin-sm'
          type='submit'
          onClick={handleSubmit}
        >
          Button
        </button>
      </form>
    </div>
  );
};

export default NewExpenditure;
