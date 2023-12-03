import React, { useState } from "react";
import { auth, provider } from "../config/firebase-config";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useAddUser } from "../hooks/useAddUser";

// need to implement sign up
// need to attach user database
const Homepage = () => {

  const navigate = useNavigate()
  const { addUser } = useAddUser()

  const [signUser, setSignUser] = useState()
  const [signPass, setSignPass] = useState()

  const login = async () => {
    const data = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
    };

    const auth = {
      username: document.getElementById('username').value,
      userID: 1
    }
    axios.post('http://localhost:5000/api/login', data)
        .then(res => {
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            if(res && res.data && res.data.success){
                const token = res.data.token;
                localStorage.setItem('jwt', token);

                localStorage.setItem('auth', JSON.stringify(auth))
                navigate("/dashboard")
            }
        });
    }

  const customLogin = async (username, password, userID) => {
    const data = {
      username: username,
      password: password,
      userID: userID
    }

    const auth = {
      username: username,
      userID: userID
    }

    axios.post('http://localhost:5000/api/signup',data)
      .then(res => {
        document.getElementById('signUser').value=''
        document.getElementById('signPass').value=''

        if(res && res.data && res.data.success){
          const token = res.data.token
          localStorage.setItem('jwt', token)

          localStorage.setItem('auth', JSON.stringify(auth))
          navigate('/dashboard')
        }
      })
  }

  const onSubmitSignUp = async (e) => {
    e.preventDefault()
    const userID = Math.random()
    addUser({
        username: signUser,
        password: signPass,
        userID: userID
    })
    console.log(signUser, " ", signPass, " ", userID)
    customLogin(signUser,signPass,userID)
  }

  return (
    <div className="login-page">
      <div className="signup">
          <form onSubmit={ onSubmitSignUp }>
            <input 
                type="text" 
                placeholder="Username" 
                id="signUser"
                required 
                onChange={(e) => setSignUser(e.target.value)}
                />
            <input 
                type="number" 
                placeholder="Password" 
                id="signPass"
                required 
                onChange={(e) => setSignPass(e.target.value)} 
                />
            
            <button type="submit">Sign-Up</button>
        </form>


      </div>
      
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