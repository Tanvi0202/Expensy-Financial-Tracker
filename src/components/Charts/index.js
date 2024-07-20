import React from 'react'
import { Line, Pie } from '@ant-design/charts'
import { Card, Row ,Col} from 'antd'
import './styles.css'


function Charts ({ sortedTransactions }) {
  const data = sortedTransactions
    .filter(item => item.type === 'income')
    .map(item => ({
      date: item.date,
      amount: item.amount
    }))

  let spendingData = sortedTransactions
    .filter(item => item.type === 'expense')
    .map(item => ({
      tag: item.tag,
      amount: item.amount
    }))

  const config = {
    data: data,
    autofit: true,
    // width: ,
    maxWidth:900,
    height:350,
    smooth: true,
   display:'flex',
   
    xField: 'date',
    yField: 'amount',
    point: {
      size: 5,
      shape: 'diamond'
    },
    label: {
      style: {
        fill: '#aaa'
      }
    },
   
  }
  let finalspendings = spendingData.reduce((acc, obj) => {
    let key = obj.tag
    if (!acc[key]) {
      acc[key] = { tag: obj.tag, amount: obj.amount }
    } else {
      acc[key].amount += obj.amount
    }
    return acc
  }, {})

  const spendingconfig = {
    data: Object.values(finalspendings),
    width: 380,
    angleField: 'amount',
    colorField: 'tag',
    height: 360,  
       autoFit: true,
  }
  const cardStyle = {
    boxShadow: '0px 0px 30px 8px rgba(227, 227, 227, 0.75)',
    margin: '2rem',
    borderRadius: '0.5rem',
    minWidth: '400px',
    flex: 1,
    height:'450px'
   
  }

  let chart
  let pieChart
  return (
    

    <>
      <Row gutter={16} style={{ display: 'flex', justifyContent: 'center' }}>
          
        <Card bordered={true} style={cardStyle} >
          <h2 style={{ marginTop: 0 }}>Income Analysis</h2>
          <Line
            {...config}
            onReady={chartInstance => (chart = chartInstance)}
          />
          </Card>
        

        <Card bordered={true} style={{ ...cardStyle, flex: 0.5 ,display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <h2 style={{ marginTop: '0.8rem' ,textAlign:'center'}}>Your Spendings</h2>
          

          <Pie
            {...spendingconfig}
            onReady={chartInstance => (pieChart = chartInstance)}
          />
          
            

          </Card>
          
      </Row>
    </>
  )
}
export default Charts
