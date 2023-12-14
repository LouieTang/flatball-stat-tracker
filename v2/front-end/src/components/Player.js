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


export default Player;