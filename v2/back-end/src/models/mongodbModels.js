import mongoose from "mongoose";


const playerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    number: Number,
    genderMatch: String,
    age: Number
});
  
const Player = mongoose.model("Player", playerSchema, "players");

export default Player;