import axios from "axios";

export const populatePlayers = () => {
    return axios.get("http://localhost:5000/testplayers")
        .then(response => {
            console.log("Success:", response.data);
            return response.data;
        })
        .catch(error => {
            console.error("Error:", error);
            throw error;
        });
};

export const updatePlayers = (players) => {
    return axios.put("http://localhost:5000/testplayers", {players})
        .then(response => {
            console.log("Success:", response.data);
            return response.data;
        })
        .catch(error => {
            console.error("Error:", error);
            throw error;
        });
};

export const fetchTeam = () => {
    return axios.get("http://localhost:5000/testteam")
        .then(response => {
            console.log("Success:", response.data);
            return response.data;
        })
        .catch(error => {
            console.error("Error:", error);
            throw error;
        });
};