import User from "../models/userModel.js";
import Team from "../models/teamModel.js";

export const verifyLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(`Username: ${username}\nPassword: ${password}`);
        const user = await User.findOne({ username, password });
        if (!user) {
            res.status(404).send("User is not in the databse");
            return;
        }
        res.send(user._id);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error getting user from the database.");
    }
};

export const registerUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.send(true);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error registering user to the database.");
    }
}

export const getUserTeams = async (req, res) => {
    try {
        const {user} = req.body;
        console.log(user);
        const teams = await Team.find({ user });

        res.send(teams);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error getting user's teams from the database.");
    }
}