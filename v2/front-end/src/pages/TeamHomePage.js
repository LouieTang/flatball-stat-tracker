import React, { useState, useEffect } from "react";
import { fetchTeam, updateTeam } from "../services/databaseManager.js";
import GameController from "../components/GameController.js";
import TeamLandingDisplay from "../components/TeamLandingDisplay.js";
import EditPlayersDisplay from "../components/EditPlayersDisplay.js";
import UnavailableDisplay from "../components/UnavailableDisplay.js";

const TeamHomePage = () => {

    const [teamId, setTeamId] = useState("");
    const [teamName, setTeamName] = useState("");
    const [players, setPlayers] = useState([]);

    const [currentDisplay, setCurrentDisplay] = useState("");

    useEffect(() => {
        
        async function getTeam() {
            try{
                const team = await fetchTeam();
                console.log(team.teamName);
                console.log(team.teamPlayers);
                console.log(team._id);
                setTeamId(team._id);
                setTeamName(team.teamName);
                setPlayers(team.teamPlayers);

            } catch (error) {
                alert("Unable to fetch from database.");
                console.error("Error:", error);
            }
            setCurrentDisplay("home");
        };

        getTeam();


    }, []);

    const updatePlayers = (combinedPlayersStats) => {
        setPlayers(combinedPlayersStats);
        console.log(teamId);
        console.log(teamName);
        console.log(combinedPlayersStats);
        updateTeam({_id: teamId, teamName: teamName, teamPlayers: combinedPlayersStats});
    }

    return (
        <>
            {currentDisplay === "home" && <TeamLandingDisplay teamName={teamName} teamPlayers={players} changeState={setCurrentDisplay} />}
            {currentDisplay === "match" && <GameController teamPlayers={players} updatePlayers={updatePlayers} changeState={setCurrentDisplay} />}
            {currentDisplay === "edit" && <EditPlayersDisplay teamPlayers={players} updatePlayers={updatePlayers} />}
            {currentDisplay === "" && <UnavailableDisplay />}
        </>
    )

}

export default TeamHomePage;