import React, { useState, useEffect } from 'react';

import MyDatePicker from '../consumables/datePicker';

import './sales.scss';

const NewSale = ({ authToken, authTokenType, navigate, BaseUrl }) => {
  const [item, setItem] = useState('');
  const [bought, setbought] = useState(0);
  const [sell, setSell] = useState(0);
  const [balance, setBalance] = useState(0);
  const [paymentMode, setPaymentMode] = useState('');
  const [transactionCode, setTransactioCode] = useState('');
  const [description, setDescription] = useState('');
  // const [dateValue, setDateValue] = useState('')
  const [date, setDate] = useState('');

  const [error, setError] = useState('');

  const handleItem = (e) => {
    setItem(e.target.value);
  };

  const handleBought = (e) => {
    setbought(e.target.value);
  };

  const handleSell = (e) => {
    setSell(e.target.value);
  };

  const handleBalance = (e) => {
    setBalance(e.target.value);
  };

  const handlePaymentMode = (e) => {
    setPaymentMode(e.target.value);
  };

  const handleTransactionCode = (e) => {
    setTransactioCode(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const itemSold = [
    'Dress',
    'Trouser',
    'Tight',
    'BedSheet',
    'Duvet',
    'Top',
    'Boxer',
    'Panty',
    'Belt',
    'Jacket',
    'Bra',
    'Brazer',
    'Towel',
    'Kimono',
    'Scarf',
    'T-shirt',
  ];

  const handleDate = (d) => {
    setDate(d);
  };

  useEffect(() => {
    if (paymentMode !== 'mobile money') {
      setTransactioCode('N/A');
    }
  }, [paymentMode]);

  const handleSubmit = (e) => {
    e?.preventDefault();

    const jsonString = JSON.stringify({
      item: item,
      bought_amount: bought,
      sell_amount: sell,
      mode_of_payment: paymentMode,
      transaction_code: transactionCode,
      balance: balance,
      description: description,
      sold_on: date,
    });

    const requestOptions = {
      method: 'POST',
      headers: new Headers({
        Authorization: authTokenType + ' ' + authToken,
        'Content-Type': 'application/json',
      }),
      body: jsonString,
    };

    fetch(BaseUrl + 'sales', requestOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        setError('');
        navigate('/sales');
      })
      .catch((err) => {
        try {
          err.json().then((errorData) => {
            setError(errorData.detail);
          });
        } catch {
          setError('Server error. Try agin later.');
        }
      });
  };

  return (
    <div className='container new-expen'>
      <h3 className='text-primary'>Create a new sale.</h3>
      <form>
        <div className='row'>
          <div className='col margin-sm'>
            <label
              htmlFor='item'
              className='form-label'
              required
            >
              Item:
            </label>
            <select
              className='form-select'
              id='mode-payment'
              required={true}
              defaultValue={item}
              onChange={handleItem}
            >
              <option>Choose...</option>
              {itemSold.map((item, i) => (
                <option
                  key={i}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className='col margin-sm'>
            <label
              htmlFor='mode-payment'
              className='form-label'
            >
              Mode of Payment:
            </label>
            <select
              className='form-select'
              id='mode-payment'
              required=''
              defaultValue={paymentMode}
              onChange={handlePaymentMode}
            >
              <option>Choose...</option>
              <option value='cash'>Cash</option>
              <option value='mobile money'>Mobile Transfer</option>
              <option value='gift'>Gift</option>
            </select>
          </div>
        </div>

        <div className='col-md-3 margin-sm'>
          <label
            htmlFor='amount'
            className='amount'
          >
            Bought at:
          </label>
          <input
            type='text'
            className='form-control'
            id='bought'
            placeholder=''
            required=''
            value={bought}
            onChange={handleBought}
          />
        </div>

        {paymentMode !== 'gift' && (
          <>
            <div className='col-md-3 margin-sm'>
              <label
                htmlFor='sold'
                className='amount'
              >
                Sold at:
              </label>
              <input
                type='text'
                className='form-control'
                id='sold'
                placeholder=''
                required=''
                value={sell}
                onChange={handleSell}
              />
            </div>

            <div className='col-md-3 margin-sm'>
              <label
                htmlFor='balance'
                className='amount'
              >
                Balance:
              </label>
              <input
                type='text'
                className='form-control'
                id='balance'
                placeholder=''
                required={true}
                value={balance}
                onChange={handleBalance}
              />
            </div>
            {paymentMode === 'mobile money' && (
              <div className='col-md-3 margin-sm'>
                <label
                  htmlFor='amount'
                  className='amount'
                >
                  Transaction code:
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='transaction-code'
                  placeholder='KCB-AKE5PY4TTJ'
                  required=''
                  value={transactionCode}
                  onChange={handleTransactionCode}
                />
              </div>
            )}
          </>
        )}

        <div className='mb-6 margin-sm'>
          <label
            htmlFor='description'
            className='form-label'
          >
            Description:
          </label>
          <textarea
            className='form-control'
            placeholder="Buyer's name or description of the item sold."
            id='description'
            rows='3'
            value={description}
            onChange={handleDescription}
          ></textarea>
        </div>

        <div
          id='paid-on'
          className='mb-6 margin-sm'
        >
          <MyDatePicker
            label='Transaction on'
            handleDate={handleDate}
            date={date}
          />
        </div>

        {error && (
          <div className='error'>
            <p className='text-danger'>{error}</p>
          </div>
        )}

        <button
          className='btn btn-primary margin-sm new-sale-btn'
          type='submit'
          onClick={handleSubmit}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default NewSale;
