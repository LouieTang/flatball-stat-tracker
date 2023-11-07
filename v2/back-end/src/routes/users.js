import express from "express";

const router = express.Router();

const users = [];

router.get("/", (req, res) => {
    console.log(users); 

    res.send(users);
});

router.post("/", (req, res) => {
    const user = req.body;
    users.push(user);
    res.send(`User with name ${user.firstName} added to the database.`);
});

export default router;