import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Cards from '../components/Cards/Cards'
// import { useSearchParams } from 'react-router-dom'
import { Modal } from 'antd'
import AddExpenseModal from '../components/Modals/AddExpense'
import AddIncomeModal from '../components/Modals/AddIncome'
import { addDoc, collection, getDocs, query } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { useAuthState } from 'react-firebase-hooks/auth'
import moment from 'moment'
import { auth, db } from '../Firebase'
import TransactionsTable from '../components/TransactionsTable/TransactionsTable'
import ChartComponent from '../components/Charts/ChartComponent'
import NoTransactions from '../components/NoTransactions/NoTransactions'


const Dashboard = () => {
  const [transactions,setTransactions]=useState([]);
  const [loading,setLoading]=useState(false);
  const [user]=useAuthState(auth);
  const [isExpenseModalVisible,setIsExpenseModalVisible]=useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible]=useState(false);
  const [income,setIncome]=useState(0);
  const [expense,setExpense]=useState(0);
  const [totalBalance,setTotalBalance]=useState(0);


  const showExpenseModal=()=>{
    setIsExpenseModalVisible(true);
  };

 const showIncomeModal=()=>{
  setIsIncomeModalVisible(true);
 };

 const handleExpenseCancel=()=>{
  setIsExpenseModalVisible(false);
 };

 const handleIncomeCancel=()=>{
  setIsIncomeModalVisible(false);
 };
const onFinish = (values, type) => {
  console.log("Form values:", values); // 🔍 debug

  const newTransaction = {
    name: values.name,
    amount: parseFloat(values.amount),
   date: values.date.format("YYYY-MM-DD"),
    tag: values.category,
    type: type,
  };

  addTransaction(newTransaction);
};


async function addTransaction(transaction,many){
  try {
    const docRef=await addDoc(
      collection(db, `users/${user.uid}/transactions`),
      transaction
    );

  console.log("Document written with ID: ",docRef.id);
  if(!many) toast.success("Transaction Added!");

  setTransactions((prev)=>[...prev,{id:docRef.id,...transaction}]);
  // calculateBalance();
  
  } catch (err) {
    console.error("Error adding document: ",err);
   if(!many) toast.error("Couldn't add transaction");
    
  }
}

useEffect(()=>{
  if(user){
    fetchTransactions();
  }
},[user]);


useEffect(()=>{
  calculateBalance();
},[transactions]);

const calculateBalance=()=>{
  let incomeTotal=0;
  let expenseTotal=0;

  transactions.forEach((transaction)=>{
    if(transaction.type==="income"){
      incomeTotal+=transaction.amount;
    }else{
      expenseTotal+=transaction.amount;
    }
  });

  setIncome(incomeTotal);
  setExpense(expenseTotal);
  setTotalBalance(incomeTotal-expenseTotal);
};

async function fetchTransactions() {
  setLoading(true);
  if(user){
    const q=query(collection(db,`users/${user.uid}/transactions`));
    const querySnapshot=await getDocs(q);
    let transactionsArray=[];
    querySnapshot.forEach((doc)=>{
    transactionsArray.push({ id:doc.id,...doc.data(),

    });
    });
    setTransactions(transactionsArray);
    console.log("Transactions array:",transactionsArray);
    
    toast.success("Transactions Fetched!");
  }
  setLoading(false);
}



let sortedTransactions=transactions.sort((a,b)=>{
   return new Date(a.date)-new Date(b.date);
})

  return (
    <div>
      <Header />
{ loading ? 

(<p>Loading...</p>):(
      <>
      <Cards 
              income={income}
              expense={expense}
              totalBalance={totalBalance}
              showExpenseModal={showExpenseModal}
              showIncomeModal={showIncomeModal}
              />

             {transactions.length!=0?<ChartComponent sortedTransactions={sortedTransactions}/>:<NoTransactions />}

        <AddExpenseModal
                  isExpenseModalVisible={isExpenseModalVisible}
                  handleExpenseCancel={handleExpenseCancel}
                  onFinish={onFinish} />

                  <AddIncomeModal 
                              isIncomeModalVisible={isIncomeModalVisible}
                              handleIncomeCancel={handleIncomeCancel}
                              onFinish={onFinish} />   

                  <TransactionsTable transactions={transactions} 
                                    addTransaction={addTransaction}
                                    fetchTransactions={fetchTransactions}
                                     />               

      </>
      )}

    </div>
  )
}

export default Dashboard