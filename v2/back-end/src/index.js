import express from "express";
import bodyParser from "body-parser";
import connectMongoDB from "./config/mongodbConfig.js";
import testPlayerRoutes from "./routes/testPlayers.js";
import testTeamRoutes from "./routes/testTeam.js";
import testUserRoutes from "./routes/testUsers.js";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();
const PORT = 5000;

connectMongoDB();

// app.use(cors());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));


// For mock testing purposes & building
app.use("/testplayers", testPlayerRoutes);
app.use("/testteam", testTeamRoutes);
app.use("/testusers", testUserRoutes);


app.get("/", (req, res) => {
    console.log("Successful");
    res.send("Homepage");
});

app.listen(PORT, () => console.log(`Server is running at: http://localhost:${PORT}`));