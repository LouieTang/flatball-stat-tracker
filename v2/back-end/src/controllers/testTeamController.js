import TestTeam from "../models/testTeamModel.js";

export const getTestTeam = async (req, res) => {
    try {
        const team = await TestTeam.find({});
        res.send(team);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error getting teams from the database.");
    }
};