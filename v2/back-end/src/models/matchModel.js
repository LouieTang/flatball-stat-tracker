import mongoose from "mongoose";
const { Schema } = mongoose;

const matchSchema = new mongoose.Schema({
    homeTeam: String,
    awayTeam: String,
    homeScore: Number,
    awayScore: String,
    datePlayed: Date,
    team: {
        type: Schema.Types.ObjectId,
        ref: "Team"
    }
});

const Match = mongoose.model("Match", matchSchema, "matches");

export default Match;