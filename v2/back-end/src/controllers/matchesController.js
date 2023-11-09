import Team from "../models/teamModel.js";
import Match from "../models/matchModel.js";

export const createMatch = async (req, res) => {
    try {
        const {team, ...matchData} = req.body;
        console.log(team);
        const matchTeam = await Team.findById(team);

        if (!matchTeam) {
            return res.status(404).send("Team not found.");
        }

        const match = new Match({...matchData, team: matchTeam._id});
        await match.save();

        matchTeam.matches.push(match._id);
        await matchTeam.save();

        res.send(`${match.homeTeam} ${match.homeScore} - ${match.awayScore} ${match.awayTeam} added to the database.`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding match to the database.');
    }
}

export const getMatches = async (req, res) => {
    try {
        const matches = await Match.find({});
        res.send(matches);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting matches from the database.');
    }
}

export const getSingleMatch = async (req, res) => {
    try {
        const {_id} = req.params;
        const match = await Match.findById(_id);
        res.send(match);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting match from the database.');
    }
}

export const deleteSingleMatch = async (req, res) => {
    try {
        const {_id} = req.params;
        const match = await Match.findById(_id);

        if (!match) {
            return res.status(404).send("Match not found.");
        }

        const team = await Team.findById(match.team);

        console.log(team);

        if (!team) {
            return res.status(404).send("Team not found.");
        }

        team.matches = team.matches.filter((playerId) => playerId.toString() !== _id.toString());
        
        await team.save();

        await Match.findByIdAndDelete(_id);
        res.send(`Match with id ${_id} has been deleted.`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting match from the database.');
    }
}

export const patchSingleMatch = async (req, res) => {
    try {
        const {_id} = req.params;
        const {homeTeam, awayTeam, homeScore, awayScore, datePlayed} = req.body;
        const match = await Match.findById(_id);

        if (homeTeam) match.homeTeam = homeTeam;
        if (awayTeam) match.awayTeam = awayTeam;
        if (homeScore) match.homeScore = homeScore;
        if (awayScore) match.awayScore = awayScore;
        if (datePlayed) match.datePlayed = datePlayed;

        await match.save();
        res.send(`Match with id ${_id} has been updated.`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating match in the database.');
    }
}