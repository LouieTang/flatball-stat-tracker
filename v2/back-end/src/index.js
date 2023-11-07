import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/users.js";
import connectMongoDB from "./config/mongodbConfig.js";

const app = express();
const PORT = 8080;

connectMongoDB();

app.use(bodyParser.json());

app.use("/users", userRoutes);

app.get("/", (req, res) => {
    console.log("Successful");
    res.send("Homepage");
});

app.listen(PORT, () => console.log(`Server is running at: http://localhost:${PORT}`));