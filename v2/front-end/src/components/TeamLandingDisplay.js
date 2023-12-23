import React from "react";
import PlayerDisplay from "./PlayerDisplay.js";

const TeamLandingDisplay = ({teamName, teamPlayers, changeState}) => {

    return (
        <>
            <button type="button" className="btn__right" onClick={(e) => changeState("match")}>New Match</button>
            <button type="button" className="btn__right" onClick={(e) => changeState("edit")}>Edit Players</button>
            <h1>{teamName}</h1>
            <h3>Player Stats</h3>
            <div className="div__display">
                {teamPlayers.map((player) => {
                    return <PlayerDisplay key={player.jerseyNumber} player={player} edit={false} />
                })}
            </div>
        </>
    )

}

export default TeamLandingDisplay