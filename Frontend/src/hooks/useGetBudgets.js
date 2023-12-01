import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../config/firebase-config"

export const useGetBudgets = () => {

    const [budgets, setBudgets] = useState([])
    const budgetsCoRef = collection(db, "budgets")
    // need to change how to get the user id when jwt starts working
    const userId = 1

    const getBudgets = async () => {
        let unsubscribe
        try {
            const queryBudgets = query( 
                budgetsCoRef, 
                where("userID", "==", userId), 
                orderBy("createdAt"))

            unsubscribe = onSnapshot(queryBudgets, (snapshot) => {
                let docs = []
                snapshot.forEach((doc) => {
                    const data = doc.data()
                    const id = doc.id

                    docs.push({...data, id})
                })
                setBudgets(docs)
            })
        } catch(error) {
            console.log(error)
        }

        return () => unsubscribe()
    }
    useEffect(() => {
        getBudgets()
    }, [])
    
    return { budgets }
}
