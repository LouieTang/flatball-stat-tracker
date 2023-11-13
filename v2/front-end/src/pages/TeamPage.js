import React, {useCallback, useEffect, useState} from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const TeamPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log("Location:", location);
    const {user} = location.state || {};
    const [teamsArray, setTeamsArray] = useState(null);
    console.log(user);

    useEffect(() => {
        if(user === undefined || user === null){
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

    const onClick = (e) => {
        e.preventDefault();

        navigate("/createteam", {state: {user}});
    };

    return (
        <>
            <button onClick={onClick}>Create New Team</button>
            <div>
            <h4>Your Teams</h4>
            {teamsArray ? (
                <div>
                    {teamsArray.map((team) => (
                        <div key={team._id}>
                            <Link to={`/teams/${team._id}`} state={{ user: user }}>
                                <h3>Team Name: {team.teamName}</h3>
                            </Link>
                            <p>Team Format: {team.teamFormat}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>We May Be Experiencing Server Difficulties At This Moment, Please Check Back Soon.</p>
            )}
        </div>
        </>
    )
}

export default TeamPage