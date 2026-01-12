import React from 'react'
import "./styles.css";
import { Card, Row } from 'antd';
import Button from '../Button/Button';
function Cards({showIncomeModal,showExpenseModal,income,expense,totalBalance}) {
  return (
    <div>
        <Row className="my-row">
            <Card variant={true} className="my-card" >
                <h2>Current Balance</h2>
                <p>Rs{totalBalance}</p>
                <Button text="Reset Button" blue={true}/>
            </Card>


             <Card variant={true} className="my-card" >
                <h2>Total Income</h2>
                <p>Rs{income}</p>
                <Button text="Add Income" blue={true} onClick={showIncomeModal} />
            </Card>


             <Card variant={true} className="my-card" >
                <h2>Total Expenses</h2>
                <p>Rs{expense}</p>
                <Button text="Add Expense" blue={true} onClick={showExpenseModal} />
            </Card>
            
        </Row>
    </div>
  )
}

export default Cards