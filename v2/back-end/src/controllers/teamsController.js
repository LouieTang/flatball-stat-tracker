import Team from "../models/teamModel.js";
import Player from "../models/playerModel.js";
import Match from "../models/matchModel.js";

export const createTeam = async (req, res) => {
    try{
        const team = new Team(req.body);
        await team.save();
        res.send(`Team with name ${team.teamName} added to the database.`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error adding team to the database.");
    }
}

export const getTeams = async (req, res) => {
    try {
        const teams = await Team.find({});
        res.send(teams);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error getting teams from the database.");
    }
}

export const getSingleTeamInfo = async (req, res) => {
    try {
        const {_id} = req.params;
        const team = await Team.findById(_id);
        res.send(team);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error getting team from the database.");
    }
}

export const deleteSingleTeam = async (req, res) => {
    try {
        const {_id} = req.params;
        const team = Team.findById(_id);

        if (!team) {
            return res.status(404).send("Team not found.");
        }

        await Player.deleteMany({team: _id});
        await Match.deleteMany({team: _id});
        await Team.findByIdAndDelete(_id);

        res.send(`Team with id ${_id} has been deleted.`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting team from the database.");
    }
}

export const patchSingleTeam = async (req, res) => {
    try {
        const {_id} = req.params;
        const {teamName, teamFormat} = req.body;
        const team = await Team.findById(_id);

        if (teamName) team.teamName = teamName;
        if (teamFormat) team.teamFormat = teamFormat;

        await team.save();
        res.send(`Team with id ${_id} has been updated.`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating team in the database.");
    }
}

export const getSingleTeamPlayers = async (req, res) => {
    try {
        const {_id} = req.params;
        const team = await Team.findById(_id);

        const players = await Player.find({ _id: { $in: team.players } });

        res.send(players);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error getting team players from database");
    }
}