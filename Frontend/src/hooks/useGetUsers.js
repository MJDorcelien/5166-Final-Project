import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../config/firebase-config"

export const useGetUsers = () => {

    const [users, setUsers] = useState([])
    const usersCoRef = collection(db, "users")

    const getUsers = async () => {
        let unsubscribe
        try {
            const queryUsers = query( 
                usersCoRef, 
                orderBy("createdAt"))

            unsubscribe = onSnapshot(queryUsers, (snapshot) => {
                let docs = []
                snapshot.forEach((doc) => {
                    const data = doc.data()
                    const id = doc.id

                    docs.push({...data, id})
                })
                setUsers(docs)
            })
        } catch(error) {
            console.log(error)
        }

        return () => unsubscribe()
    }
    useEffect(() => {
        getUsers()
    }, [])
    
    return { users }
}
