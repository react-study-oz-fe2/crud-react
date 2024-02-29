import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const DelModal = ({ setModalOpen, expenses, setExpenses }) => {
  const modalRef = useRef(null)
  const [expenseList, setExpenseList] = useState([])
  const allDel = expenseList.every((expense) => expense.checked)

  useEffect(() => {
    setExpenseList(
      expenses.map((expense) => ({
        ...expense,
        checked: false,
      })),
    )
    const handler = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false)
      }
    }

    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  }, [expenses, setModalOpen])

  const handleOptionChange = (id) => {
    const updatedOptions = expenseList.map((expense) =>
      expense.id === id ? { ...expense, checked: !expense.checked } : expense,
    )
    setExpenseList(updatedOptions)
  }

  const handleAll = () => {
    const newexpenseList = expenseList.map((expense) => ({
      ...expense,
      checked: !allDel,
    }))
    setExpenseList(newexpenseList)
  }

  const handelDel = () => {
    const filterd = expenseList.filter((product) => !product.checked)
    setExpenses(filterd)
    setModalOpen(false)
  }

  return (
    <>
      <BackdropContainer />
      <Container ref={modalRef}>
        <CloseBtn onClick={() => setModalOpen(false)}>X</CloseBtn>
        <Div>
          <label style={{ marginTop: '20px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              style={{ marginRight: '10px' }}
              checked={allDel}
              onChange={() => handleAll()}
            />
            전체 선택
          </label>
        </Div>
        {expenseList &&
          expenseList.map((expense) => (
            <Div key={expense.id}>
              <Label ischecked={`${expense.checked}`}>
                {expense.checked && <HorizontalLine />}
                <input
                  type="checkbox"
                  checked={expense.checked}
                  onChange={() => handleOptionChange(expense.id)}
                />
                <span>{expense.charge}</span>
                <span>{expense.amount}</span>
              </Label>
            </Div>
          ))}

        <DelBtn onClick={handelDel}>목록 지우기</DelBtn>
      </Container>
    </>
  )
}

export default DelModal

const BackdropContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(130, 130, 130, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 998;
`

export const Container = styled.div`
  width: 300px;
  height: 500px;
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border: none;
  border-radius: 8px;
  padding: 30px;
  box-sizing: border-box-box;
`

export const Div = styled.div`
  width: 240px;
  height: 35px;
  font-size: 1rem;
  margin: 10px 0;
`

export const Label = styled.label.withConfig({
  shouldForwardProp: (prop) => prop !== 'ischecked',
})`
  position: relative;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.ischecked === 'true' ? 'rgba(255, 0, 0, 0.2)' : 'none'};
  cursor: pointer;
`

export const HorizontalLine = styled.div`
  position: absolute;
  left: 50%;
  bottom: 50%;
  transform: translateX(-50%);
  width: 90%;
  height: 1px;
  border-bottom: 3px dotted rgba(255, 0, 0, 0.5);
`

export const CloseBtn = styled.button`
  position: absolute;
  right: 15px;
  top: 15px;
  border: none;
  outline: none;
  background: none;
  font-size: 1.1rem;
  cursor: pointer;
`

export const DelBtn = styled.button`
  position: absolute;
  bottom: 30px;
  width: 240px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.5px;
  border: none;
  border-radius: 2px;
  height: 36px;
  padding: 0 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background-color: var(--primaryColor);
  cursor: pointer;
`
