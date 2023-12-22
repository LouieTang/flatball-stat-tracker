import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchTeam } from "../services/databaseManager.js";
import PlayerDisplay from "../components/PlayerDisplay.js";

const Team = () => {

    const [teamName, setTeamName] = useState("");
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        
        async function getTeam() {
            try{
                const team = await fetchTeam();
                console.log(team.teamName);
                console.log(team.teamPlayers);
                setTeamName(team.teamName);
                setPlayers(team.teamPlayers);

            } catch (error) {
                alert("Unable to fetch from database.");
                console.error("Error:", error);
            }
        };

        getTeam();

    }, []);

    return (
        <>
            <button type="button" className="btn__right"><Link to="/testmatch">New Match</Link></button>
            <h1>{teamName}</h1>
            <h3>Player Stats</h3>
            <div className="div__display">
                {players.map((player) => {
                    return <PlayerDisplay key={player.jerseyNumber} player={player} />
                })}
            </div>
        </>
    )

}

export default Team