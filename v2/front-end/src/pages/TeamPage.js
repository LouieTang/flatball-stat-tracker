import React, {useCallback, useEffect, useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const TeamPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {user} = location.state || {};
    const [teamsArray, setTeamsArray] = useState(null);
    console.log(user);

    useEffect(() => {
        if(user === undefined){
            navigate("/login");
        }
    }, [user, navigate]);

    
    const getTeams = useCallback(() => {
        axios.post("http://localhost:5000/users/teams", {user})
            .then(response => {
                console.log("Success:", response.data);
                setTeamsArray(response.data);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    },[user]);

    useEffect(() => {
        getTeams();
    }, [getTeams]);


    console.log(teamsArray);

    const onClick = (e) => {
        e.preventDefault();

        navigate("/createteam", {state: {user}});
    };

    return (
        <>
            <button onClick={onClick}>Create New Team</button>
        </>
    )
}

export default TeamPage