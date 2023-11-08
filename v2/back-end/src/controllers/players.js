import { Player, Team } from "../models/mongodbModels.js";

export const createPlayer = async (req, res) => {
    try{
        const {teamId, ...playerData} = req.body;
        const team = await Team.findById(teamId);

        if (!team) {
            return res.status(404).send("Team not found.");
        }

        const player = new Player({...playerData, team: team._id});
        await player.save();

        team.players.push(player._id);
        await team.save();

        res.send(`Player with name ${player.firstName} on team ${team.teamName} added to the database.`);
    } catch (error){
        console.error(error);
        res.status(500).send('Error adding user to the database.');
    }
}

export const getPlayers = async (req, res) => {
    try{
        const players = await Player.find({});
        res.send(players);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting players from the database.');
    }
}

export const getSinglePlayer = async (req, res) => {
    try{
        const {_id} = req.params;
        const player = await Player.findById(_id);
        res.send(player);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting player from the database.');
    }
}

export const deleteSinglePlayer = async (req, res) => {
    try{
        const {_id} = req.params;
        const player = await Player.findById(_id);

        if (!player) {
            return res.status(404).send("Player not found.");
        }

        const team = await Team.findById(player.team);

        console.log(team);

        if (!team) {
            return res.status(404).send("Team not found.");
        }

        team.players = team.players.filter((playerId) => playerId.toString() !== _id.toString());
        
        await team.save();

        console.log(team);

        await Player.findByIdAndDelete(_id);
        res.send(`Player with id ${_id} has been deleted.`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting player from the database.');
    }
}

export const patchSinglePlayer = async (req, res) => {
    try{
        const {_id} = req.params;
        const {firstName, lastName, jerseyNumber, genderMatch, age} = req.body;
        const player = await Player.findById(_id);

        if (firstName) player.firstName = firstName;
        if (lastName) player.lastName = lastName;
        if (jerseyNumber) player.jerseyNumber = jerseyNumber;
        if (genderMatch) player.genderMatch = genderMatch;
        if (age) player.age = age;

        await player.save();
        res.send(`Player with id ${_id} has been updated.`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating player in the database.');
    }
}