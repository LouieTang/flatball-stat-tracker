import { useState } from "react"

const SetTeams = () => {
    const [ourTeam, setOurTeam] = useState("");
    const [theirTeam, setTheirTeam] = useState("");
    const [gameType, setGameType] = useState("");
    
    const onSubmit = (e) => {
        e.preventDefault();
        if(!ourTeam){
            alert("Please add our Team Name");
            return;
        }
        if(!theirTeam){
            alert("Please add their Team Name");
            return;
        }
        if(!gameType){
            alert("Please select the game type");
            return;
        }

        setOurTeam("");
        setTheirTeam("");
        setGameType("");
    }


  return (
    <form className="add-teams" onSubmit={onSubmit}>
        <div className="set-up">
            <label>Our Team</label>
            <input type="text" placeholder="Our Team Name" />
        </div>
        <div className="set-up">
            <label>Their Team</label>
            <input type="text" placeholder="Their Team Name" />
        </div>
        <div className="set-up">
            <label>Match Type</label>
            <input type="radio" />
        </div>
        <input type="submit" value="Save Set Up" />
    </form>
  )
}

export default SetTeams