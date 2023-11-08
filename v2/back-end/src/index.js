import express from "express";
import bodyParser from "body-parser";
import playerRoutes from "./routes/players.js";
import teamRoutes from "./routes/teams.js";
import connectMongoDB from "./config/mongodbConfig.js";

const app = express();
const PORT = 8080;

connectMongoDB();

app.use(bodyParser.json());

app.use("/players", playerRoutes);
app.use("/teams", teamRoutes);

app.get("/", (req, res) => {
    console.log("Successful");
    res.send("Homepage");
});

app.listen(PORT, () => console.log(`Server is running at: http://localhost:${PORT}`));