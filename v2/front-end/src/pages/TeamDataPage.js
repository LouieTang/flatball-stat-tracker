import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const TeamDataPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [teamData, setTeamData] = useState(null);
    const [team, setTeam] = useState(null);
    const location = useLocation();
    const {user} = location.state || {};
    const [playersArray, setPlayersArray] = useState(null);

    useEffect(() => {
        console.log("team user:", user);
        if(user === undefined || user === null){
            navigate("/login");
        }
    }, [user, navigate]);

    useEffect(() => {
       getTeam(id);
       getPlayers(id);
    }, [id]);

    useEffect(() => {
        if(teamData){
            setTeam(teamData._id);
        }
    }, [teamData]);

    const onClick = (e) => {
        e.preventDefault();

        navigate("/addplayers", {state: {team, user}});
    };

    const startMatch = (e) => {
        e.preventDefault();

        navigate("/newmatch", {state: {team, user, playersArray}});
    }


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

    const getPlayers = (id) => {
        axios.get(`http://localhost:5000/teams/p/${id}`)
            .then(response => {
                console.log("Success:", response.data);
                setPlayersArray(response.data);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

    return (
        <div>
            {teamData ? (
                <div>
                    <h2>Team Name: {teamData.teamName}</h2>
                    <p>Team Format: {teamData.teamFormat}</p>
                    <button onClick={onClick}>Add Player</button>
                    <button onClick={startMatch}>Start New Match</button>
                {playersArray ? (
                    <div>
                        {playersArray.map((player) => (
                            <div key={player._id}>    
                                <h5>Player Name: {player.firstName} {player.lastName}</h5>
                                <p>Player Number: {player.jerseyNumber}</p>
                                <p>Gender Matching: {player.genderMatch}</p>
                                <br />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No Players Yet! Please Add Players.</p>
                    )}
            </div>
            ) : (
                <p>Team With Id: {id} Not Found.</p>
            )}
        </div>
    );
}

export default TeamDataPage