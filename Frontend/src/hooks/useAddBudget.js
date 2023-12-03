import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../config/firebase-config"
import { useGetUserInfo } from "./useGetUserInfo"

export const useAddBudget = () => {
    const transCoRef = collection(db, "budgets")
    const { userID } = useGetUserInfo()

    const addBudget = async ({description, amount}) => {
        await addDoc(transCoRef, {
            description: description,
            amount: amount,
            userID: userID,
            createdAt: serverTimestamp()
        })
    }

    return { addBudget }
}