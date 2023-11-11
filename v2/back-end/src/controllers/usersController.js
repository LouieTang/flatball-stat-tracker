import User from "../models/userModel.js";

export const verifyLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(`Username: ${username}\nPassword: ${password}`);
        const user = await User.findOne({ username, password });
        if (!user) {
            res.send(false);
            return;
        }
        res.send(true);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error getting user from the database.");
    }
};