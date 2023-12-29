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
        // .then(data =>{
        //     if(data === "Email Already Exists"){
        //         return data;
        //     }
        //     else{
        //         return "Success";
        //     }
        // })
        .catch(error => {
            console.error("Error:", error);
            throw error;
        });
};