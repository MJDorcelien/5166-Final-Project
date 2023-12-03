import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../config/firebase-config"
import { useGetUserInfo } from "./useGetUserInfo"

export const useAddTransaction = () => {
    const transCoRef = collection(db, "transactions")
    const { userID } = useGetUserInfo()

    const addTransaction = async ({description, amount, budget}) => {
        console.log(budget)
        await addDoc(transCoRef, {
            description: description,
            amount: amount,
            userID: userID,
            budget: budget,
            createdAt: serverTimestamp()
        })
    }

    return { addTransaction }
}