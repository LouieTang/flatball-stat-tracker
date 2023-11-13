import mongoose from "mongoose";
const { Schema } = mongoose;

const teamSchema = new mongoose.Schema({
    teamName: String,
    teamFormat: String,
    user: String,
    players: {
        type: [Schema.Types.ObjectId],
        ref: "Players"
    },
    matches: {
        type: [Schema.Types.ObjectId],
        ref: "Matches"
    }
});

const Team = mongoose.model("Team", teamSchema, "teams");

export default Team;