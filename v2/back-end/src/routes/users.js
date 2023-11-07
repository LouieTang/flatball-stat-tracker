import express from "express";
import { v4 as uuidv4 } from "uuid";
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

const router = express.Router();

let users = [];

router.get("/", (req, res) => {
    console.log(users); 

    res.send(users);
});

router.post("/", (req, res) => {
    const user = req.body;

    users.push({...user, id: uuidv4()});
    res.send(`User with name ${user.name} added to the database.`);
});

router.get("/:id", (req, res) => {
    const {id} = req.params;

    const foundUser = users.find((user) => user.id === id);

    res.send(foundUser);
});

router.delete("/:id", (req, res) => {
    const {id} = req.params;

    users = users.filter((user) => user.id !== id);

    res.send(`User with id ${id} has been deleted.`);
});

router.patch("/:id", (req, res) => {
    const {id} = req.params;
    const {firstName, lastName, age} = req.body;

    const user = user.find((user) => user.id === id);

    user.firstName = (firstName) ? firstName : user.firstName;
    user.lastName = (lastName) ? lastName : user.lastName;
    user.age = (age) ? age : user.age;

    res.send(`User with id ${id} has been patched.`);
});

export default router;