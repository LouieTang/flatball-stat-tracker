import React, {useState} from "react"
import { testRegistration } from "../services/userManager.js";
import { useNavigate } from "react-router-dom";

const UserRegisterPage = () => {

    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        teamName: "",
    });

    const checkValidity = async (e) => {
        e.preventDefault();
        const {email, password, teamName} = userData;
        const result = await testRegistration({email, password, teamName});
        if(result === "User Added Successfully"){
            navigate("/login");
        }
        else{
            console.log("Error");
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
                <label>Team Name</label>
                <input type="text" placeholder="Team Name" value={userData.teamName} onChange={(e) => setUserData({...userData, teamName: e.target.value})}/>
                <br/>
                <button type="submit">Register</button>
            </form>
        </>
    )
}

export default UserRegisterPage;