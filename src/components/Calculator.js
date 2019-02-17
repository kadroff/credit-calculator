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
      paymentStep: 0
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
    let { amountValue, yearsValue, rateValue, amountStep } = this.state;

    return (
      <div className="App">
        <div className="left-slider">
          <h4>Сумма займа: {amountValue}₽</h4>
          <InputRange
            step={amountStep}
            maxValue={5000000}
            minValue={100000}
            value={amountValue}
            onChange={this.handleAmountChange}
          />
          <h4>Срок займа: {yearsValue}м</h4>
          <InputRange
            step={1}
            maxValue={240}
            minValue={1}
            value={yearsValue}
            onChange={this.handleYearChange}
            className="input_range"
          />
          <h4>Ставка{rateValue}%</h4>
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
          <h4>Выплата {this.payment()}₽</h4>
          <InputRange
            step={1000}
            maxValue={200000}
            minValue={15}
            value={this.payment()}
            onChange={this.handelPaymentChange}
            className="input_range"
          />
        </div>
        {/* <Display years={yearsValue} amount={amountValue} /> */}
      </div>
    );
  }
}

export default Calculator;
