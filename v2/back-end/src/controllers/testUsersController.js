import TestUser from "../models/testUserModel.js";

export const registerUser = async (req, res) => {
    try {
        const { email, password, teamName } = req.body;
        console.log(email, password, teamName);
        if(!email){
            return res.send("Invalid Email");
        }
        if(!password || password.length < 6){
            return res.send("Invalid Password");
        }
        if(!teamName){
            return res.send("Invalid Team Name");
        }

        const user = await TestUser.findOne({email});
        if(user){
            return res.send("Email Already Exists");
        }

        const addedUser = {email: email, password: password, teamName: teamName, teamPlayers:[]};
        const result = await TestUser.create(addedUser);

        res.status(200).send("User Added Successfully");
    } catch (error){
        console.error(error);
        res.status(500).send("Error Registering User");
    }
};