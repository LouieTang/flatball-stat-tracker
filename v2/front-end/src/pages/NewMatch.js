import React, { useState, useEffect } from "react";
import axios from "axios";


/**
 * Player component represents a player in the game.
 *
 * @component
 * @param {Object} props - The properties of the Player component.
 * @param {Object} props.player - Information about the player.
 * @param {Function} props.onAction - Callback function triggered on player actions.
 * @param {boolean} props.hasDisc - Indicates if the player has the disc.
 * @param {boolean} props.isOffense - Indicates if the team is on the offense.
 * @param {boolean} props.inPlay - Indicates if the disc is in play for the team.
 * @param {Function} props.setInPlay - Function to set the in-play state.
 * @returns {JSX.Element} The rendered Player component.
 */
const Player = ({ player, onAction, hasDisc, isOffense, inPlay, setInPlay }) => {
    const pickUpDisc = () => {
        if(!inPlay && isOffense){
            onAction(player, "pickup")
            setInPlay(true);
        }
    }

    return (
        <>
            <button type="button" onClick={pickUpDisc}>{player.jerseyNumber}</button>
            {!hasDisc && isOffense && inPlay &&(
                <>
                    <button type="button" onClick={() => onAction(player, "catch")}>Catch</button>
                    <button type="button" onClick={() => onAction(player, "drop")}>Drop</button>
                    <button type="button" onClick={() => onAction(player, "throwaway")}>Throwaway</button>
                    <button type="button" onClick={() => onAction(player, "goal")}>Goal</button>
                </>
            )}
            {!hasDisc && !isOffense &&(
                <>
                    <button type="button" onClick={() => onAction(player, "block")}>Block</button>
                    <button type="button" onClick={() => onAction(player, "callahan")}>Goal</button>
                </>
            )}
            <br />
        </>
    );
};

/**
 * NewMatch component represents a new match created by a user. Responsible for game logic and tracking.
 *
 * @component
 * @returns {JSX.Element} The rendered NewMatch component.
 */
const NewMatch = () => {

    const [players, setPlayers] = useState([])
    
    const populatePlayers = () => {
        return axios.get("http://localhost:5000/testPlayers")
            .then(response => {
                console.log("Success:", response.data);
                return response.data;
            })
            .catch(error => {
                console.error("Error:", error);
                throw error;
            });
    }

    useEffect(() => {
        
        async function fetchPlayers() {
            try{
                const playersDB = await populatePlayers();
                setPlayers(playersDB);

            } catch (error) {
                alert("Unable to fetch from database.");
                console.error("Error:", error);
            }
        };

        fetchPlayers();
    }, []);




    const [menu, setMenu] = useState(true);

    const [activePlayers, setActivePlayers] = useState([]);

    const [playerWithDisc, setPlayerWithDisc] = useState(-1);

    const [isOffense, setIsOffense] = useState(true);

    const [isDiscInPlay, setIsDiscInPlay] = useState(false);

    const[ourScore, setOurScore] = useState(0);
    const[theirScore, setTheirScore] = useState(0);

    const handleAction = (selectedPlayer, action) => {
        setPlayers((prevPlayers) => {
            const newPlayers = prevPlayers.map((player) =>
                player.jerseyNumber === selectedPlayer.jerseyNumber ? updatePlayer(player, action) : player
            );
            console.log(newPlayers);
            return newPlayers;
        });
        
        switch (action){
            case "pickup":
                setPlayerWithDisc(selectedPlayer.jerseyNumber);
                break;
            case "catch":
                setPlayerWithDisc(selectedPlayer.jerseyNumber);
                break;
            case "drop":
                setPlayerWithDisc(-1);
                setIsOffense(false);
                setIsDiscInPlay(false);
                break;
            case "throwaway":
                setPlayerWithDisc(-1);
                setIsOffense(false);
                setIsDiscInPlay(false);
                break;
            case "goal":
                setIsDiscInPlay(false);
                ourGoal();
                break;
            case "block":
                setPlayerWithDisc(-1);
                setIsOffense(true);
                break;
            case "callahan":
                setIsDiscInPlay(false);
                ourGoal();
                break;
            default:
                break;
        }
    };

    const updatePlayer = (player, action) => {
        console.log("Updating player:", player, "with action:", action);
        switch (action) {
            case "catch":
                return { ...player, catches: player.catches + 1 };
            case "drop":
                return { ...player, drops: player.drops + 1};
            case "throwaway":
                return { ...player, throwaways: player.throwaways + 1};
            case "goal":
                return { ...player, goals: player.goals + 1};
            case "block":
                return { ...player, blocks: player.blocks + 1};
            case "callahan":
                return { ...player, callahans: player.callahans + 1};
            default:
                return player;
        }
    };

    const theirGoal = () => {
        setTheirScore((prevScore) => prevScore + 1);
        setPlayerWithDisc(-1);
        setIsDiscInPlay(false);
        setIsOffense(true);
        resetLineUp();
        setMenu(true);
    }

    const ourGoal = () => {
        setOurScore((prevScore) => prevScore + 1);
        setPlayerWithDisc(-1);
        setIsOffense(false);
        resetLineUp();
        setMenu(true);
    }

    const resetLineUp = () => {
        setMenu(true);
        setActivePlayers([]);
    };

    const endGame = () => {
        resetLineUp();
        const playerStats = players.map((player) => ({
            jerseyNumber: player.jerseyNumber,
            catches: player.catches,
            drops: player.drops,
            throwaways: player.throwaways,
            goals: player.goals,
            blocks: player.blocks,
            callahans: player.callahans,
        }));
    
        alert(JSON.stringify(playerStats, null, 2));
        alert(ourScore + " - " + theirScore);
    };    

    const selectPlayer = (player) => {
        setActivePlayers((prevPlayers) => {
            if (!prevPlayers.some((p) => p.jerseyNumber === player.jerseyNumber) && prevPlayers.length < 7) {
                return [...prevPlayers, player.jerseyNumber];
            } else {
                return prevPlayers;
            }
        });
    }
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
    }

    const startPoint = () => {
        if(activePlayers.length === 7){
            setMenu(false);
        }
    }
    return (
        <>
            {!menu && (
                <>
                    {players.map((player) => (
                        activePlayers.some((selectedPlayer) => selectedPlayer === player.jerseyNumber) && (
                        <Player key={player.jerseyNumber} player={player} onAction={handleAction} hasDisc={player.jerseyNumber === playerWithDisc} inPlay={isDiscInPlay} setInPlay={setIsDiscInPlay} isOffense={isOffense}/>
                        )
                    ))}
                    <button type="button" onClick={theirGoal}>Their Goal</button>
                </>
            )}
            {menu && (
                <>
                    {players.map((player) => (
                        activePlayers.some((selectedPlayer) => selectedPlayer === player.jerseyNumber) ? (
                            <button key={player.jerseyNumber} type="button" onClick={() => unselectPlayer(player)} style={{ background: 'lightgreen' }}>{player.jerseyNumber}</button>
                        ) : (
                            <button key={player.jerseyNumber} type="button" onClick={() => selectPlayer(player)}>{player.jerseyNumber}</button>
                        )
                    ))}
                    <br />
                    <button type="button" onClick={startPoint}>Confirm</button>
                </>
            )}
            <button type="button" onClick={endGame}>End Game</button>

        </>
    );
};

export default NewMatch;
