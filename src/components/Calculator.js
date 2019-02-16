import React, { Component } from "react";
import InputRange from "react-input-range";
import Display from "./Display";

import "../styles/App.css";
import "react-input-range/lib/css/index.css";

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountValue: 500000,
      yearsValue: 36,
      rateValue: 15,
      payment: 0
    };
  }

  handleAmountChange = value => {
    this.setState({ amountValue: value });
  };
  handleYearChange = value => {
    this.setState({ yearsValue: value });
  };
  handleRateChange = value => {
    this.setState({ rateValue: value });
  };
  handelPaymentChange = value => {
    let { yearsValue, rateValue } = this.state;
    rateValue /= 1200;
    const summa = Math.round(
      (value * (1 - Math.pow(1 + rateValue, -yearsValue))) / rateValue
    );
    this.setState({ amountValue: summa });
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
    let { amountValue, yearsValue, rateValue } = this.state;

    console.log(this.state.payment);
    return (
      <div className="App">
        <h4>Сумма займа: {amountValue}₽</h4>
        <InputRange
          step={100}
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
        />
        <h4>Ставка{rateValue}%</h4>
        <InputRange
          step={0.5}
          maxValue={60}
          minValue={15}
          value={rateValue}
          onChange={this.handleRateChange}
        />
        <h4>Выплата {this.payment()}₽</h4>
        <InputRange
          step={1000}
          maxValue={200000}
          minValue={15}
          value={this.payment()}
          onChange={this.handelPaymentChange}
        />
        {/* <Display years={yearsValue} amount={amountValue} /> */}
      </div>
    );
  }
}

export default Calculator;
