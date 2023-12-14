import TestPlayer from "../models/testPlayerModel.js";

export const getTestPlayers = async (req, res) => {
    try {
        const players = await TestPlayer.find({});
        res.send(players);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting players from the database.');
    }
}