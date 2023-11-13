import React, {useEffect} from 'react'
import CreateTeam from "../components/CreateTeam";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const MainPage = () => {
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

    return (
        <>
            <CreateTeam onMake={makeTeam} />
        </>
    )
}

export default MainPage