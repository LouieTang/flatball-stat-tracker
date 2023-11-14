import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const AddPlayersPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {team, user} = location.state || {};

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [jerseyNumber, setJerseyNumber] = useState("");
    const [genderMatch, setGenderMatch] = useState("Female");
    

    useEffect(() => {
        if(team === undefined){
            navigate("/login");
        }
    }, [team, navigate]);

    const makePlayer = (player) => {

        const assignPlayer = {...player, team};

        console.log("Backend: ", assignPlayer);

        axios.post("http://localhost:5000/players", assignPlayer)
            .then(response => {
                console.log("Success:", response.data);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if(!firstName) {
            alert("Please Enter a Name");
            return;
        }
        if(!lastName) {
            alert("Please Enter a Name");
            return;
        }
        
        makePlayer({firstName, lastName, jerseyNumber, genderMatch});


        setFirstName("");
        setLastName("");
        setJerseyNumber("");
        setGenderMatch("Female");

        navigate(`/teams/${team}`, {state: {user}});
    }

    return (
        <form className="create-player-form" onSubmit={ onSubmit }>
            <div className="form-control">
                <label htmlFor="player-first-name">First Name</label>
                <input type="text" id="player-first-name" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div className="form-control">
                <label htmlFor="player-last-name">Last Name</label>
                <input type="text" id="player-last-name" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>
            <div className="form-control">
                <label htmlFor="jersey-number">Jersey Number</label>
                <input type="text" id="jersey-number" placeholder="00" value={jerseyNumber} onChange={(e) => setJerseyNumber(e.target.value)} required />
            </div>
            <div className="form-control">
                <label htmlFor="gender-match">Gender Match</label>
                <select id="gender-match" className="player-dropdown" value={genderMatch} onChange={(e) => setGenderMatch(e.target.value)}  required>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                </select>
            </div>
            <input type="submit" value="Create Player" />
        </form>
    );
}

export default AddPlayersPage