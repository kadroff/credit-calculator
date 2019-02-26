import React, { Component } from 'react';
import InputRange from 'react-input-range';

import './Calculator.css';
import 'react-input-range/lib/css/index.css';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountValue: 500000,
      yearsValue: 36,
      rateValue: 15,
      payment: 17333,
      amountStep: 1000,
      rateStep: 0.1,
      paymentStep: 0,
      yearsStep: 12
    };
  }

  handleAmountChange = value => {
    this.setState({ amountValue: value });
    let resultStep = 0;
    if (value < 100000) {
      resultStep = 10000;
    } else if (value < 1000000) {
      resultStep = 50000;
    } else resultStep = 100000;
    this.setState({ amountStep: resultStep });
    document.getElementById('amount').value = this.state.amountValue;
  };
  handleYearChange = value => {
    this.setState({ yearsValue: value });
    let yearsStep = 0;
    if (value < 12) {
      yearsStep = 1;
    } else if (value <= 18) {
      yearsStep = 6;
    } else if (value >= 24) {
      yearsStep = 12;
    }
    this.setState({ yearsStep: yearsStep });
    document.getElementById('years').value = this.state.yearsValue;
  };
  handleRateChange = value => {
    this.setState({ rateValue: value, rateStep: 0.5 });
    document.getElementById('rate').value = this.state.rateValue;
  };
  handelPaymentChange = value => {
    let { yearsValue, rateValue } = this.state;
    let paymentStep = 0;
    rateValue /= 1200;
    const summa = Math.round(
      (value * (1 - Math.pow(1 + rateValue, -yearsValue))) / rateValue
    );
    if (value < 4000) {
      paymentStep = 533;
    } else if (value >= 170000) {
      paymentStep = 3327;
    } else paymentStep = 1000;
    this.setState({ amountValue: summa, paymentStep: paymentStep });
    document.getElementById('amount').value = summa;
    this.payment();
  };

  payment = () => {
    let { amountValue, yearsValue, rateValue, payment } = this.state;
    rateValue /= 1200;
    const paymentValue = Math.round(
      (amountValue * rateValue) / (1 - Math.pow(1 + rateValue, -yearsValue))
    );
    if (payment !== paymentValue) {
      this.setState({ payment: paymentValue });
      document.getElementById('payment').value = paymentValue;
    }
    return paymentValue;
  };

  inputAmountChange = () => {
    let amountValue = document.getElementById('amount').value;
    this.setState({ amountValue: amountValue });
  };

  inputYearsChange = () => {
    let yearsValue = document.getElementById('years').value;
    this.setState({ yearsValue: yearsValue });
  };

  inputRateChange = () => {
    let rateValue = document.getElementById('rate').value;
    this.setState({ rateValue: rateValue });
  };

  inputPaymentChange = () => {
    let paymentValue = document.getElementById('payment').value;
    this.setState({ payment: paymentValue });
  };

  render() {
    let {
      amountValue,
      yearsValue,
      rateValue,
      amountStep,
      yearsStep,
      rateStep
    } = this.state;
    return (
      <div className='calculator'>
        <div className='left-slider'>
          <form className='form-left'>
            <label className='label-left'>Сумма займа:</label>
            <input
              type='text'
              id='amount'
              className='input-left'
              defaultValue='500000'
              name='name'
              onChange={this.inputAmountChange}
            />
          </form>
          <InputRange
            step={amountStep}
            maxValue={5000000}
            minValue={0}
            value={amountValue}
            onChange={this.handleAmountChange}
          />
          <form className='form-left'>
            <label className='label-left'>Срок займа:</label>
            <input
              type='text'
              id='years'
              className='input-left'
              defaultValue='36'
              name='name'
              onChange={this.inputYearsChange}
            />
          </form>
          <InputRange
            step={yearsStep}
            maxValue={240}
            minValue={1}
            value={yearsValue}
            onChange={this.handleYearChange}
            className='input_range'
          />
          <form className='form-left'>
            <label className='label-left'>Процентная ставка:</label>
            <input
              type='text'
              id='rate'
              className='input-left'
              defaultValue='15'
              name='name'
              onChange={this.inputRateChange}
            />
          </form>
          <InputRange
            step={rateStep}
            maxValue={60}
            minValue={15}
            value={rateValue}
            onChange={this.handleRateChange}
            className='input_range'
          />
          <div className='form-left'>
            <p className='type-payment'>Вид платежа:</p>
            <select className='select-payment'>
              <option>аннуитентный</option>
              <option>только проценты</option>
            </select>
          </div>
        </div>
        <div className='right-slider'>
          <form className='form-left'>
            <label className='label-left'>Ежемесячный платеж:</label>
            <input
              type='text'
              className='input-left'
              id='payment'
              name='name'
              defaultValue='17333'
              onChange={this.inputPaymentChange}
            />
          </form>
          <InputRange
            step={1000}
            maxValue={200000}
            minValue={0}
            value={this.payment()}
            onChange={this.handelPaymentChange}
            className='input_range'
          />
          <form className='form-left'>
            <label className='label-left'>Сумма к выплате:</label>
            <input
              type='text'
              className='input-left'
              value={2 + ' ₽'}
              name='name'
            />
          </form>

          <form className='form-left'>
            <label className='label-left'>Переплата процентов:</label>
            <input
              type='text'
              className='input-left'
              value={2 + ' ₽'}
              name='name'
            />
          </form>

          <input type='button' value='График платежей' />
          <input type='button' value='Оставить заявку' />
        </div>
      </div>
    );
  }
}

export default Calculator;
