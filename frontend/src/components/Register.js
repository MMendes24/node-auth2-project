import React, { useState } from 'react'
import axiosWithAuth from '../utils/axiosWithAuth'

const intialFormValues = {
    "username": "",
    "password": "",
    "department": "",
}

const Register = (props) => {
   const { users, setUsers } = props
    const [formValues, setFormValues] = useState(intialFormValues)


    const onInputChange = e => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()

        const newUser = {
            username: formValues.username,
            password: formValues.password,
            department: formValues.department
        }
        console.log(newUser)

        axiosWithAuth()
        .post('/auth/register', newUser)
        .then(res=> {
            setUsers([...users, res.data])
        })
        .catch(err => {
            console.error(`this ain't it chief`)
        })
    }

    return (
        <form onSubmit={onSubmit}>
            <label>Username:&nbsp;
                <input
                    name='username'
                    type='text'
                    value={formValues.username}
                    onChange={onInputChange}
                />
            </label>

            <label>Password:&nbsp;
                <input
                    name='password'
                    type='text'
                    value={formValues.password}
                    onChange={onInputChange}
                />
            </label>

            <label>Department:&nbsp;
                <input
                   name='department'
                   type='text'
                   value={formValues.department}
                   onChange={onInputChange}
                />
            </label>
            <button>Submit</button>
        </form>
    )
}

export default Register