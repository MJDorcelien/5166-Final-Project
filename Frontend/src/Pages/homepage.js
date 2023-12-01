import React from "react";
import { auth, provider } from "../config/firebase-config";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom";
import axios from "axios"

// need to implement sign up
// need to attach user database
const Homepage = () => {

  const navigate = useNavigate()

  const login = async () => {
    const data = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
    };
    axios.post('http://localhost:5000/api/login', data)
        .then(res => {
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            if(res && res.data && res.data.success){
                const token = res.data.token;
                localStorage.setItem('jwt', token);

                // const authInfo = {
                //     userId: user.id,
                //     username: user.username,
                //     isAuth: true,
                // }
                // localStorage.setItem("auth", JSON.stringify(authInfo))

                navigate("/dashboard")
            }
        });
    }

  return (
    <div className="login-page">
      
        <div class="row">
                <label for="username">Username</label>
            <input type="text" name="username" id="username"/>
        </div>

        <div class="row">
            <label for="password">password</label>
            <input type="password" name="password" id="password"/>
        </div>
        <button onClick={login}>Sign in with JWT</button>
    </div>
  );
};

export default Homepage;