import React, {useState} from "react"
import { testLogin } from "../services/userManager.js";
import { useNavigate } from "react-router-dom";

const UserLoginPage = () => {

    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const checkValidity = async (e) => {
        e.preventDefault();
        const {email, password} = userData;
        const result = await testLogin({email, password});
        // alert(result);
        if(result === "Success"){
            navigate("/team");
        }
    }

    return (
        <>
            <form onSubmit={checkValidity}>
                <label>Email</label>
                <input type="email" placeholder="Email" value={userData.email} onChange={(e) => setUserData({...userData, email: e.target.value})}/>
                <br/>
                <label>Password</label>
                <input type="password" placeholder="Password" value={userData.password} onChange={(e) => setUserData({...userData, password: e.target.value})}/>
                <br/>
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default UserLoginPage;