import React, { useState, useEffect } from "react";
import { updateTeam } from "../services/databaseManager.js";
import GameController from "../components/GameController.js";
import TeamLandingDisplay from "../components/TeamLandingDisplay.js";
import EditPlayersDisplay from "../components/EditPlayersDisplay.js";
import UnavailableDisplay from "../components/UnavailableDisplay.js";
import { getUser } from "../services/userManager.js";
import Logout from "../components/Logout.js";
import { useNavigate } from "react-router-dom";

const TeamHomePage = () => {

    const navigate = useNavigate();

    const [teamId, setTeamId] = useState("");
    const [teamName, setTeamName] = useState("");
    const [players, setPlayers] = useState([]);

    const [currentDisplay, setCurrentDisplay] = useState("");

    useEffect(() => {
        
        async function getTeam() {
            try{
                const team = await getUser();
                console.log(team.teamName);
                console.log(team.teamPlayers);
                console.log(team.id);
                setTeamId(team.id);
                setTeamName(team.teamName);
                setPlayers(team.teamPlayers);
                setCurrentDisplay("home");
            } catch (error) {
                alert("Unable to fetch from database.");
                console.error("Error:", error);
            }
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

    const logout = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 2000 00:00:00 UTC; path=/;";
        setTeamId("");
        setTeamName("");
        setPlayers([]);
        setCurrentDisplay("");
        navigate("/");
    }

    return (
        <>
            <Logout logout={logout}/>
            {currentDisplay === "home" && <TeamLandingDisplay teamName={teamName} teamPlayers={players} changeState={setCurrentDisplay} />}
            {currentDisplay === "match" && <GameController teamPlayers={players} updatePlayers={updatePlayers} changeState={setCurrentDisplay} />}
            {currentDisplay === "edit" && <EditPlayersDisplay teamPlayers={players} updatePlayers={updatePlayers} changeState={setCurrentDisplay} />}
            {currentDisplay === "" && <UnavailableDisplay />}
        </>
    )

}

export default TeamHomePage;