import axios from "axios";

export const populatePlayers = () => {
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

export const updatePlayers = (players) => {
    return axios.put("http://localhost:5000/testPlayers", {players})
        .then(response => {
            console.log("Success:", response.data);
            return response.data;
        })
        .catch(error => {
            console.error("Error:", error);
            throw error;
        });
}