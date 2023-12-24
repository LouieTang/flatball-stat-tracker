import React from "react"
import PlayerDisplay from "./PlayerDisplay.js"

const EditPlayersDisplay = ({teamPlayers}) => {
    return (
        <>
            <div>
                {teamPlayers.map((player) => {
                    return <PlayerDisplay key={player.jerseyNumber} player={player} edit={true} />
                })}
                <br />
                <button>Save Players</button>

            </div>
        </>
    )
}

export default EditPlayersDisplay