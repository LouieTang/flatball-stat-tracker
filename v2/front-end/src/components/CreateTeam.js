import { useState } from "react";
import { useNavigate } from "react-router-dom";


const CreateTeam = ({onMake}) => {
    const navigate = useNavigate();
    const [teamName, setTeamName] = useState("");
    const [teamFormat, setTeamFormat] = useState("male");

    const onSubmit = (e) => {
        e.preventDefault();

        if(!teamName) {
            alert("Please Add Team");
            return;
        }

        onMake({teamName, teamFormat});

        setTeamName("");
        setTeamFormat("male");

        navigate("/teams");
    }

    return (
        <form className="create-team-form" onSubmit={ onSubmit }>
            <div className="form-control">
                <label htmlFor="team-name">Team Name</label>
                <input type="text" id="team-name" placeholder="Your Team Name" value={teamName} onChange={(e) => setTeamName(e.target.value)} required />
            </div>
            <div className="form-control">
                <label htmlFor="team-format">Team Format</label>
                <select id="team-format" className="team-format-dropdown" value={teamFormat} onChange={(e) => setTeamFormat(e.target.value)}  required>
                    <option value="male">Single Gendered (Male)</option>
                    <option value="female">Single Gendered (Female)</option>
                    <option value="mixed">Mixed</option>
                </select>
            </div>
            <input type="submit" value="Create Team" />
        </form>
    );
};

export default CreateTeam;