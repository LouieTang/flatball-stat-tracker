import TestPlayer from "../models/testPlayerModel.js";

export const getTestPlayers = async (req, res) => {
    try {
        const players = await TestPlayer.find({});
        res.send(players);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error getting players from the database.");
    }
}

export const updateTestPlayers = async (req, res) => {
    try {
        const { players } = req.body;
        console.log(players);
        const updatePromises = players.map(async (player) => {
            try {
                const response = await TestPlayer.updateOne({ jerseyNumber: player.jerseyNumber }, { $set: player });
                console.log(response);
                return response;
            } catch (error) {
                console.error(error);
                throw error;
            }
        });

        await Promise.all(updatePromises);

        res.status(200).send("Players updated successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating players to database");
    }
}