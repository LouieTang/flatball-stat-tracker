import React from 'react'
import CreateTeam from "../components/CreateTeam";
import axios from "axios";

const MainPage = () => {
    const makeTeam = (team) => {
        axios.post("http://localhost:5000/teams", team)
            .then(response => {
                console.log("Success:", response.data);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

    return (
        <>
            <CreateTeam onMake={makeTeam} />
        </>
    )
}

export default MainPage