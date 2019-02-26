import React, { Component } from "react";
import InputRange from "react-input-range";

import "./Calculator.css";
import "react-input-range/lib/css/index.css";

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 500000,
      years: 36,
      rate: 15,
      payment: 17333,
      totalSum: 500000,
      totalPercents: 0
    };
  }

  handleRangeChange(name, value) {
    name === "rate"
      ? this.setState({ [name]: value.toFixed(1) })
      : this.setState({ [name]: value });
    this.calculate();
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.calculate();
  }

  calculate() {
    let { amount, years, rate } = this.state;
    rate = rate / 1200;
    const paymentValue = Math.round(
      (amount * rate) / (1 - Math.pow(1 + rate, -years))
    );
    this.setState({ payment: paymentValue, totalSum: this.state.amount });
  }

  render() {
    return (
      <form className="calculator">
        <div className="left-slider">
          <div className="form-left">
            <label className="label-left">Сумма займа:</label>
            <input
              type="number"
              className="input-left"
              value={this.state.amount}
              lang="en-150"
              name="amount"
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <InputRange
            step={1000}
            maxValue={5000000}
            minValue={0}
            value={this.state.amount}
            onChange={value => this.handleRangeChange("amount", value)}
          />
          <div className="form-left">
            <label className="label-left">Срок займа:</label>
            <input
              type="number"
              className="input-left"
              name="years"
              value={this.state.years}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <InputRange
            step={12}
            maxValue={240}
            minValue={1}
            value={this.state.years}
            onChange={value => this.handleRangeChange("years", value)}
            className="input_range"
          />
          <div className="form-left">
            <label className="label-left">Процентная ставка:</label>
            <input
              type="text"
              className="input-left"
              name="rate"
              value={this.state.rate}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <InputRange
            step={0.1}
            maxValue={60}
            minValue={15}
            value={this.state.rate}
            onChange={value => this.handleRangeChange("rate", value)}
            className="input_range"
          />
          <div className="form-left">
            <p className="type-payment">Вид платежа:</p>
            <select className="select-payment">
              <option>аннуитентный</option>
              <option>только проценты</option>
            </select>
          </div>
        </div>
        <div className="right-slider">
          <div className="form-left">
            <label className="label-left">Ежемесячный платеж:</label>
            <input
              type="text"
              className="input-left"
              name="name"
              value={this.state.payment}
              onChange={e => this.handleRangeChange(e)}
            />
          </div>
          <InputRange
            step={1000}
            maxValue={200000}
            minValue={0}
            value={this.state.payment}
            onChange={value => this.handleRangeChange("payment", value)}
            className="input_range"
          />
          <div className="form-left">
            <label className="label-left">Сумма к выплате:</label>
            <input
              type="text"
              className="input-left"
              readOnly
              value={this.state.totalSum.toLocaleString()}
              name="totalSum"
            />
          </div>

          <div className="form-left">
            <label className="label-left">Переплата процентов:</label>
            <input
              type="text"
              className="input-left"
              readOnly
              value={this.state.totalPercents.toLocaleString()}
              name="totalPercents"
            />
          </div>

          <input type="button" value="График платежей" />
          <input type="button" value="Оставить заявку" />
        </div>
      </form>
    );
  }
}

export default Calculator;
