import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../config/firebase-config"

export const useAddSignUpBudget = () => {
    const transCoRef = collection(db, "budgets")

    const addSignUpBudget = async ({description, amount, userID}) => {
        await addDoc(transCoRef, {
            description: description,
            amount: amount,
            userID: userID,
            createdAt: serverTimestamp()
        })
    }

    return { addSignUpBudget }
}