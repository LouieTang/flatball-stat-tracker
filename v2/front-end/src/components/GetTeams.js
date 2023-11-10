import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

const GetTeams = () => {

    const [teamsArray, setTeamsArray] = useState(null);

    useEffect(() => {
        onGet();
    }, []);

    const onGet = () => {
        axios.get("http://localhost:5000/teams")
            .then(response => {
                console.log("Success:", response.data);
                setTeamsArray(response.data);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

    return (
        <div>
            <h4>Get Team</h4>
            {teamsArray ? (
                <div>
                    {teamsArray.map((team) => (
                        <div key={team._id}>
                            <Link to={`/teams/${team._id}`}>
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
    )
}

export default GetTeams;