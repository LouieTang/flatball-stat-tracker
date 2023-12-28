import React, { useState, useEffect } from "react"
import PlayerDisplay from "./PlayerDisplay.js"

const EditPlayersDisplay = ({teamPlayers, updatePlayers, changeState}) => {

    const [players, setPlayers] = useState([]);
    const [newPlayer, setNewPlayer] = useState("");

    const savePlayers = () => {
        updatePlayers(players);
        changeState("home");
    };

    useEffect(() => {

        setPlayers(teamPlayers);

    }, []);

    const removePlayer = (player) => {
        setPlayers((prevPlayers) => {
            const updatedPlayers = prevPlayers.filter((selectedPlayer) => {
                return selectedPlayer.jerseyNumber !== player.jerseyNumber;
            });
            return updatedPlayers;
        });
    };

    const addPlayer = () => {

        const newCreatedPlayer = {
            jerseyNumber: newPlayer,
            catches: 0,
            drops: 0,
            throwaways: 0,
            goals: 0,
            assists: 0,
            blocks: 0,
            callahans: 0,
        };
        setPlayers((prevPlayers) => {
            const updatedPlayers = [ ...prevPlayers, newCreatedPlayer];
            return updatedPlayers;
        });
        setNewPlayer("");

    };

    return (
        <>
            <div>
                {players.map((player) => {
                    return (
                        <div key={player.jerseyNumber}>
                            <PlayerDisplay player={player} />
                            <button onClick={() => removePlayer(player)}>Remove Player</button>
                            <br />
                            <br />
                        </div>
                    );
                })}
                <br />
                <input type="text" value={newPlayer} placeholder="Unique Jersey Number" onChange={(e) => {
                    const input = e.target.value;
                    if (/^[0-9]*$/.test(input) && input.length < 3) {
                        setNewPlayer(input);
                    }
                    }
                }/>
                    
                <br />
                <button onClick={addPlayer}>Add Player</button>

                <br />
                <br />
                <button onClick={savePlayers}>Save Players</button>
            </div>
        </>
    )
}

export default EditPlayersDisplay