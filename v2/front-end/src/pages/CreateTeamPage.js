import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CreateTeamPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {user} = location.state || {};

    useEffect(() => {
        if(user === undefined){
            navigate("/login");
        }
    }, [user, navigate]);

    const makeTeam = (team) => {

        const assignTeam = {...team, user};

        console.log("Backend: ", assignTeam);

        axios.post("http://localhost:5000/teams", assignTeam)
            .then(response => {
                console.log("Success:", response.data);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

    const [teamName, setTeamName] = useState("");
    const [teamFormat, setTeamFormat] = useState("Mixed");

    const onSubmit = (e) => {
        e.preventDefault();

        if(!teamName) {
            alert("Please Add Team");
            return;
        }

        makeTeam({teamName, teamFormat});

        setTeamName("");
        setTeamFormat("Mixed");

        navigate("/team", {state: {user}});
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
                    <option value="Mixed">Mixed</option>
                    <option value="Female">Single Gender (Female)</option>
                    <option value="Male">Single Gender (Male)</option>
                </select>
            </div>
            <input type="submit" value="Create Team" />
        </form>
    );
}

export default CreateTeamPage;