import TestUser from "../models/testUserModel.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/secrets.js";

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

        const hashedPassword = await hashPassword(password);
        const addedUser = {email: email, password: hashedPassword, teamName: teamName, teamPlayers:[]};
        const result = await TestUser.create(addedUser);

        res.status(200).send("User Added Successfully");
    } catch (error){
        console.error(error);
        res.status(500).send("Error Registering User");
    }
};

export const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        console.log(email, password);
        const user = await TestUser.findOne({email});
        if(!user){
            return res.send("No User Found");
        }

        const match = await comparePassword(password, user.password);
        
        if(match){
            jwt.sign({email: user.email, id: user._id, teamName: user.teamName, teamPlayers: user.teamPlayers}, JWT_SECRET, {}, (err, token) => {
                if(err){
                    throw err;
                }
                res.cookie("token", token).json(user);
            });
        }
        else{
            res.send("Incorrect Password");
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Error Logging in User");
    }
};

export const getUser = (req, res) => {
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, JWT_SECRET, {}, (err, user) => {
            if(err){
                console.error(err.message);
                res.status(401).json({ error: 'Invalid or expired token' });
            }
            else{
                console.log(user);
                res.json(user);
            }
        })
    }
    else {
        res.status(401).json({ error: 'Token not provided' });
    }
};