import { useEffect, useState } from 'react'
import ExpenseForm from '../../components/Expense/ExpenseForm/ExpenseForm'
import ExpenseList from '../../components/Expense/ExpenseList/ExpenseList'
import Alert from '../../components/Alert/Alert'
import './CartPage.css'

const CartPage = () => {
  const [expenses, setExpenses] = useState([])
  const [alert, setAlert] = useState({ show: false })

  useEffect(() => {
    const exist = JSON.parse(localStorage.getItem('expenses'))
    if (exist !== null) setExpenses(exist)
  }, [])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text })
    setTimeout(() => {
      setAlert({ show: false })
    }, 5000)
  }

  return (
    <main className="main-container">
      <div className="sub-container">
        {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}
        <h1>장바구니</h1>

        <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem' }}>
          <ExpenseForm handleAlert={handleAlert} setExpenses={setExpenses} />
        </div>

        <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem' }}>
          {expenses.length === 0 ? null : (
            <ExpenseList
              expenses={expenses}
              setExpenses={setExpenses}
              handleAlert={handleAlert}
            />
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'start', marginTop: '1rem' }}>
          <p style={{ fontSize: '2rem' }}>
            총합계:
            <span>
              {expenses
                .reduce((acc, cur) => {
                  return (acc += Number(cur.amount))
                }, 0)
                .toLocaleString()}
              원
            </span>
          </p>
        </div>
      </div>
    </main>
  )
}

export default CartPage
