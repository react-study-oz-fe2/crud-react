import { MdSend } from 'react-icons/md'
import './ExpenseForm.css'
import { useState } from 'react'

const ExpenseForm = ({ setExpenses, handleAlert }) => {
  const [expense, setExpense] = useState({
    charge: '',
    amount: 0,
  })

  const handleInput = (e) => {
    setExpense((expense) => ({
      ...expense,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { charge, amount } = expense

    if (charge !== '' && amount > 0) {
      const newExpense = { id: crypto.randomUUID(), charge, amount }
      setExpenses((expenses) => [...expenses, newExpense])
      handleAlert({ type: 'success', text: '아이템이 생성되었습니다.' })
    } else {
      handleAlert({
        type: 'danger',
        text: 'charge는 빈 값일 수 없으며 amount 값은 0보다 커야 합니다.',
      })
    }

    setExpense(() => ({
      charge: '',
      amount: 0,
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge">상품</label>
          <input
            type="text"
            className="form-control"
            id="charge"
            name="charge"
            placeholder="예) 콜라"
            value={expense.charge}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">비용</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            placeholder="예) 100"
            value={expense.amount}
            onChange={handleInput}
          />
        </div>
      </div>
      <button type="submit" className="btn">
        제출
        <MdSend className="btn-icon" />
      </button>
    </form>
  )
}

export default ExpenseForm
