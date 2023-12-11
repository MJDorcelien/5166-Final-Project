import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../config/firebase-config"
import { useGetUserInfo } from "./useGetUserInfo"

export const useGetTransactions = () => {

    const [transactions, setTransactions] = useState([])
    const transCoRef = collection(db, "transactions")
    const { userID } = useGetUserInfo()

    const getTransactions = async () => {
        let unsubscribe
        try {
            const queryBudgets = query( 
                transCoRef, 
                where("userID", "==", userID), 
                orderBy("createdAt"))

            unsubscribe = onSnapshot(queryBudgets, (snapshot) => {
                let docs = []
                snapshot.forEach((doc) => {
                    const data = doc.data()
                    const id = doc.id

                    docs.push({...data, id})
                })
                setTransactions(docs)
            })
        } catch(error) {
            console.log(error)
        }

        return () => unsubscribe()
    }
    useEffect(() => {
        getTransactions()
    }, [])
    
    return { transactions }
}
