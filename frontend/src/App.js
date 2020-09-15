import React, { useEffect, useState } from 'react';
import { Switch } from 'react-router-dom'

import Register from './components/Register'
import Login from './components/Login'
import Users from './components/Users'
import axiosWithAuth from './utils/axiosWithAuth'

import './App.css';


const initialUsers = []


function App() {
  const [users, setUsers] = useState(initialUsers)

  useEffect(() => {
    axiosWithAuth()
      .get('/users')
      .then(res => {
        setUsers(res.data)
        console.log(res.data)
      })
      .catch(err => {
        console.error("No can do Pablo")
      })
  }, [])

  return (
    <div className="App">
      <h1>Remember React?</h1>
      <Switch>

        <Register
          users={users}
          setUsers={setUsers}
          path="/register" />

        <Login path="/login" />

        <Users path="/" />
      </Switch>
    </div>
  );
}

export default App;
