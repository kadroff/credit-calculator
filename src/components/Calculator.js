import React, { Component } from "react";
import InputRange from "react-input-range";

import "../styles/App.css";
import "react-input-range/lib/css/index.css";

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountValue: 500000,
      yearsValue: 36,
      rateValue: 15,
      payment: 0,
      amountStep: 1000,
      rateStep: 0.5,
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
  };
  handleRateChange = value => {
    this.setState({ rateValue: value });
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
  };

  payment = () => {
    let { amountValue, yearsValue, rateValue } = this.state;
    rateValue /= 1200;
    const payment = Math.round(
      (amountValue * rateValue) / (1 - Math.pow(1 + rateValue, -yearsValue))
    );
    return payment;
  };

  render() {
    let {
      amountValue,
      yearsValue,
      rateValue,
      amountStep,
      yearsStep
    } = this.state;

    return (
      <div className="App">
        <div className="left-slider">
          <form className="form-left">
            <label className="label-left">Сумма займа:</label>
            <input
              type="text"
              className="input-left"
              value={amountValue + " ₽"}
              name="name"
            />
          </form>
          <InputRange
            step={amountStep}
            maxValue={5000000}
            minValue={0}
            value={amountValue}
            onChange={this.handleAmountChange}
          />
          {/* <h5>Срок займа: {yearsValue}м</h5> */}
          <form className="form-left">
            <label className="label-left">Срок займа:</label>
            <input
              type="text"
              className="input-left"
              value={yearsValue + " м."}
              name="name"
            />
          </form>
          <InputRange
            step={yearsStep}
            maxValue={240}
            minValue={1}
            value={yearsValue}
            onChange={this.handleYearChange}
            className="input_range"
          />
          {/* <h5>Ставка{rateValue}%</h5> */}
          <form className="form-left">
            <label className="label-left">Процентная ставка:</label>
            <input
              type="text"
              className="input-left"
              value={rateValue + "%"}
              name="name"
            />
          </form>
          <InputRange
            step={0.5}
            maxValue={60}
            minValue={15}
            value={rateValue}
            onChange={this.handleRateChange}
            className="input_range"
          />
        </div>
        <div className="right-slider">
          <form className="form-left">
            <label className="label-left">Ежемесячный платеж:</label>
            <input
              type="text"
              className="input-left"
              value={this.payment() + " ₽"}
              name="name"
            />
          </form>
          <InputRange
            step={1000}
            maxValue={200000}
            minValue={0}
            value={this.payment()}
            onChange={this.handelPaymentChange}
            className="input_range"
          />
          <form className="form-left">
            <label className="label-left">Сумма к выплате:</label>
            <input
              type="text"
              className="input-left"
              value={2 + " ₽"}
              name="name"
            />
          </form>

          <form className="form-left">
            <label className="label-left">Переплата процентов:</label>
            <input
              type="text"
              className="input-left"
              value={2 + " ₽"}
              name="name"
            />
          </form>

          <input type="button" value="График платежей" />
          <input type="button" value="Оставить заявку" />
        </div>

        {/* <Display years={yearsValue} amount={amountValue} /> */}
      </div>
    );
  }
}

export default Calculator;
