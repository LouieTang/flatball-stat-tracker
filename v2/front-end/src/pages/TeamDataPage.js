import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from "axios";

const TeamDataPage = () => {
    const { id } = useParams();
    const [teamData, setTeamData] = useState(null);

    useEffect(() => {
       getTeam(id);
    }, []);

    const getTeam = (id) => {
        axios.get(`http://localhost:5000/teams/${id}`)
            .then(response => {
                console.log("Success:", response.data);
                setTeamData(response.data);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    };

    return (
        <div>
            {teamData ? (
                <div>
                    <h2>Team Name: {teamData.teamName}</h2>
                    <p>Team Format: {teamData.teamFormat}</p>
                </div>
            ) : (
                <p>Team With Id: {id} Not Found.</p>
            )}
        </div>
    );
}

export default TeamDataPage