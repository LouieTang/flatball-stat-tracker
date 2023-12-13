import React, { useState } from "react";

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
            <button type="button" onClick={pickUpDisc}>{player.number}</button>
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
    const [players, setPlayers] = useState([
        { number: 12, catches: 0, drops: 0, throwaways: 0, goals: 0, blocks: 0, callahans: 0 },
        { number: 13, catches: 0, drops: 0, throwaways: 0, goals: 0, blocks: 0, callahans: 0 },
        { number: 14, catches: 0, drops: 0, throwaways: 0, goals: 0, blocks: 0, callahans: 0 },
        { number: 15, catches: 0, drops: 0, throwaways: 0, goals: 0, blocks: 0, callahans: 0 },
        { number: 16, catches: 0, drops: 0, throwaways: 0, goals: 0, blocks: 0, callahans: 0 },
        { number: 17, catches: 0, drops: 0, throwaways: 0, goals: 0, blocks: 0, callahans: 0 },
        { number: 18, catches: 0, drops: 0, throwaways: 0, goals: 0, blocks: 0, callahans: 0 },
    ]);

    const [playerWithDisc, setPlayerWithDisc] = useState(-1);

    const [isOffense, setIsOffense] = useState(true);

    const [isDiscInPlay, setIsDiscInPlay] = useState(false);

    const[ourScore, setOurScore] = useState(0);
    const[theirScore, setTheirScore] = useState(0);

    const handleAction = (selectedPlayer, action) => {
        setPlayers((prevPlayers) => {
            const newPlayers = prevPlayers.map((player) =>
                player.number === selectedPlayer.number ? updatePlayer(player, action) : player
            );
            return newPlayers;
        });
        
        switch (action){
            case "pickup":
                setPlayerWithDisc(selectedPlayer.number);
                break;
            case "catch":
                setPlayerWithDisc(selectedPlayer.number);
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
                setOurScore((prevScore) => prevScore + 1);
                setPlayerWithDisc(-1);
                setIsOffense(false);
                setIsDiscInPlay(false);
                break;
            case "block":
                setPlayerWithDisc(-1);
                setIsOffense(true);
                break;
            case "callahan":
                setOurScore((prevScore) => prevScore + 1);
                setPlayerWithDisc(-1);
                setIsOffense(false);
                setIsDiscInPlay(false);
                break;
            default:
                break;
        }
    };

    const updatePlayer = (player, action) => {
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
        setIsOffense(true);
    }

    const endGame = () => {
        const playerStats = players.map((player) => ({
            number: player.number,
            catches: player.catches,
            drops: player.drops,
            throwaways: player.throwaways,
            goals: player.goals,
            blocks: player.blocks,
            callahans: player.callahans,
        }));
    
        // alert(JSON.stringify(playerStats, null, 2));
        alert(ourScore + " - " + theirScore);
    };    

    return (
        <>
            {players.map((player) => (
                <Player key={player.number} player={player} onAction={handleAction} hasDisc={player.number === playerWithDisc} inPlay={isDiscInPlay} setInPlay={setIsDiscInPlay} isOffense={isOffense}/>
            ))}
            <button type="button" onClick={theirGoal}>Their Goal</button>
            <button type="button" onClick={endGame}>End Game</button>
        </>
    );
};

export default NewMatch;
