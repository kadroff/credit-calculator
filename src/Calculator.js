import React, { Component } from "react";
import InputRange from "react-input-range";
import Modal from "react-responsive-modal";

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
      totalSum: 623976,
      totalPercents: 123976,
      amountStep: 50000,
      yearsStep: 12,
      amountPayment: 623976,
      overpayment: 123976,
      open: false
    };
  }

  handleRangeChange(name, value) {
    name === "rate"
      ? this.setState({ [name]: value.toFixed(1) })
      : this.setState({ [name]: value });

    if (name === "amount") {
      let resultStep = 0;
      if (value < 1000000) {
        resultStep = 50000;
      } else resultStep = 100000;
      this.setState({ amountStep: resultStep });
    }
    if (name === "years") {
      let yearsStep = 0;
      if (value < 12) {
        yearsStep = 1;
      } else if (value <= 18) {
        yearsStep = 6;
      } else if (value >= 24) {
        yearsStep = 12;
      }
      this.setState({ yearsStep: yearsStep });
    }

    this.calculate(name, value);
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.calculate();
  }

  calculate(name, value) {
    let { amount, years, rate } = this.state;
    let totalPercents = 0;
    let totalSum = 0;
    // Расчет ежемесячного платежа
    rate = rate / 1200;
    const paymentValue = Math.round(
      (amount * rate) / (1 - Math.pow(1 + rate, -years))
    );
    // Расчет суммы займа при изменении платежа
    if (name === "payment") {
      const summa = Math.round(
        (value * (1 - Math.pow(1 + rate, -years))) / rate
      );
      if (summa > 5000000) {
        this.setState({ amount: 5000000, payment: 173327 });
      } else {
        this.setState({ amount: summa });
      }
      if (summa < 300000) {
        this.setState({ amount: 300000, payment: paymentValue });
      }
    }
    totalSum = paymentValue * years;
    totalPercents = totalSum - amount;
    this.setState({
      payment: paymentValue,
      totalSum: totalSum,
      totalPercents: totalPercents
    });
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { amountStep, yearsStep, open } = this.state;
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
            step={amountStep}
            formatLabel={value => `${value.toLocaleString()} ₽`}
            maxValue={5000000}
            minValue={300000}
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
            step={yearsStep}
            formatLabel={value => `${value.toLocaleString()}м.`}
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
            formatLabel={value => `${value.toLocaleString()}% годовых`}
            maxValue={60}
            minValue={6}
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
              value={this.state.payment.toLocaleString()}
              onChange={e => this.handleRangeChange(e)}
            />
          </div>
          <InputRange
            step={1000}
            formatLabel={value => `${value.toLocaleString()} ₽`}
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
              value={this.state.totalSum.toLocaleString() + " ₽"}
              name="totalSum"
            />
          </div>

          <div className="form-left">
            <label className="label-left">Переплата процентов:</label>
            <input
              type="text"
              className="input-left"
              readOnly
              value={this.state.totalPercents.toLocaleString() + " ₽"}
              name="totalPercents"
            />
          </div>

          <input
            type="button"
            onClick={this.onOpenModal}
            value="График платежей"
          />
          <input type="button" value="Оставить заявку" />
          <Modal open={open} onClose={this.onCloseModal} center>
            <h2>Simple centered modal</h2>
          </Modal>
        </div>
      </form>
    );
  }
}

export default Calculator;
