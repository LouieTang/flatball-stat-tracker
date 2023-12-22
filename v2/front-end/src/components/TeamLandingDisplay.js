import React from "react";
import PlayerDisplay from "./PlayerDisplay.js";

const TeamLandingDisplay = ({teamName, players, changeState}) => {

    return (
        <>
            <button type="button" className="btn__right" onClick={(e) => changeState("match")}>New Match</button>
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

export default TeamLandingDisplay