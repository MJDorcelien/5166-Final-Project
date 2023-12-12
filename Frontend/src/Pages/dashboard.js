import React, { useState } from "react";
import { useAddBudget } from "../hooks/useAddBudget";
import { useGetBudgets } from "../hooks/useGetBudgets";
import { useAddTransaction } from "../hooks/useAddTransaction";
import { useGetTransactions } from "../hooks/useGetTransactions";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import ExpensesPie from "../components/expensesPie";
import IncomePie from "../components/incomePie";
import Summary from "../components/summary";
import axios from "axios";
import { useGetBudgetTransactions } from "../hooks/useGetBudgetTransactions";

const Dashboard = () => {

    const { addBudget } = useAddBudget()
    const { budgets } = useGetBudgets()
    const { addTransaction } = useAddTransaction()
    const { transactions } = useGetTransactions()
    const { username } = useGetUserInfo()
    const { transBudgets } = useGetBudgetTransactions()

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

    const verifyingToken = async () => {
        await axios.post('http://localhost:5000/api/login',JSON.parse(localStorage.getItem("auth")))
            .then(res => {
            })
    }

    verifyingToken()

  return (
    <>
        <div className="expense-tracker">
            <div className="container">
                <Summary username={username}/>
                <h2>Budgets</h2>
                <h3>Current Budgets</h3>
                <ul>
                    {transBudgets.map((budget) => {
                        let remaining = 0
                        const { title, estimated, actual } = budget
                        remaining = estimated- actual
                        return (
                            <div>
                                { title !== "Income"
                                    ? (
                                        <div>
                                            <h4>{title}</h4>
                                            <li>budget: ${estimated}</li>
                                            <li>spent: ${actual}</li>
                                            { remaining > 0
                                                ? (
                                                    <li>amount remaining: <label style={{color: "green"}}>${remaining}</label></li>
                                                )
                                                : (
                                                    <li>amount remaining: <label style={{color: "red"}}>-${Math.abs(remaining)}</label></li>
                                                )}                                            
                                        </div>
                                    )
                                    : (
                                        <div>
                                            <h4>{title}</h4>
                                            <li>budget: ${estimated}</li>
                                            <li>spent: ${actual}</li>
                                            { remaining > 0
                                                ? (
                                                    <li>You've made <label style={{color: "green"}}>${remaining}</label>!!!!!</li>
                                                )
                                                : (
                                                    <li>You've made <label style={{color: "green"}}>${Math.abs(remaining)}</label> more than you were expecting!!!!!!</li>
                                                )}
                                        </div>
                                    )}
                            </div>
                        )
                    })}
                </ul>
                <h3>Add a Budget</h3>
                <form onSubmit={ onSubmitBudgets }>
                    <label htmlFor="budget-description">Budget Name:</label>
                    <input 
                        type="text" 
                        placeholder="Name" 
                        required 
                        id="budget-description"
                        onChange={(e) => setBudgetDescription(e.target.value)} />
                    <label htmlFor="budget-amount">Budget Amount:</label>
                    <input 
                        type="number" 
                        placeholder="Amount" 
                        required 
                        id="budget-amount"
                        onChange={(e) => setBudgetAmount(parseInt(e.target.value))} />
                    
                    <button type="submit">Add Budget</button>
                </form>

                <h2>Transactions</h2>
                <h3>Add Transaction</h3>
                <form onSubmit={ onSubmitTrans }>
                    <label htmlFor="trans-description">Transaction Name:</label>
                    <input 
                        type="text" 
                        placeholder="Description" 
                        required 
                        id="trans-description"
                        onChange={(e) => setTransDescription(e.target.value)} 
                        />
                    <label htmlFor="trans-amount">Transaction Amount:</label>
                    <input 
                        type="number" 
                        placeholder="Amount" 
                        required 
                        id="trans-amount"
                        onChange={(e) => setTransAmount(parseInt(e.target.value))} 
                        />
                    <label htmlFor="trans-budgets">Transaction Budget:</label>
                    <select 
                        id="trans-budgets" 
                        required 
                        onChange={(e)=> setTransBudget(e.target.value)}>
                        <option value="none" selected disabled hidden>Select an Option</option> 
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
            <h3>Current Transactions</h3>
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
            <h2>Expenses Chart</h2>
            <p>This section displays all your expenses so you can see where you spend the most money. Your expenses are grouped together by the "Budget" they're associated with.</p>
            <ExpensesPie/>
            <h2>Income Chart</h2>
            <p>This section displays all your income. This way you're able to see where your income is coming from.</p>
            <IncomePie/>
        </div>
    </>
  );
};

export default Dashboard;