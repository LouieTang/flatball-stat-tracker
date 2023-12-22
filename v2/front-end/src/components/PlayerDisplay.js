import React from "react";

const PlayerDisplay = ({player}) => {
    return (
        <div>
            <h3>{player.jerseyNumber}</h3>
            <p>catches: {player.catches}</p>
            <p>drops: {player.drops}</p>
            <p>throwaways: {player.throwaways}</p>
            <p>goals: {player.goals}</p>
            <p>assists: {player.assists}</p>
            <p>blocks: {player.blocks}</p>
            <p>callahans: {player.callahans}</p>
        </div>
    );
}

export default PlayerDisplay;