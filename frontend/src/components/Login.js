import React, { useState } from 'react'
import axiosWithAuth from '../utils/axiosWithAuth'

const initialCredentials = {
    "username": "",
    "password": "",
}

const Login = (props) => {
    const [credentials, setCredentials] = useState(initialCredentials)

    const onInputChange = e => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        axiosWithAuth()
            .post("/auth/login", credentials)
            .then(res => {
                localStorage.setItem("token", res.data.token);
            })
            .catch(err => {
                console.log(err, "You fool! You absolute buffoon!")
            })
        setCredentials(credentials)
    }

    return (
        <form onSubmit={onSubmit}>
            <label>Username:&nbsp;
            <input
                    name='username'
                    type='text'
                    value={credentials.username}
                    onChange={onInputChange}
                />
            </label>

            <label>Password:&nbsp;
            <input
                    name='password'
                    type='text'
                    value={credentials.password}
                    onChange={onInputChange}
                />
            </label>
            <button>Submit</button>
        </form>
    )
}

export default Login