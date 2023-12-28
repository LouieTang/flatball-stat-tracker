import mongoose from "mongoose";
const { Schema } = mongoose;

const testUserSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    email: String,
    password: String,
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
  
const TestUser = mongoose.model("Test User", testUserSchema, "test user");

export default TestUser;