import mongoose from "mongoose";
const { Schema } = mongoose;

const testPlayerSchema = new mongoose.Schema({
    jerseyNumber: String,
    catches: Number,
    drops: Number,
    throwaways: Number,
    goals: Number,
    blocks: Number,
    callahans: Number
});
  
const TestPlayer = mongoose.model("Test Player", testPlayerSchema, "test players");

export default TestPlayer;