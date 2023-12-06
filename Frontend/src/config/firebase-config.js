import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

export const apiKey = process.env.apiKey
export const authDomain = process.env.authDomain
export const projectId = process.env.projectId
export const storageBucket = process.env.storageBucket
export const messagingSenderId = process.env.messagingSenderId
export const appId = process.env.appId
export const measurementId = process.env.measurementId

const firebaseConfig = {
    apiKey: "AIzaSyBN4BvwT4vEoLCm_ex3ey_ISXPfXStVJv8",
    authDomain: "final-project-ed463.firebaseapp.com",
    projectId: "final-project-ed463",
    storageBucket: "final-project-ed463.appspot.com",
    messagingSenderId: "936352082565",
    appId: "1:936352082565:web:2c6de486daed96dc1ed7ec",
    measurementId: "G-TGVST3MNG9"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore()