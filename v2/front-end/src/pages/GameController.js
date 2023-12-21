import React, { useState, useEffect } from "react";
import { populatePlayers, updatePlayers } from "../services/databaseManager.js";
import Player from "../components/Player.js"

/**
 * GameController component represents a new match created by a user. Responsible for game logic and tracking.
 *
 * @component
 * @returns {JSX.Element} The rendered GameController component.
 */
const GameController = () => {


    const [history, setHistory] = useState([]);
    const [players, setPlayers] = useState([]);
    const [gamePlayersStats, setGamePlayersStats] = useState([]);

    const [playerWithDisc, setPlayerWithDisc] = useState(-1);

    useEffect(() => {
        
        async function fetchPlayers() {
            try{
                const playersDB = await populatePlayers();
                setPlayers(playersDB);
                clearPlayerStats(playersDB);

            } catch (error) {
                alert("Unable to fetch from database.");
                console.error("Error:", error);
            }
        };

        fetchPlayers();

    }, []);

    const clearPlayerStats = (playersDB) => {

        const clearedPlayers = playersDB.map((player) => ({
          jerseyNumber: player.jerseyNumber,
          catches: 0,
          drops: 0,
          throwaways: 0,
          goals: 0,
          assists: 0,
          blocks: 0,
          callahans: 0,
        }));

        console.log("Before clearing player stats:", playersDB);
        console.log("After clearing player stats:", clearedPlayers);
      
        setGamePlayersStats(clearedPlayers);
    };

    const handleAction = (selectedPlayer, action) => {
    
        if(action === "pickup"){
            setPlayerWithDisc(selectedPlayer.jerseyNumber);
        }
        else if(action !== "throwaway" && action !== "goal"){
            setGamePlayersStats((prevPlayers) => {
                return prevPlayers.map((player) => {
                    if (player.jerseyNumber === selectedPlayer.jerseyNumber) {
                        return updatePlayer(player, action);
                    }
                    return player;
                });
            });
            setHistory([...history, {player: selectedPlayer.jerseyNumber, action: action}]);
        }
        else if (action === "throwaway" || action === "goal"){
            if(action === "throwaway"){
                setGamePlayersStats((prevPlayers) => {
                    return prevPlayers.map((player) => {
                        if (player.jerseyNumber === playerWithDisc) {
                            return updatePlayer(player, action);
                        }
                        return player;
                    });
                });
                setHistory([...history, {player: playerWithDisc, action: action}]);
            }
            else{
                setGamePlayersStats((prevPlayers) => {
                    return prevPlayers.map((player) => {
                        if (player.jerseyNumber === playerWithDisc) {
                            return updatePlayer(player, "assist");
                        }
                        else if(player.jerseyNumber === selectedPlayer.jerseyNumber){
                            return updatePlayer(player, action);
                        }
                        return player;
                    });
                });
                setHistory([...history, {player: selectedPlayer.jerseyNumber, action: action}]);
            }
        }
        
    }

    const updatePlayer = (player, action) => {
        console.log("Updating player:", player, "with action:", action);
        switch (action) {
            case "catch":
                setPlayerWithDisc(player.jerseyNumber);
                return { ...player, catches: player.catches + 1 };
            case "drop":
                setPlayerWithDisc(-1);
                setIsOffense(false);
                setIsDiscInPlay(false);
                return { ...player, drops: player.drops + 1};
            case "throwaway":
                setPlayerWithDisc(-1);
                setIsOffense(false);
                setIsDiscInPlay(false);
                return { ...player, throwaways: player.throwaways + 1};
            case "goal":
                setIsDiscInPlay(false);
                ourGoal();
                return { ...player, catches: player.catches + 1, goals: player.goals + 1};
            case "assist":
                return { ...player, assists: player.assists + 1};
            case "block":
                setPlayerWithDisc(-1);
                setIsOffense(true);
                return { ...player, blocks: player.blocks + 1};
            case "callahan":
                setIsDiscInPlay(false);
                ourGoal();
                return { ...player, goals: player.goals + 1, callahans: player.callahans + 1};
            default:
                return player;
        }
    };

    const [menu, setMenu] = useState(true);

    const [activePlayers, setActivePlayers] = useState([]);

    const [isOffense, setIsOffense] = useState(true);

    const [isDiscInPlay, setIsDiscInPlay] = useState(false);

    const[ourScore, setOurScore] = useState(0);
    const[theirScore, setTheirScore] = useState(0);

    const[setup, setSetup] = useState(true);
    const [theirTeamName, setTheirTeamName] = useState("");
    const [gameScoreCap, setGameScoreCap] = useState("");

    const setDefense = () => {
        setPlayerWithDisc(-1);
        setIsDiscInPlay(false);
        setIsOffense(false);
        resetLineUp();
        setMenu(true);
    }

    const setOffense = () => {
        setPlayerWithDisc(-1);
        setIsDiscInPlay(false);
        setIsOffense(true);
        resetLineUp();
        setMenu(true);
    }

    const theirGoal = () => {
        setTheirScore((prevScore) => prevScore + 1);
        setOffense();
    }

    const ourGoal = () => {
        setOurScore((prevScore) => prevScore + 1);
        setDefense();
    }

    const resetLineUp = () => {
        setMenu(true);
        setActivePlayers([]);
    };

    const endGame = () => {
        resetLineUp();
        const playerStats = gamePlayersStats.map((player) => ({
            jerseyNumber: player.jerseyNumber,
            catches: player.catches,
            drops: player.drops,
            throwaways: player.throwaways,
            goals: player.goals,
            assists: player.assists,
            blocks: player.blocks,
            callahans: player.callahans,
        }));
    
        alert(JSON.stringify(playerStats, null, 2));
        alert(ourScore + " - " + theirScore);
        combinePlayersStats(players, gamePlayersStats);
        setTheirTeamName("");
        setGameScoreCap("");
        setMenu(true);
        setSetup(true);
    };

    const combinePlayersStats = (playerListDB, playerList) => {
        
        const combinedPlayersStats = playerListDB.map((player) => {
            const stats = playerList.find((stats) => stats.jerseyNumber === player.jerseyNumber);
            if (stats) {
                return {
                    ...player,
                    ...stats,
                    catches: player.catches + stats.catches,
                    drops: player.drops + stats.drops,
                    throwaways: player.throwaways + stats.throwaways,
                    goals: player.goals + stats.goals,
                    assists: player.assists + stats.assists,
                    blocks: player.blocks + stats.blocks,
                    callahans: player.callahans + stats.callahans,
                };
            } else {
                return player;
            }
        }); 

        updatePlayers(combinedPlayersStats);

    };

    const selectPlayer = (player) => {
        setActivePlayers((prevPlayers) => {
            if (!prevPlayers.some((p) => p.jerseyNumber === player.jerseyNumber) && prevPlayers.length < 7) {
                return [...prevPlayers, player.jerseyNumber];
            } else {
                return prevPlayers;
            }
        });
    };

    const unselectPlayer = (player) => {
        setActivePlayers((prevPlayers) => {
            const playerIndex = prevPlayers.findIndex((p) => p === player.jerseyNumber);
            if (playerIndex !== -1) {
                const updatedPlayers = [...prevPlayers];
                updatedPlayers.splice(playerIndex, 1);
                return updatedPlayers;
            }
            return prevPlayers;
        });
    };

    const startPoint = () => {
        if(activePlayers.length === 7){
            setMenu(false);
        }
    };

    const startGame = () => {
        if(theirTeamName !== "" && gameScoreCap > 0){
            setSetup(false);
            setMenu(true);
        }
        else {
            alert("Please Enter the Input Fields.");
        }
    };

    return (
        <>
            {setup && (
                <>
                    <h3>New Match</h3>
                    <p>Opponent Team Name:</p>
                    <input className="input__text" type="text" id="theirName" placeholder="Team Name" value={theirTeamName} onChange={(e) => setTheirTeamName(e.target.value)} required />
                    <p>We Start On:</p>

                    <input className="input__toggle" type="radio" id="offenseStart" name="startOD" value="offenseStart" checked={isOffense === true} onChange={() => setIsOffense(true)} />
                    <label className="input__toggle" htmlFor="offenseStart">Offense</label>

                    <input type="radio" id="defenseStart" name="startOD" value="defenseStart" checked={isOffense === false} onChange={() => setIsOffense(false)} />
                    <label className="input__toggle" htmlFor="defenseStart">Defense</label>

                    <br />

                    <p>Game To:</p>
                    <input className="input__text" type="number" id="gameTo" placeholder="Score Cap" min="1" value={gameScoreCap} onChange={(e) => setGameScoreCap(e.target.value)} required/>
                    <br />

                    <button className="btn__menu" onClick={startGame}>Start Game</button>
                </>
            )}

            {!menu && !setup && (
                <>
                    {players.map((player) => (
                        activePlayers.some((selectedPlayer) => selectedPlayer === player.jerseyNumber) && (
                        <Player key={player.jerseyNumber} player={player} onAction={handleAction} hasDisc={player.jerseyNumber === playerWithDisc} inPlay={isDiscInPlay} setInPlay={setIsDiscInPlay} isOffense={isOffense}/>
                        )
                    ))}
                    <button className="btn__controls" type="button" onClick={theirGoal}>Their Goal</button>
                </>
            )}
            {menu && !setup && (
                <>
                    {players.map((player) => (
                        activePlayers.some((selectedPlayer) => selectedPlayer === player.jerseyNumber) ? (
                            <button className="btn__selected" key={player.jerseyNumber} type="button" onClick={() => unselectPlayer(player)}>{player.jerseyNumber}</button>
                        ) : (
                            <button className="btn__controls" key={player.jerseyNumber} type="button" onClick={() => selectPlayer(player)}>{player.jerseyNumber}</button>
                        )
                    ))}
                    <br />
                    <button className="btn__controls" type="button" onClick={startPoint}>Confirm</button>
                </>
            )}
            {!setup && (
                <button className="btn__controls" type="button" onClick={endGame}>End Game</button>
            )}
        </>
    );

};

export default GameController;
