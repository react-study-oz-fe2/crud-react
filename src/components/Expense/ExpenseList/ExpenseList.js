import './ExpenseList.css'
import ExpenseItem from './ExpenseItem/ExpenseItem'
import { MdDelete } from 'react-icons/md'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

const ExpenseList = ({ expenses, setExpenses, handleAlert }) => {
  const handleDelete = (id) => {
    const newExpense = expenses.filter((expense) => expense.id !== id)
    setExpenses(newExpense)
    handleAlert({ type: 'danger', text: '아이템이 삭제되었습니다.' })
  }

  const clearItems = () => {
    setExpenses([])
  }

  const onDragEnd = (result) => {
    if (!result.destination) return

    const newExpenses = Array.from(expenses)
    const [movedExpense] = newExpenses.splice(result.source.index, 1)
    newExpenses.splice(result.destination.index, 0, movedExpense)

    setExpenses(newExpenses)
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todo-list">
          {(provided) => (
            <ul className="list" {...provided.droppableProps} ref={provided.innerRef}>
              {expenses.map((expense, index) => {
                return (
                  <ExpenseItem
                    key={index}
                    index={index}
                    expenses={expenses}
                    setExpenses={setExpenses}
                    expense={expense}
                    handleDelete={handleDelete}
                    handleAlert={handleAlert}
                  />
                )
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
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
