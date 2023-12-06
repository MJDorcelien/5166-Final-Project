import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddBudget } from "../hooks/useAddBudget";
import { useGetBudgets } from "../hooks/useGetBudgets";
import { useAddTransaction } from "../hooks/useAddTransaction";
import { useGetTransactions } from "../hooks/useGetTransaction";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import PieChart from "../components/piechart";

const Dashboard = () => {

    const { addBudget } = useAddBudget()
    const { budgets } = useGetBudgets()
    const { addTransaction } = useAddTransaction()
    const { transactions } = useGetTransactions()
    const navigate = useNavigate()
    const { username } = useGetUserInfo()

    const [budgetDescription, setBudgetDescription] = useState("none")
    const [budgetAmount, setBudgetAmount] = useState(0)
    const [transDescription, setTransDescription] = useState("none")
    const [transAmount, setTransAmount] = useState(0)
    const [transBudget, setTransBudget] = useState('none')

    const onSubmitBudgets = async (e) => {
        document.getElementById('budget-description').value = ''
        document.getElementById('budget-amount').value = ''
        e.preventDefault()
        addBudget({
            description: budgetDescription,
            amount: budgetAmount
        })
    }

    const onSubmitTrans = async (e) => {
        e.preventDefault()
        addTransaction({
            description: transDescription,
            amount: transAmount,
            budget: transBudget
        })
        document.getElementById('trans-description').value = ''
    }

    const signOut = async () => {
        try{
            localStorage.clear()
            navigate("/")
        }catch(error){
            console.log(error)
        }
    }

  return (
    <>
        <div className="expense-tracker">
            <div className="container">
                <h1>{ username }'s Dashboard</h1>
                <button className="sign-out-button" onClick={signOut}>Sign Out</button>
                <div className="balance">
                    <h3>Your Balance</h3>
                    <h2>$0.00</h2>
                </div>
                <div className="Summary">
                    <div className="income">
                        <h4>Income</h4>
                        <p>$0.00</p>
                    </div>
                    <div className="expenses">
                        <h4>Expenses</h4>
                        <p>$0.00</p>
                    </div>
                </div>
                <h2>Add Budget</h2>
                <form onSubmit={ onSubmitBudgets }>
                    <input 
                        type="text" 
                        placeholder="Name" 
                        required 
                        id="budget-description"
                        onChange={(e) => setBudgetDescription(e.target.value)} />
                    <input 
                        type="number" 
                        placeholder="Amount" 
                        required 
                        id="budget-amount"
                        onChange={(e) => setBudgetAmount(e.target.value)} />
                    
                    <button type="submit">Add Budget</button>
                </form>

                <h2>Add Transaction</h2>
                <form onSubmit={ onSubmitTrans }>
                    <input 
                        type="text" 
                        placeholder="Description" 
                        required 
                        id="trans-description"
                        onChange={(e) => setTransDescription(e.target.value)} 
                        />
                    <input 
                        type="number" 
                        placeholder="Amount" 
                        required 
                        id="trans-amount"
                        onChange={(e) => setTransAmount(e.target.value)} 
                        />
                    <select id="trans-budgets" required onChange={(e)=> setTransBudget(e.target.value)}>
                        <option value="Income">Income</option>
                        <option value="No budget">No Budget</option>
                        {budgets.map((budget) => {
                            const {description} = budget
                            return(
                                <option value={description}>{description}</option>
                            )
                        })}
                    </select>

                    <button type="submit">Add Transaction</button>
                </form>
            </div>
        </div>
        <div className="transactions">
            <h3>Transactions</h3>
            <ul>
                {transactions.map((transaction) => {
                    const {description, amount, budget} = transaction
                    return (
                        <p>{description}: ${amount} for <label style={{color: budget === 'Income' ? "green" : "red"}}>{budget}</label></p>
                    )
                })}
            </ul>
        </div>
        <div>
            <h2>Transactions PieChart</h2>
            <p><PieChart/></p>
        </div>
    </>
  );
};

export default Dashboard;