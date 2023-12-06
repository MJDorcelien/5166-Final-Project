// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth, GoogleAuthProvider } from "firebase/auth"
// import { getFirestore, doc, setDoc, serverTimestamp, collection, getDocs, query } from "firebase/firestore"
// import { query } from "express";

const firebaseApp = require('firebase/app')
const initializeApp = firebaseApp

const firestore = require('firebase/firestore')
const { getFirestore, doc, setDoc, serverTimestamp, collection, getDocs, query, onSnapshot} = firestore

const react = require('react')
const { useState, useEffect } = react

const {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId
} = process.env

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBN4BvwT4vEoLCm_ex3ey_ISXPfXStVJv8",
    authDomain: "final-project-ed463.firebaseapp.com",
    projectId: "final-project-ed463",
    storageBucket: "final-project-ed463.appspot.com",
    messagingSenderId: "936352082565",
    appId: "1:936352082565:web:2c6de486daed96dc1ed7ec",
    measurementId: "G-TGVST3MNG9"
//   apiKey: apiKey,
//   authDomain: authDomain,
//   projectId: projectId,
//   storageBucket: storageBucket,
//   messagingSenderId: messagingSenderId,
//   appId: appId,
//   measurementId: measurementId
};

// Initialize Firebase
let app
let firestoreDB

const initializeFirebaseApp = () => {
    app = initializeApp(firebaseConfig)
    firestoreDB = getFirestore()
}

const uploadProcessedData = async () => {
    const dataToUpload = {
        username: fromServer,
        password: hello,
        userID: 12,
        createdAt: serverTimestamp()
    }

    try{
        const document = doc(firestoreDB, "users", "from-server")
        let dataUpdated = await setDoc(document, dataToUpload)
        return dataUpdated
    }
    catch(error){
        console.log(error)
    }
}

const getUsers = async () => {
    
    const usersRef = collection(firestoreDB, "users")
    const data = []
    const query = query(usersRef)

    const docSnap = await getDocs(query)

    docSnap.forEach((doc) => {
        data.push(doc.data)
    })

    return data
}

const getFirebaseApp = () => app

// module.exports = {
//     initializeFirebaseApp,
//     getFirebaseApp,
//     uploadProcessedData,
//     getUsers,
// }

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const auth = getAuth(app)
// export const provider = new GoogleAuthProvider()
// export const db = getFirestore()

module.exports = {
    initializeFirebaseApp,
    uploadProcessedData,
    getUsers,
    getFirebaseApp,
}

// firebase login
// firebase init
// firebase deploy