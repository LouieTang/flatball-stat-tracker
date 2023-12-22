import mongoose from "mongoose";
const { Schema } = mongoose;

const testTeamSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    teamName: String,
    teamPlayers: [{
        _id: Schema.Types.ObjectId,
        jerseyNumber: String,
        catches: Number,
        drops: Number,
        throwaways: Number,
        goals: Number,
        assists: Number,
        blocks: Number,
        callahans: Number
    }]
});
  
const TestTeam = mongoose.model("Test Team", testTeamSchema, "test team");

export default TestTeam;