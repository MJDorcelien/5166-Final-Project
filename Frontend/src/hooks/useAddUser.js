import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../config/firebase-config"

export const useAddUser = () => {
    const userCoRef = collection(db, "users")

    const addUser = async ({username, password, userID}) => {
        await addDoc(userCoRef, {
            username: username,
            password: password,
            userID: userID,
            createdAt: serverTimestamp()
        })
    }

    return { addUser }
}