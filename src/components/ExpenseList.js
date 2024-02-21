import './ExpenseList.css'
import ExpenseItem from './ExpenseItem'
import { MdDelete } from 'react-icons/md'

const ExpenseList = ({
  expenses,
  initialExpenses,
  handleDelete,
  handleEdit,
  clearItems,
}) => {
  return (
    <>
      <ul className="list">
        {initialExpenses.map((expense, index) => {
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
