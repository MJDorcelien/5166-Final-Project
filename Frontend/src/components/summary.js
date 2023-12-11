import { useNavigate } from "react-router-dom"
import { useGetBudgets } from "../hooks/useGetBudgets"
import { useGetTransactions } from "../hooks/useGetTransactions"
import NetPie from "./netWorthPie"
import { useGetUserInfo } from "../hooks/useGetUserInfo"

const Summary = ({username}) => {
    const { budgets } = useGetBudgets()
    const { transactions } = useGetTransactions()

    const navigate = useNavigate()
    // const { username } = useGetUserInfo()

    let z = 0
    let y = 0

    budgets.forEach((budget) => {
        y=0
        transactions.forEach((transaction) => {
            if(transaction.budget === "Income"){
                y = y + parseInt(transaction.amount)
            }
            else {
                z = z + parseInt(transaction.amount)
            }
        })
    })

    let x = y-z

    const signOut = async () => {
        try{
            localStorage.clear()
            navigate("/")
        }catch(error){
            console.log(error)
        }
    }

    return(
        <div>
            <h1 data-testid="username">{ username }'s Dashboard</h1>
            <button className="sign-out-button" onClick={signOut}>Sign Out</button>
            <div className="balance">
                <h3>Your Balance</h3>
                {x > 0 
                    ? (
                        <h2 style={{color: "green"}}>${Math.abs(x)}</h2>
                    )
                    : (
                        <h2 style={{color: "red"}}>-${Math.abs(x)}</h2>
                    )}
            </div>
            <div className="Summary">
                <div className="income">
                    <h4>Income</h4>
                    <p>${y}</p>                        
                </div>
                <div className="expenses">
                    <h4>Expenses</h4>
                    <p>${z}</p>
                </div>
                <NetPie/>
            </div>
        </div>
    )
}

export default Summary