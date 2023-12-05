import './index.css'

const TransactionItem = props => {
  const {title, amount, type, id, onClickDelete, transactionTypeOptions} = props

  const onDelete = () => {
    onClickDelete(id, amount, type)
  }

  const value = transactionTypeOptions.find(each => each.optionId === type)

  return (
    <tr key={id}>
      <td>
        <p>{title}</p>
      </td>
      <td>
        <p>Rs {amount}</p>
      </td>
      <td>
        <p>{value ? value.displayText : 'Unknown Type'}</p>
      </td>
      <td>
        <button type="button" data-testid="delete" onClick={onDelete}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
            className="img"
          />
        </button>
      </td>
    </tr>
  )
}

export default TransactionItem
