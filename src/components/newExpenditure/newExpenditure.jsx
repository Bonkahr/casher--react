import React, { useState } from 'react';

import MyDatePicker from '../consumables/datePicker';

import './newExpenditure.scss';

const NewExpenditure = ({ authToken, authTokenType, navigate, BaseUrl }) => {
  const [moneyType, setMoneyType] = useState('');
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());

  const [error, setError] = useState('');

  const handleMoneyType = (e) => {
    setMoneyType(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleDate = (d) => {
    setDate(d);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();

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
        setError('');
        navigate('/expenditures');
      })
      .catch((err) => {
        try {
          err.json().then((errorData) => {
            if (typeof errorData.detail !== 'string') {
              setError('Kindly fill all fields.');
            } else {
              setError(errorData.detail);
            }
          });
        } catch {
          setError('Server error. Try agin later.');
        }
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
            defaultValue={moneyType}
            onChange={handleMoneyType}
          >
            <option>Choose...</option>
            <option value='credit'>credit</option>
            <option value='expense'>expense</option>
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
          <MyDatePicker
            label='Transacted on'
            value={date}
            onChange={handleDate}
          />
        </div>

        {error && (
          <div className='error'>
            <p className='text-danger'>{error}</p>
          </div>
        )}

        <button
          className='btn btn-primary margin-sm'
          type='submit'
          onClick={handleSubmit}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default NewExpenditure;
