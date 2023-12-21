import express from "express";
import bodyParser from "body-parser";
import playerRoutes from "./routes/players.js";
import teamRoutes from "./routes/teams.js";
import matchRoutes from "./routes/matches.js";
import connectMongoDB from "./config/mongodbConfig.js";
import userRoutes from "./routes/users.js";
import testPlayerRoutes from "./routes/testPlayers.js";
import testTeamRoutes from "./routes/testTeam.js";
import cors from "cors";


const app = express();
const PORT = 5000;

connectMongoDB();

app.use(cors());
app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/players", playerRoutes);
app.use("/teams", teamRoutes);
app.use("/matches", matchRoutes);


// For mock testing purposes & building
app.use("/testplayers", testPlayerRoutes);
app.use("/testteam", testTeamRoutes);


app.get("/", (req, res) => {
    console.log("Successful");
    res.send("Homepage");
});

app.listen(PORT, () => console.log(`Server is running at: http://localhost:${PORT}`));