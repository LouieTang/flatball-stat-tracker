import TestTeam from "../models/testTeamModel.js";

export const getTestTeam = async (req, res) => {
    try {
        const team = await TestTeam.findOne({});
        res.send(team);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error getting teams from the database.");
    }
};

export const updateTestTeam = async (req, res) => {
    try {
        const { updatedTeam } = req.body;
        console.log(updatedTeam);
        try{
            const updatePromise = await TestTeam.updateMany({_id: updatedTeam._id}, {$set: {teamPlayers: updatedTeam.teamPlayers}});
            console.log(updatePromise);
        }catch (error) {
            console.error(error);
            throw error;
        }

        res.status(200).send("Team Updated Successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating team to database");
    }
};