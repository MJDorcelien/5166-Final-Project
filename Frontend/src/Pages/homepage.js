import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useAddUser } from "../hooks/useAddUser";
import { useGetUsers } from "../hooks/useGetUsers";
import { useAddSignUpBudget } from "../hooks/useAddSignUpBudget";

const Homepage = () => {

  const navigate = useNavigate()
  const { addUser } = useAddUser()
  const { users } = useGetUsers()
  const { addSignUpBudget } = useAddSignUpBudget()

  const [signUser, setSignUser] = useState('')
  const [signPass, setSignPass] = useState(0)

  const [logUser, setLogUser] = useState('')
  const [logPass, setLogPass] = useState(0)

  const onSubmitSignUp = async (e) => {
    const userID = Math.random()
    addUser({
        username: signUser,
        password: signPass,
        userID: userID
    })

    addSignUpBudget({
      description: "Income",
      amount: 0,
      userID: userID
    })

    users.map((user) => {
      if(user.username === signUser && user.password === signPass){
        alert("This username and password is already in use. Please choose another username and/or password.")
        setSignUser('')
        setSignPass('')
      }
    })

    if(signUser !== '' && signPass !== ''){
      logIn(signUser,signPass,userID)
    }
  }

  const onSubmitLogIn = async (e) => {
    e.preventDefault()
    users.map((user) => {
      if(user.username === logUser && user.password === logPass){
        logIn(logUser, logPass, user.userID)
      }
    })
  }

  const logIn = async (username,password,userID) => {
    const data = {
      username: username,
      password: password,
      userID: userID
    }

    const auth = {
      username: username,
      userID: userID
    }

    await axios.post('http://localhost:5000/api/login',data)
      .then(res => {
        document.getElementById('logUser').value=''
        document.getElementById('logPass').value=''

        if(res && res.data && res.data.success){
          const token = res.data.token
          localStorage.setItem('jwt', token)

          // create loop that shows if jwt is empty, clear local storage and redirect to homepage
          // may or may not have to refresh token

          localStorage.setItem('auth', JSON.stringify(auth))
          navigate(`/dashboard/${userID}`)
        }
      })
  }

  return (
    <div className="login-page">
      <div className="signup">
        <h1>Sign Up:</h1>
          <form onSubmit={ onSubmitSignUp }>
            <label htmlFor="signUser">Username: </label>
            <input 
              type="text" 
              placeholder="Username" 
              id="signUser"
              required 
              onChange={(e) => setSignUser(e.target.value)}
              />
            <label htmlFor="signPass">Password (must be numbers): </label>
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

      <br />

      <h1>Log In: </h1>
      <form onSubmit={ onSubmitLogIn }>
        <label htmlFor="logUser">Username: </label>
        <input 
          type="text" 
          placeholder="Username" 
          id="logUser"
          required 
          onChange={(e) => setLogUser(e.target.value)}
          />
        <label htmlFor="logPass">Password: </label>
        <input 
          type="number" 
          placeholder="Password" 
          id="logPass"
          required 
          onChange={(e) => setLogPass(e.target.value)} 
          />        
        <button type="submit">Log-In</button>
      </form>
    </div>
  );
};

export default Homepage;