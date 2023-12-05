import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    historyList: [],
    income: 0,
    expenses: 0,
    inputTitle: '',
    inputAmount: '',
    inputType: 'INCOME',
  }

  onAdd = event => {
    event.preventDefault()

    const {inputTitle, inputAmount, inputType} = this.state

    // Convert inputAmount to an integer
    const parsedAmount = parseInt(inputAmount)

    // Create a new history item
    const newHistory = {
      id: uuidv4(),
      title: inputTitle,
      amount: parsedAmount,
      type: inputType,
    }

    // Update historyList and reset input fields
    this.setState(prevState => ({
      historyList: [...prevState.historyList, newHistory],
      inputTitle: '',
      inputAmount: '',
      inputType: 'INCOME',
    }))

    // Update income and expenses based on inputType
    if (inputType === 'INCOME') {
      this.setState(prevState => ({
        income: prevState.income + parsedAmount,
      }))
    } else {
      this.setState(prevState => ({
        expenses: prevState.expenses + parsedAmount,
      }))
    }
  }

  onTitleChange = event => {
    this.setState({inputTitle: event.target.value})
  }

  onAmountChange = event => {
    this.setState({inputAmount: event.target.value})
  }

  onTypeChange = event => {
    this.setState({inputType: event.target.value})
  }

  onClickDelete = (id, amount, type) => {
    this.setState(prevState => {
      const updatedHistoryList = prevState.historyList.filter(
        each => each.id !== id,
      )

      if (type === 'INCOME') {
        return {
          historyList: updatedHistoryList,
          income: prevState.income - parseInt(amount),
        }
      }

      return {
        historyList: updatedHistoryList,
        expenses: prevState.expenses - parseInt(amount),
      }
    })
  }

  render() {
    const {
      historyList,
      income,
      expenses,
      inputTitle,
      inputAmount,
      inputType,
    } = this.state
    const balance = income - expenses

    return (
      <div className="bg-custom">
        <div className="intro">
          <h1 className="intro-head">Hi, Richard</h1>
          <p className="intro-para">
            Welcome back to your <span className="span">Money Manager</span>
          </p>
        </div>
        <ul className="money">
          <MoneyDetails
            key={uuidv4()}
            head="Your Balance"
            para={balance}
            url="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png "
            alt="balance"
            testid="balanceAmount"
            classValue="classValue1"
          />
          <MoneyDetails
            key={uuidv4()}
            head="Your Income"
            para={income}
            url="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
            alt="income"
            testid="incomeAmount"
            classValue="classValue2"
          />
          <MoneyDetails
            key={uuidv4()}
            head="Your Expenses"
            para={expenses}
            url="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
            alt="expenses"
            testid="expensesAmount"
            classValue="classValue3"
          />
        </ul>
        <div className="con2">
          <form className="trans" onSubmit={this.onAdd}>
            <h1 className="trans-head">Add Transaction</h1>
            <label htmlFor="title">TITLE</label>
            <input
              type="text"
              id="title"
              value={inputTitle}
              onChange={this.onTitleChange}
              placeholder="TITLE"
            />
            <label htmlFor="amount">AMOUNT</label>
            <input
              type="text"
              id="amount"
              value={inputAmount}
              onChange={this.onAmountChange}
              placeholder="AMOUNT"
            />
            <label htmlFor="myDropdown">TYPE</label>
            <select
              id="myDropdown"
              value={inputType}
              onChange={this.onTypeChange}
            >
              <option value={transactionTypeOptions[0].optionId}>
                {transactionTypeOptions[0].displayText}
              </option>
              <option value={transactionTypeOptions[1].optionId}>
                {transactionTypeOptions[1].displayText}
              </option>
            </select>
            <button type="submit" data-testid="delete" className="btn">
              Add
            </button>
          </form>
          <div className="trans history">
            <h1 className="trans-head">History</h1>
            <table>
              <thead>
                <tr>
                  <th>
                    <p>Title</p>
                  </th>
                  <th>
                    <p>Amount</p>
                  </th>
                  <th>
                    <p>Type</p>
                  </th>
                  <th>del</th>
                </tr>
              </thead>
              <tbody>
                {historyList.map(history => (
                  <TransactionItem
                    key={history.id}
                    title={history.title}
                    amount={history.amount}
                    type={history.type}
                    id={history.id}
                    onClickDelete={this.onClickDelete}
                    transactionTypeOptions={transactionTypeOptions}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
