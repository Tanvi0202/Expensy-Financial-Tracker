import React from 'react'
import './styles.css'
import { Card, Row } from 'antd'
import Button from '../button'

function Cards ({
  currentBalance,
  income,
  expenses,
  showExpenseModal,
  showIncomeModal
}) {
  return (
    <div>
      <Row className='my-row'>
        <Card bordered={true} className='my-card'>
          <h2>Current Balance</h2>
          <p style={{fontSize:'17px'}}>₹{currentBalance}</p>
          <Button  text='Reset Balance' blue={true} />
        </Card>

        <Card bordered={true} className='my-card'>
          <h2>Total Income</h2>
          <p style={{fontSize:'17px'}}>₹{income}</p>
          <Button text='Add Income' blue={true} onClick={showIncomeModal} />
        </Card>

        <Card bordered={true} className='my-card'>
          <h2>Total Expenses</h2>
          <p style={{fontSize:'17px'}}>₹{expenses}</p>
          <Button text='Add Expense' blue={true} onClick={showExpenseModal} />
        </Card>
      </Row>
    </div>
  )
}
export default Cards
