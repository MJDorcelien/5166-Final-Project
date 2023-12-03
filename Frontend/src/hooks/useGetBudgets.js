import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../config/firebase-config"
import { useGetUserInfo } from "./useGetUserInfo"

export const useGetBudgets = () => {

    const [budgets, setBudgets] = useState([])
    const budgetsCoRef = collection(db, "budgets")
    const { userID } = useGetUserInfo()

    const getBudgets = async () => {
        let unsubscribe
        try {
            const queryBudgets = query( 
                budgetsCoRef, 
                where("userID", "==", userID), 
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
