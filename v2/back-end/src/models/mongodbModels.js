import { Schema, mongoose } from "mongoose";

const teamSchema = new mongoose.Schema({
    teamName: String,
    teamFormat: String,
    players: {
        type: [Schema.Types.ObjectId],
        ref: "Player"
    }
});

const Team = mongoose.model("Team", teamSchema, "teams");

const playerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    jerseyNumber: Number,
    genderMatch: String,
    age: Number,
    team: {
        type: Schema.Types.ObjectId,
        ref: "Team"
    }
});
  
const Player = mongoose.model("Player", playerSchema, "players");

export {Player, Team};