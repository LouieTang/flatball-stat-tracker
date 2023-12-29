import axios from "axios";

export const populatePlayers = () => {
    return axios.get("/testplayers")
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
    return axios.put("/testplayers", {players})
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
    return axios.get("/testteam")
        .then(response => {
            console.log("Success:", response.data);
            return response.data;
        })
        .catch(error => {
            console.error("Error:", error);
            throw error;
        });
};

export const updateTeam = (updatedTeam) => {
    return axios.put("/testusers/team", {updatedTeam})
        .then(response => {
            console.log("Success:", response.data);
            return response.data;
        })
        .catch(error => {
            console.error("Error:", error);
            throw error;
        });
};