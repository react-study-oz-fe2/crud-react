import { useEffect, useState } from 'react'
import './ExpenseItem.css'
import { MdDelete, MdEdit } from 'react-icons/md'
import { FaCheck } from 'react-icons/fa'
import { useRef } from 'react'

const ExpenseItem = ({ expenses, setExpenses, expense, handleDelete, handleAlert }) => {
  const [editedExpense, setEditedExpense] = useState({
    charge: expense.charge,
    amount: expense.amount,
  })
  const [edit, setEdit] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (edit) {
      inputRef.current.focus()
    }
  }, [edit])

  const handleInput = (e) => {
    setEditedExpense((editedExpense) => ({
      ...editedExpense,
      [e.target.name]: e.target.value,
    }))
  }

  const handleEdit = (id) => {
    setEdit(false)

    const expense = expenses.find((item) => item.id === id)
    const newExpense = { ...expense, ...editedExpense }

    const { charge, amount } = expense
    const { charge: editedCharge, amount: editedAmount } = editedExpense

    if (charge !== editedCharge || amount !== editedAmount) {
      const edited = expenses.map((expense) => {
        if (expense.id === id) return newExpense
        return expense
      })
      setExpenses(edited)
      handleAlert({ type: 'success', text: '아이템이 수정되었습니다.' })
    }
  }

  return (
    <li className="item">
      <div
        className="info"
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleEdit(expense.id)
        }}
      >
        {edit ? (
          <>
            <input
              type="text"
              className="edit"
              name="charge"
              ref={inputRef}
              value={editedExpense.charge}
              onChange={handleInput}
            />
            <input
              type="text"
              className="edit"
              name="amount"
              value={editedExpense.amount}
              onChange={handleInput}
            />
          </>
        ) : (
          <>
            <span className="expense">{expense.charge}</span>
            <span className="amount">{expense.amount}</span>
          </>
        )}
      </div>
      <div>
        {edit ? (
          <button className="edit-btn" onClick={(e) => handleEdit(expense.id)}>
            <FaCheck />
          </button>
        ) : (
          <button className="edit-btn" onClick={() => setEdit(true)}>
            <MdEdit />
          </button>
        )}
        <button className="clear-btn" onClick={() => handleDelete(expense.id)}>
          <MdDelete />
        </button>
      </div>
    </li>
  )
}

export default ExpenseItem
