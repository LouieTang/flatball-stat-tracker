import express from "express";
import bodyParser from "body-parser";
import playerRoutes from "./routes/players.js";
import teamRoutes from "./routes/teams.js";
import matchRoutes from "./routes/matches.js";
import connectMongoDB from "./config/mongodbConfig.js";

const app = express();
const PORT = 5000;

connectMongoDB();

app.use(bodyParser.json());

app.use("/players", playerRoutes);
app.use("/teams", teamRoutes);
app.use("/matches", matchRoutes);

app.get("/", (req, res) => {
    console.log("Successful");
    res.send("Homepage");
});

app.listen(PORT, () => console.log(`Server is running at: http://localhost:${PORT}`));