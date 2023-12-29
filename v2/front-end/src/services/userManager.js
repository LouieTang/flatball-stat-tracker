import axios from "axios";

export const testRegistration = ({email, password, teamName}) => {
    if(!email){
        return "Invalid Email";
    }
    if(!password || password.length < 6){
        return "Invalid Password";
    }
    if(!teamName){
        return "Invalid Team Name";
    }

    return axios.post("/testusers/register", {email, password, teamName})
        .then(response => {
            console.log("Success:", response.data);
            return response.data;
        })
        .catch(error => {
            console.error("Error:", error);
            throw error;
        });
};

export const testLogin = ({email, password}) => {
    if(!email){
        return "Invalid Email";
    }
    if(!password || password.length < 6){
        return "Incorrect Password";
    }
    return axios.post("/testusers/login", {email, password})
        .then(response => {
            console.log("Success:", response.data);
            return response.data;
        })
        .catch(error => {
            console.error("Error:", error);
            throw error;
        });
};

export const getUser = () => {
    return axios.get("/testusers/user")
    .then(response => {
        console.log("Success:", response.data);
        return response.data;
    })
    .catch(error => {
        console.error("Error:", error);
        throw error;
    });
};