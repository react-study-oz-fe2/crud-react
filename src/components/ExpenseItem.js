import './ExpenseItem.css'
import { MdDelete, MdEdit, MdSend } from 'react-icons/md'

const ExpenseItem = ({
  expense,
  handleEdit,
  handleDelete,

  id,
  edit,
  charge,
  handleCharge,
  amount,
  handleAmount,
  handleSubmit,
}) => {

  let selectedItem =
    <div className="info">
      <span className="expense">{expense.charge}</span>
      <span className="amount">{expense.amount}</span>
    </div>;

  let selectedItemButton =
    <button className="edit-btn" onClick={() => handleEdit(expense.id)}>
      <MdEdit />
    </button>;

  if (edit && id === expense.id) {
    selectedItem =
      <div className="info">
        <input
          type="text"
          className="expense"
          placeholder={charge}
          id="charge"
          name="charge"
          onChange={handleCharge}
        >
        </input>
        <input
          type="number"
          className="amount"
          placeholder={amount}
          id="amount"
          name="amount"
          onChange={handleAmount}
        >
        </input>
      </div>;
    selectedItemButton =
      <button className="edit-btn" onClick={handleSubmit}>
        <MdSend />
      </button>;
  }

  return (
    <li className="item">
      {selectedItem}
      <div>
        {selectedItemButton}
        <button className="clear-btn" onClick={() => handleDelete(expense.id)}>
          <MdDelete />
        </button>
      </div>
    </li>
  )
}

export default ExpenseItem
