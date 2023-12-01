import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../config/firebase-config"

export const useGetTransactions = () => {

    const [transactions, setTransactions] = useState([])
    const transCoRef = collection(db, "transactions")
    // need to change how to get the user id when jwt starts working
    const userId = 1

    const getTransactions = async () => {
        let unsubscribe
        try {
            const queryBudgets = query( 
                transCoRef, 
                where("userID", "==", userId), 
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
