import './ExpenseList.css'
import ExpenseItem from './ExpenseItem/ExpenseItem'
import { MdDelete } from 'react-icons/md'

const ExpenseList = ({ expenses, setExpenses, handleAlert }) => {
  const handleDelete = (id) => {
    const newExpense = expenses.filter((expense) => expense.id !== id)
    setExpenses(newExpense)
    handleAlert({ type: 'danger', text: '아이템이 삭제되었습니다.' })
  }

  const handleEdit = (id) => {
    const expense = expenses.find((item) => item.id === id)
  }

  const clearItems = () => {
    setExpenses([])
  }

  return (
    <>
      <ul className="list">
        {expenses.map((expense, index) => {
          return (
            <ExpenseItem
              key={index}
              expense={expense}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          )
        })}
      </ul>
      {expenses.length > 0 ? (
        <button className="btn" onClick={clearItems}>
          목록 지우기
          <MdDelete className="btn-icon" />
        </button>
      ) : null}
    </>
  )
}

export default ExpenseList
