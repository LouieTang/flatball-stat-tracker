import React, { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const TeamDataPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [teamData, setTeamData] = useState(null);
    const location = useLocation();
    const {user} = location.state || {};

    useEffect(() => {
        console.log("team user:", user);
        if(user === undefined || user === null){
            navigate("/login");
        }
    }, [user, navigate]);

    useEffect(() => {
       getTeam(id);
    }, [id]);

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