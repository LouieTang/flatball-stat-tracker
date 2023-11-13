import React from 'react'
import NavBar from '../components/NavBar'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordReEntry, setPasswordReEntry] = useState("");

    const register = (userData) => {
        return axios.post("http://localhost:5000/users/register", userData)
            .then(response => {
                console.log("Success:", response.data);
                return response.data;
            })
            .catch(error => {
                console.error("Error:", error);
                throw error;
            });
    }


    const onSubmit = async (e) => {
        e.preventDefault();

        if(!username) {
            alert("Please enter your username.");
            return;
        }

        if(!password) {
            alert("Please enter your password.");
            return;
        }

        if(!passwordReEntry) {
            alert("Please confirm your password.");
            return;
        }

        if(password !== passwordReEntry) {
            alert("Your password does not match.");
            return;
        }

        console.log(`Username: ${username}\nPassword: ${password}`);

        const userData = {username, password};
        
        try {
            const isValid = await register(userData);
            console.log(isValid);
            if(isValid) {
                navigate("/login");
            }
            else {
                alert("Server Error");
            }
            setUsername("");
            setPassword("");
            setPasswordReEntry("");
        } catch (error) {
            console.error("Error:", error);
        }
    }
    return (
        <>
            <NavBar />
            <form className="create-user-form" onSubmit={ onSubmit }>
                <div className="form-control">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div className="form-control">
                    <label htmlFor="passwordReEntry">Re-Type Your Password</label>
                    <input type="password" id="passwordReEntry" value={passwordReEntry} onChange={(e) => setPasswordReEntry(e.target.value)} required/>
                </div>
                <input type="submit" value="Register" />
            </form>
            <p>
                Have an account already? <Link to="/login">Login</Link>.
    `       </p>
        </>
    )
}

export default RegisterPage