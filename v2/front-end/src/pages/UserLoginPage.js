import React, {useState} from "react"

const UserLoginPage = () => {

    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const checkValidity = (e) => {
        console.log(userData);
        e.preventDefault();
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