import "./login.scss"
import { useRef } from "react";
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const username = useRef(null);
    const password = useRef(null);
    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('https://adamstankovich.herokuapp.com/Login', {
            method: 'POST',
            body: JSON.stringify({
                username: username.current.value,
                password: password.current.value
            })
        })
            .then(response => response.json())
            .then(json => {
                if (json.success) {
                    return navigate('/admin')
                }
            })
    };

    return (
        <div>
            <form className="loginform" onSubmit={handleSubmit}>
                <label>Username: </label>
                <input className="inputform" ref={username} type="text" placeholder="Enter Username" name="username" required></input>
                <br></br>
                <label>Password: </label>
                <input className="inputform" ref={password} type="password" placeholder="Enter Password" name="password" required></input>
                <br></br>
                <button className="inputform" type="submit" >Login</button>
            </form>
        </div>
    )
}