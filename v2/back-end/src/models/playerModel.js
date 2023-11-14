import mongoose from "mongoose";
const { Schema } = mongoose;

const playerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    jerseyNumber: Number,
    genderMatch: String,
    team: {
        type: Schema.Types.ObjectId,
        ref: "Team"
    }
});
  
const Player = mongoose.model("Player", playerSchema, "players");

export default Player;