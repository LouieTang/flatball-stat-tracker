import React from "react"
import PlayerDisplay from "./PlayerDisplay.js"

const EditPlayersDisplay = ({teamPlayers}) => {
    return (
        <>
            <div>
                {teamPlayers.map((player) => {
                    return <PlayerDisplay key={player.jerseyNumber} player={player} edit={true} />
                })}
                
            </div>
        </>
    )
}

export default EditPlayersDisplay