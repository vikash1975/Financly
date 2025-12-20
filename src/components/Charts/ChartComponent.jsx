import React from 'react'
import { Line, Pie } from '@ant-design/charts';
function ChartComponent({sortedTransactions}) {

  const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

const data = sortedTransactions.map((item) => ({
  date: formatDate(item.date),
  amount: item.amount,
}));

const spendingData=sortedTransactions.filter((transaction)=>{
  if(transaction.type=="expense"){
    return {tag:transaction.tag, amount:transaction.amount};
  }
});


const finalSpending=spendingData.reduce((acc,obj)=>{
  let key=obj.tag;
  if(!acc[key]){
    acc[key]={tag:obj.tag, amount:obj.amount};
  }else{
    acc[key].amount+=obj.amount;
  }return acc;
},{});


let newSpendings=[
  {tag:"food",amount:0},
  {tag:"education", amount:0},

  {tag:"other",amount:0}
];

spendingData.forEach((item)=>{
  if(item.tag=="food"){
    newSpendings[0].amount+=item.amount;
  }else if(item.tag=="education"){
    newSpendings[1].amount+=item.amount;
  }else{
    newSpendings[2].amount+=item.amount;
  }
})



   


const config = {
  data:data,
  width: 500,
  height: 400,
  autoFit: true,
  xField: "date",
  yField: "amount",

  xAxis: {
    title: {
      text: "Date",
    },
    label: {
      autoRotate: true,
    },
  },

  yAxis: {
    title: {
      text: "Amount",
    },
  },

  point: {
    size: 5,
    shape: "diamond",
  },

  smooth: true,
};
  
const spendingConfig={
  data:newSpendings,
  width:500,
  angleField:"amount",
  colorField:"tag",
}




  let chart;
  let pieChart;
  return (
    <div className='charts-wrapper'>
     
      <div>
         <h2 style={{marginTop:0}}>Finance Statistics</h2>
        <Line {...config} onReady={(chartInstance)=>(chart=chartInstance)} />
          </div>

           <div>
         <h2>All Expense</h2>
       <Pie {...spendingConfig} onReady={(chartInstance)=>(pieChart=chartInstance)} />
          </div>
    </div>
  );
}

export default ChartComponent;


