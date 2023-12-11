import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../config/firebase-config"
import { useGetUserInfo } from "./useGetUserInfo"
import axios from "axios"
import { useGetTransactions } from "./useGetTransactions"
import { useGetBudgets } from "./useGetBudgets"

export const useGetBudgetTransactions = () => {

    const { transactions } = useGetTransactions()
    const { budgets } = useGetBudgets()

    const [transBudgets, setTransBudgets] = useState([])

    const getBudgetTransactions = async () => {
        let unsubscribe
        let x = []

        budgets.forEach((budget) => {
            let y = 0
            transactions.forEach((transaction) => {
                if(budget.description === transaction.budget){
                    y = y + parseInt(transaction.amount)
                }
            })
            x.push({title: budget.description, estimated: budget.amount, actual: y})
        })

        setTransBudgets(x)

        // const trans = [] 
        // await axios.get(`http://localhost:5000/api/transactions`)
        //     .then(res => {
        //         console.log(res.data)
        //         trans.push(res.data())
        //     })

        return () => unsubscribe()
    }

    useEffect(() => {
        getBudgetTransactions()
    }, [])
    
    return { transBudgets }
}
